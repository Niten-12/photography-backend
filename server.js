// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const photoRoutes = require("./routes/photoRoutes");
const path = require("path"); // ✅ ADD THIS

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", authRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/reviews", reviewRoutes); // 👈 New route
app.use("/api/photos", photoRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running." });
});

// require("dotenv").config();
// const express = require("express");
// const mysql = require("mysql2");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // MySQL connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// db.connect((err) => {
//   if (err) {
//     console.error("MySQL connection error:", err);
//   } else {
//     console.log("Connected to MySQL database");
//   }
// });

// // ✅ Root route
// app.get("/", (req, res) => {
//   res.send("API is working 🚀");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
