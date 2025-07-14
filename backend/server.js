import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import { PrismaClient } from "@prisma/client";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const SALT_ROUNDS = 10;
const PORT = 3000;
const prisma = new PrismaClient();
const pgSession = (await import("connect-pg-simple")).default(session);

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"];
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type"],
  })
);

app.use(
  session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
      ttl: 3600,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 },
  })
);

app.use(express.json());

//Signup and Login Routes
app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    req.session.userId = newUser.id;

    res.status(201).json({
      message: "User created",
      id: req.session.userId,
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const pgClient = new pg.Client(process.env.DATABASE_URL);
    await pgClient.connect();
    const result = await pgClient.query(
      "DELETE FROM session WHERE sess::jsonb->>'userId' = $1",
      [user.id]
    );
    await pgClient.end();

    req.session.userId = user.id;

    res.json({
      id: req.session.userId,
      user: { id: user.id, email: user.email, name: user.name },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  res.status(200).json({ message: "Logout successful" });
});

app.post("/add-contact", async (req, res) => {
  const { name, email, phone, zipCode, userId } = req.body;
  if (!zipCode) {
    return res.status(400).json({ error: "zipCode is required" });
  }

  req.session.userId = userId;
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        zipCode,
        userId,
      },
    });

    res.status(200).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/update-contact", async (req, res) => {
  const { id, name, email, phone, zipCode } = req.body;
  try {
    const updatedContact = await prisma.contact.update({
      where: { id: id },
      data: {
        name,
        email,
        phone,
        zipCode,
      },
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/contacts/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const contacts = await prisma.contact.findMany({
      where: { userId: userId },
    });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/delete-contact", async (req, res) => {
  const { id } = req.body;

  try {
    const deletedContact = await prisma.contact.delete({
      where: { id: id },
    });

    res.status(200).json({
      message: "Contact deleted",
      contact: deletedContact,
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Category Management Routes
app.post("/add-category", async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    res.status(200).json(newCategory);
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/add-task", async (req, res) => {
  const {
    title,
    description,
    contacts,
    category,
    userId,
    dueDate,
    prio,
    status,
  } = req.body;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const newTask = await prisma.addTask.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        prio: prio,
        category: typeof category === "object" ? category.label : category,
        status: status || "To Do",
        contacts: {
          connect: contacts.map((contact) => ({
            id: contact.value,
          })),
        },
        createdBy: { connect: { id: userId } },
      },
    });
    // Endpoint to update task status (for drag and drop)
    app.put("/update-task-status", async (req, res) => {
      const { id, status } = req.body;
      if (!id || !status) {
        return res
          .status(400)
          .json({ error: "Task id and status are required" });
      }
      try {
        const updatedTask = await prisma.addTask.update({
          where: { id },
          data: { status },
        });
        res.status(200).json({ updatedTask, message: "Status updated" });
      } catch (error) {
        console.error("Error updating task status:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
    res.json({ newTask, message: "Task successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/load-tasks", async (req, res) => {
  const { userId, contactId } = req.query;
  try {
    let tasks;
    if (contactId) {
      tasks = await prisma.addTask.findMany({
        where: {
          createdById: userId,
          contacts: {
            some: { id: contactId },
          },
        },
      });
    } else {
      tasks = await prisma.addTask.findMany({
        where: { createdById: userId },
      });
    }

    if (!tasks || tasks.length === 0) {
      return res.status(200).json([]);
    }
    res.json(tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).json({ error: "Failed to load tasks" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
