// contactModel.js

const pool = require("../config/db");

const saveContactMessage = async (name, email, message) => {
  const query = `
    INSERT INTO contact_messages (name, email, message)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, email, message];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllMessages = async () => {
  const result = await pool.query(
    "SELECT * FROM contact_messages ORDER BY submitted_at DESC"
  );
  return result.rows;
};

const deleteMessageById = async (id) => {
  const result = await pool.query(
    "DELETE FROM contact_messages WHERE id = $1",
    [id]
  );
  return result.rowCount > 0; // true if message was deleted
};

module.exports = {
  saveContactMessage,
  getAllMessages,
  deleteMessageById,
};
