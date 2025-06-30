const reviewModel = require("../models/reviewModel");

// 🌟 USER: Submit Review
const submitReview = async (req, res) => {
  try {
    const { name, email, rating, review } = req.body;

    if (!name || !email || !rating || !review) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newReview = await reviewModel.createReview({
      name,
      email,
      rating,
      review,
    });
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Review Submission Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🌟 PUBLIC/FRONTEND: Get All Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

// 🔐 ADMIN: Get All Reviews (for dashboard)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.getAllReviews(); // same model, reuse
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Admin Get Reviews Error:", error);
    res.status(500).json({ message: "Failed to fetch admin reviews" });
  }
};

// 🔐 ADMIN: Delete Review by ID
const deleteReview = async (req, res) => {
  const reviewId = req.params.id;

  try {
    const result = await reviewModel.deleteReviewById(reviewId);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete Review Error:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};

module.exports = {
  submitReview,
  getReviews,
  getAllReviews, // NEW
  deleteReview, // NEW
};

// const reviewModel = require("../models/reviewModel");

// const submitReview = async (req, res) => {
//   try {
//     const { name, email, rating, review } = req.body;

//     if (!name || !email || !rating || !review) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const newReview = await reviewModel.createReview({
//       name,
//       email,
//       rating,
//       review,
//     });
//     res.status(201).json(newReview);
//   } catch (error) {
//     console.error("Review Submission Error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// const getReviews = async (req, res) => {
//   try {
//     const reviews = await reviewModel.getAllReviews();
//     res.status(200).json(reviews);
//   } catch (error) {
//     console.error("Get Reviews Error:", error);
//     res.status(500).json({ message: "Failed to fetch reviews" });
//   }
// };

// module.exports = {
//   submitReview,
//   getReviews,
// };
