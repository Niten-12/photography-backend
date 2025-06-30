// 📄 config/db.js
const { Pool } = require("pg");
require("dotenv").config();

// ✅ PostgreSQL Connection Pool Setup
const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Accept Supabase cert
  },
  max: 50, // Max 50 simultaneous connections
  idleTimeoutMillis: 30000, // Close idle clients after 30s
  connectionTimeoutMillis: 5000, // Fail if not connected within 5s
  keepAlive: true, // Keep connection alive across some networks
});

// 🛡️ Fatal DB Error Catching (usually from idle timeout or restarts)
db.on("error", (err) => {
  console.error("🔥 Unexpected PostgreSQL error on idle client:", err.message);
  // Don't kill process immediately; attempt reconnect first
  attemptReconnect();
});

// 🔄 Optional: Reconnect Logic if pool fails (production-ready fallback)
const attemptReconnect = async () => {
  console.log("⏳ Attempting to reconnect to the database...");
  let connected = false;

  while (!connected) {
    try {
      const client = await db.connect();
      client.release();
      console.log("✅ Reconnected to the database.");
      connected = true;
    } catch (err) {
      console.error("❌ Reconnect failed. Retrying in 5s...");
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

module.exports = db;

// // 📄 config/db.js
// const { Pool } = require("pg");
// require("dotenv").config();

// const db = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false, // ✅ Accept self-signed cert from Supabase (safe for dev)
//   },
//   max: 50, // ✅ Pool max 5 connections
//   idleTimeoutMillis: 30000, // ✅ Auto-close idle clients after 30s
//   connectionTimeoutMillis: 5000, // ✅ Fail if cannot connect in 5s
//   keepAlive: true, // ✅ Prevent premature disconnection by some cloud providers
// });

// // 🔥 Catch fatal DB errors
// db.on("error", (err) => {
//   console.error("🔥 Unexpected PostgreSQL error on idle client:", err);
//   process.exit(-1); // Optionally restart app on fatal DB error
// });

// module.exports = db;
