// 📄 models/photoModel.js
const db = require("../config/db");

exports.createPhoto = async ({ url, sizeMB, type, name, category }) => {
  try {
    // 🛡️ Try-catch added to handle DB insert errors (e.g., invalid data, connection issues)
    const result = await db.query(
      `INSERT INTO photos (url, sizeMB, type, name, category)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [url, sizeMB, type, name, category]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ DB Error in createPhoto:", err.message);
    throw err; // 🔁 Let controller handle the response to client
  }
};

exports.getAllPhotos = async () => {
  try {
    const result = await db.query("SELECT * FROM photos ORDER BY id DESC");
    return result.rows;
  } catch (err) {
    console.error("❌ DB Error in getAllPhotos:", err.message);
    throw err;
  }
};

exports.deletePhoto = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM photos WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("❌ DB Error in deletePhoto:", err.message);
    throw err;
  }
};

exports.getPhotoById = async (id) => {
  try {
    const result = await db.query("SELECT * FROM photos WHERE id = $1", [id]);
    return result.rows[0];
  } catch (err) {
    console.error("❌ DB Error in getPhotoById:", err.message);
    throw err;
  }
};

// const pool = require("../config/db");

// const addPhoto = async ({ url, name, category, type, sizeMB }) => {
//   const res = await pool.query(
//     "INSERT INTO photos (url, name, category, type, sizeMB, created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
//     [url, name, category, type, sizeMB]
//   );
//   return res.rows[0];
// };

// const getAllPhotos = async () => {
//   const res = await pool.query("SELECT * FROM photos ORDER BY created_at DESC");
//   return res.rows;
// };

// const deletePhoto = async (id) => {
//   const res = await pool.query("DELETE FROM photos WHERE id = $1 RETURNING *", [
//     id,
//   ]);
//   return res.rows[0];
// };

// module.exports = { addPhoto, getAllPhotos, deletePhoto };
