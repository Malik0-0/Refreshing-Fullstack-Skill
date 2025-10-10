// apps.js
import express from "express";
import path from "path";
import hbs from "hbs";
import { fileURLToPath } from "url";
import session from "express-session";
import pgSession from "connect-pg-simple";
import pool from "./config/db.js";

// Route imports
import homeRoutes from "./routes/index.js";
import projectRoutes from "./routes/project.js";
import authRoutes from "./routes/auth.js";

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== Middleware =====
const PgStore = pgSession(session);

app.use(
    session({
        store: new PgStore({
            pool: pool,
            tableName: "session",
        }),
        secret: "supersecretcat", // later move to .env
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
    })
);

app.use((req, res, next) => {
    res.locals.user = req.session.user; // <-- your line
    next();
});
app.use(express.static(path.join(__dirname, "public"))); // serve css/js/img
app.use(express.json());
app.use(express.urlencoded({ extended: true }));         // parse form data
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});
  
// ===== Handlebars setup =====
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

hbs.registerPartials(path.join(__dirname, "views/partials"));
hbs.registerHelper("year", () => new Date().getFullYear());

// ===== Routes =====
app.use("/", homeRoutes);
app.use("/projects", projectRoutes);
app.use("/", authRoutes);

// ===== Server start =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
