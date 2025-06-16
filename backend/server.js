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

app.post("/add-contact", async (req, res) => {
  const { name, email, phone, zipCode, userId } = req.body;

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

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  res.status(200).json({ message: "Logout successful" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
