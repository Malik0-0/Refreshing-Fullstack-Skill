// apps.js
import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";

// Route imports
import homeRoutes from "./routes/index.js";
import projectRoutes from "./routes/project.js";

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Handlebars setup =====
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "views/partials"));
hbs.registerHelper("year", () => new Date().getFullYear());

// ===== Middleware =====
app.use(express.static(path.join(__dirname, "public"))); // serve css/js/img
app.use(express.json());
app.use(express.urlencoded({ extended: true }));         // parse form data

// ===== Routes =====
app.use("/", homeRoutes);
app.use("/projects", projectRoutes);

// ===== Server start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
