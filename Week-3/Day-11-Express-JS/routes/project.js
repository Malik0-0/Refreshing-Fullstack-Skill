// routes/project.js
import express from "express";
const router = express.Router();

// Project list
router.get("/", (req, res) => {
  res.render("projects", { layout: "layouts/base" });
});

// Add new project form
router.get("/add", (req, res) => {
  res.render("addProject", { layout: "layouts/base" });
});

// Project detail
router.get("/:id", (req, res) => {
  const projectId = req.params.id;
  res.render("projectDetail", { layout: "layouts/base", projectId });
});

export default router;
