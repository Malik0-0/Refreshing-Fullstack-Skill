import express from "express";
import bcrypt from "bcrypt";
import pool from "../config/db.js";

const router = express.Router();

// GET Login Page
router.get("/auth/login", (req, res) => {
  res.render("auth/login", {
    layout: "layouts/base",
    error: null,
  });
});

// POST Login (form submit)
router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rowCount === 0) {
      return res.render("auth/login", {
        layout: "layouts/base",
        error: "User not found.",
      });
    }

    const user = result.rows[0];

    // Compare hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("auth/login", {
        layout: "layouts/base",
        error: "Invalid password.",
      });
    }

    // Save user info in session
    req.session.user = {
      id: user.id,
      username: user.username,
    };

    console.log("Logged in:", user.username);
    res.redirect("/projects");

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error during login");
  }
});

// GET Logout
router.get("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  });
});

export default router;
