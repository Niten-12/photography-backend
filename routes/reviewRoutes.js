const express = require("express");
const router = express.Router();

const {
  submitReview,
  getReviews,
  getAllReviews,
  deleteReview,
} = require("../controllers/reviewController");

const { verifyAdminToken } = require("../middleware/authMiddleware");

// 📤 User submits a review (public)
router.post("/submit", submitReview);

// 🌐 Get all reviews for frontend display (public or limited)
router.get("/", getReviews);

// 🔐 Admin-only: Get all reviews (for dashboard view)
router.get("/admin", verifyAdminToken, getAllReviews);

// 🔐 Admin-only: Delete specific review
router.delete("/admin/:id", verifyAdminToken, deleteReview);

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { submitReview, getReviews } = require("../controllers/reviewController");

// // POST a new review
// router.post("/submit", submitReview);

// // GET all reviews
// router.get("/", getReviews);

// module.exports = router;
