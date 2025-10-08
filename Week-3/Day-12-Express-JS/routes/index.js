// routes/index.js
import express from "express";
import pool from "../config/db.js";
const router = express.Router();

// Redirect root "/" to "/home"
router.get("/", (req, res) => {
  res.redirect("/home");
});

// Home main header
router.get("/home", (req, res) => {
  res.render("home/home", {
    layout: "layouts/base",
    showFullHeader: true,
    activeHome: true
  });
});

// About
router.get("/home/about", (req, res) => {
  res.render("home/about", {
    layout: "layouts/base",
    activeAbout: true,
    homePage: true
  });
});

// Resume
router.get("/home/resume", (req, res) => {
  res.render("home/resume", {
    layout: "layouts/base",
    activeResume: true,
    homePage: true
  });
});


// Contact page
router.get("/contact", (req, res) => {
    res.render("contact/contact", {
      layout: "layouts/base",
      showFullHeader: false,
      activeContact: true,
      contactPage: true
    });
  });

// ===== CONTACT FORM SUBMIT =====
router.post("/contact", async (req, res) => {
  const { name, email, purpose, message } = req.body;

  // 🟢 Log the data received from frontend
  console.log("📩 New contact form submission:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Purpose:", purpose);
  console.log("Message:", message);
  console.log("───────────────────────────────");

  try {
    // Save to PostgreSQL
    await pool.query(
      "INSERT INTO contacts (name, email, purpose, message) VALUES ($1, $2, $3, $4)",
      [name, email, purpose, message]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

export default router;
