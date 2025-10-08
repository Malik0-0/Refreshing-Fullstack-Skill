// routes/project.js
import express from "express";
import fs from "fs";
import path from "path";
import { upload } from "../config/upload.js";
import pool from "../config/db.js";

const router = express.Router();

// 🧹 Helper to safely delete image files
function deleteImages(imageArray) {
  if (!imageArray || !imageArray.length) return;

  // ✅ Always point to /public/uploads
  const uploadsDir = path.resolve("public", "uploads");

  imageArray.forEach((imgPath) => {
    const filename = path.basename(imgPath); // just get the file name (e.g. 1759927232065.webp)
    const fullPath = path.join(uploadsDir, filename);

    fs.unlink(fullPath, (err) => {
      if (err) {
        console.warn("⚠️ Could not delete image:", fullPath, "-", err.message);
      } else {
        console.log("🗑️ Deleted old image:", fullPath);
      }
    });
  });
}

// List all projects
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY created_at DESC");
    const projects = result.rows;

    res.render("projects/list", {
      layout: "layouts/base",
      projects,
      projectListPage: true
    });
  } catch (err) {
    console.error("❌ Error fetching projects:", err);
    res.status(500).send("Error fetching projects");
  }
});


// Render add form
router.get("/add", (req, res) => {
  res.render("projects/add", {
    layout: "layouts/base",
    projectPage: true
  });
});

// Form submission
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { title, shortDesc, longDesc, github, technologies } = req.body;
    console.log("📸 Received files:", req.files);
    console.log("📦 Body data:", req.body);
    console.log("🧩 New project submitted:", title);

    const techArray = technologies.split(",").map(t => t.trim()).filter(Boolean);
    const imgArray = req.files?.map(file => `/uploads/${file.filename}`) || [];

    await pool.query(
      `INSERT INTO projects (title, short_desc, long_desc, github, technologies, images)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [title, shortDesc, longDesc, github, techArray, imgArray]
    );

    console.log("✅ Project inserted with images:", imgArray);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Error inserting project:", err);
    res.status(500).json({ success: false, error: "Database error" });
  }
});

// DELETE project
router.post("/delete/:id", async (req, res) => {
  console.log("🧩 DELETE request received for ID:", req.params.id);
  try {
    const { id } = req.params;

    // 1️⃣ Fetch current images before deleting
    const result = await pool.query("SELECT images FROM projects WHERE id = $1", [id]);
    const oldImages = result.rows[0]?.images || [];

    // 2️⃣ Delete from DB
    await pool.query("DELETE FROM projects WHERE id = $1", [id]);

    // 3️⃣ Delete old image files from disk
    deleteImages(oldImages);

    console.log(`🗑️ Project ${id} deleted and images removed`);
    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error deleting project:", err);
    res.status(500).json({ success: false });
  }
});

// ========================== EDIT PROJECT ==========================
router.post("/edit/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, shortDesc, longDesc, github, technologies } = req.body;

    console.log("🧾 Edit request body:", req.body);
    console.log("📸 Uploaded files:", req.files);

    // ✅ 1️⃣ Handle technologies safely
    const techArray =
      technologies && technologies.length
        ? technologies.split(",").map((t) => t.trim()).filter(Boolean)
        : [];

    // ✅ 2️⃣ Handle new images (if any)
    const imgArray =
      req.files && req.files.length
        ? req.files.map((file) => `/uploads/${file.filename}`)
        : [];

    console.log(`📝 Updating project ${id}`);
    console.log("💡 techArray:", techArray);
    console.log("💡 imgArray:", imgArray);

    // #️⃣ FETCH OLD IMAGES before updating
    const existing = await pool.query("SELECT images FROM projects WHERE id = $1", [id]);
    const oldImages = existing.rows[0]?.images || [];

    // ✅ 3️⃣ Perform update
    const query = `
      UPDATE projects
      SET
        title = $1,
        short_desc = $2,
        long_desc = $3,
        github = $4,
        technologies = $5,
        images = CASE
          WHEN $6::text[] IS NOT NULL AND array_length($6, 1) > 0 THEN $6
          ELSE images
        END
      WHERE id = $7
      RETURNING *;
    `;

    const values = [
      title,
      shortDesc,
      longDesc,
      github,
      techArray.length ? techArray : null,
      imgArray.length ? imgArray : null,
      id,
    ];

    const result = await pool.query(query, values);

    // #️⃣ DELETE OLD IMAGES only if new ones are uploaded
    if (imgArray.length > 0) {
      deleteImages(oldImages); // <-- this uses the helper function
    }

    console.log(`✅ Project ${id} updated successfully`);
    res.json({ success: true, updated: result.rows[0] });

  } catch (err) {
    console.error("❌ Error updating project:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
