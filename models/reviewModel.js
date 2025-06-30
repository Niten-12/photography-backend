//reviewModel.js
const db = require("../config/db");

// 🌟 Create a new review with JS timestamp
const createReview = async ({ name, email, rating, review }) => {
  const createdAt = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  ).toISOString();

  const query = `
    INSERT INTO reviews (name, email, rating, review, created_at)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [name, email, rating, review, createdAt];
  const { rows } = await db.query(query, values);
  return rows[0];
};

// 📄 Get all reviews (latest first)
const getAllReviews = async () => {
  const { rows } = await db.query(
    "SELECT * FROM reviews ORDER BY created_at DESC;"
  );
  return rows;
};

// 🗑️ Delete a review by ID
const deleteReviewById = async (id) => {
  const result = await db.query("DELETE FROM reviews WHERE id = $1", [id]);
  return result; // Includes rowCount
};

module.exports = {
  createReview,
  getAllReviews,
  deleteReviewById,
};

// const db = require("../config/db");

// const createReview = async ({ name, email, rating, review }) => {
//   const query = `
//     INSERT INTO reviews (name, email, rating, review, created_at)
//     VALUES ($1, $2, $3, $4, NOW())
//     RETURNING *;
//   `;
//   const values = [name, email, rating, review];
//   const { rows } = await db.query(query, values);
//   return rows[0];
// };

// const getAllReviews = async () => {
//   const { rows } = await db.query(
//     "SELECT * FROM reviews ORDER BY created_at DESC;"
//   );
//   return rows;
// };

// module.exports = {
//   createReview,
//   getAllReviews,
// };
