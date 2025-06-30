// contactRoutes.js

const express = require("express");
const router = express.Router();
const {
  handleContactForm,
  fetchContactMessages,
  deleteContactMessageById,
} = require("../controllers/contactController");
const { verifyAdminToken } = require("../middleware/authMiddleware");

// Public route to submit contact form
router.post("/", handleContactForm);

// Admin-protected routes
router.get("/messages", verifyAdminToken, fetchContactMessages);
router.delete("/messages/:id", verifyAdminToken, deleteContactMessageById);

module.exports = router;
