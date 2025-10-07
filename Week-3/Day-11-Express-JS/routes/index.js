// routes/index.js
import express from "express";
import pool from "../config/db";
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
  

export default router;
