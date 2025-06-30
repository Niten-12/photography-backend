// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getAdminByUsername } = require("../models/adminModel");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  console.log("📥 Received login body:", req.body);

  // Validate input
  if (!username || !password) {
    console.warn("❌ Missing username or password");
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    // Check if admin exists
    const admin = await getAdminByUsername(username);
    console.log("🔍 Admin fetched from DB:", admin);

    if (!admin) {
      console.warn("❌ Admin not found");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    console.log("🔐 Password match result:", isMatch);

    if (!isMatch) {
      console.warn("❌ Password does not match");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful, JWT generated");
    res.json({ token });
  } catch (err) {
    console.error("💥 Server error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  loginAdmin,
};
