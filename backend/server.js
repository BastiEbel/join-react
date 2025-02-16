//import fs from "node:fs/promises";
import express from "express";
//import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const app = express();
const SALT_ROUNDS = 10;
const PORT = 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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
    allowedHeaders: ["Content-Type"],
  })
);
/* app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
}); */

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  try {
    /* 
    const data = await fs.readFile("./data/auth.json", "utf-8");
    const users = JSON.parse(data); */

    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = {
      id: uuidv4(),
      email,
      confirmPassword: hashedPassword,
      password: hashedPassword,
      name,
    };

    /*  users.push(newUser); */
    await pool.query(
      "INSERT INTO users (id, email, password, name) VALUES ($1, $2, $3, $4)",
      [newUser.id, newUser.email, newUser.password, newUser.name]
    );

    //await fs.writeFile("./data/auth.json", JSON.stringify(users, null, 2));

    /* const user = users.find((user) => user.email === email);

    const { password: _, ...userWithoutPassword } = user; */

    req.session.userId = newUser.id;

    res.status(201).json({
      message: "User created",
      id: req.session.userId,
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
    });
  } catch (error) {
    console.error("Error reading or writing file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const resultUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    /* const data = await fs.readFile("./data/auth.json", "utf-8");
    const users = JSON.parse(data);

    const user = users.find((user) => user.email === email); */
    const user = resultUser.rows[0];
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    req.session.userId = user.id;

    //const { password: _, ...userWithoutPassword } = user;

    res.json({
      id: req.session.userId,
      user: { id: user.id, email: user.email, name: user.name },
      message: "Login successful",
    });
  } catch (error) {
    console.error("Error reading file:", error);
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

// Alle Todos abrufen
app.get("/todos", (req, res) => {
  res.json(todos);
});

// Todo erstellen
app.post("/edit", (req, res) => {
  const { title } = req.body;
  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Todo aktualisieren
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id == id);
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.title = title;
  todo.completed = completed;
  res.json(todo);
});

// Todo löschen
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((t) => t.id != id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
