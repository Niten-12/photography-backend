// contactController.js

const {
  saveContactMessage,
  getAllMessages,
  deleteMessageById,
} = require("../models/contactModel");

const handleContactForm = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const saved = await saveContactMessage(name, email, message);
    res
      .status(201)
      .json({ message: "Message submitted successfully.", data: saved });
  } catch (err) {
    console.error("Error saving contact message:", err);
    res.status(500).json({ message: "Server error." });
  }
};

const fetchContactMessages = async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteContactMessageById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await deleteMessageById(id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found." });
    }

    res.status(200).json({ message: "Message deleted successfully." });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  handleContactForm,
  fetchContactMessages,
  deleteContactMessageById,
};
