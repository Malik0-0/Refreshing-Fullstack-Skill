import pool from "./db.js";

const testConnection = async () => {
    try {
        const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
        console.log("✅ Tables in database:");
        console.table(result.rows);
    } catch (err) {
        console.error("❌ Database error:", err);
    } finally {
        pool.end();
    }
};

testConnection();
