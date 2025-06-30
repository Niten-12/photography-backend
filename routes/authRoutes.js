//authRoutes.js
const express = require("express");
const router = express.Router(); // ✅ Built-in Express router
const { loginAdmin } = require("../controllers/authController");
const { verifyAdminToken } = require("../middleware/authMiddleware");

// Public login route
router.post("/login", loginAdmin);

// Protected route (for testing)
router.get("/dashboard", verifyAdminToken, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

module.exports = router;
