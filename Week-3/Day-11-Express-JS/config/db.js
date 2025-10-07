// /config/db.js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "portfolio",
  password: "@Basori_120",
  port: 5432,
});

export default pool;
