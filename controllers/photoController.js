// 📄 controllers/photoController.js (Supabase Storage Version with Logging + Error Handling)
const { supabase } = require("../supabaseClient");
const {
  createPhoto,
  getAllPhotos,
  deletePhoto,
  getPhotoById,
} = require("../models/photoModel");
const { v4: uuidv4 } = require("uuid");

// 📤 Upload Photo(s)
exports.uploadPhotos = async (req, res) => {
  const { type, name, category } = req.body;
  const files = req.files;

  console.log("📥 FILES RECEIVED:", files);
  console.log("📝 BODY RECEIVED:", req.body);

  try {
    const uploaded = await Promise.all(
      files.map(async (file) => {
        console.log("🚀 Uploading:", file.originalname);
        console.log("🧠 Size:", file.size, "bytes");
        console.log("🧾 Buffer exists:", !!file.buffer);

        const extension = file.originalname.split(".").pop();
        const fileName = `${uuidv4()}.${extension}`;

        const { data, error } = await supabase.storage
          .from("photos")
          .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) {
          console.error("❌ Supabase Upload Error:", error.message || error);
          throw error; // ⛔ Upload failed, abort this file
        }

        const { data: publicUrl } = supabase.storage
          .from("photos")
          .getPublicUrl(fileName);

        const sizeMB = file.size / (1024 * 1024);

        const saved = await createPhoto({
          url: publicUrl.publicUrl,
          sizeMB,
          type,
          name,
          category,
        });

        console.log("✅ Metadata Saved to DB:", saved);
        return saved;
      })
    );

    // ✅ Send response if all files uploaded successfully
    res.status(201).json(uploaded);
  } catch (err) {
    // 🔥 Catch any failure in upload chain
    console.error("🔥 Upload Error:", err.message || err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
};

// 📥 Get All Photos
exports.getPhotos = async (req, res) => {
  try {
    const photos = await getAllPhotos();
    res.json(photos);
  } catch (err) {
    console.error("🔥 Error in getPhotos:", err.message || err);
    res.status(500).json({ error: "Failed to fetch photos" });
  }
};

// 🗑️ Delete a Photo
exports.deletePhoto = async (req, res) => {
  const id = req.params.id;

  try {
    const photo = await getPhotoById(id);

    if (!photo) {
      return res.status(404).json({ error: "Not found" });
    }

    // 🧩 Extract file path from public URL
    const path = photo.url.split("/storage/v1/object/public/photos/")[1];

    // 🧹 Remove from Supabase bucket
    const { error } = await supabase.storage.from("photos").remove([path]);

    if (error) {
      console.error("❌ Supabase Delete Error:", error.message || error);
      throw error;
    }

    // 🗑️ Remove DB metadata
    await deletePhoto(id);

    res.json({ message: "Photo deleted" });
  } catch (err) {
    console.error("🔥 Error in deletePhoto:", err.message || err);
    res.status(500).json({ error: "Failed to delete photo" });
  }
};

// const { addPhoto, getAllPhotos, deletePhoto } = require("../models/photoModel");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadDir = path.join(__dirname, "..", "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
// });

// const upload = multer({ storage });

// const uploadPhotos = async (req, res) => {
//   try {
//     const files = req.files;
//     const { name, category, type } = req.body;

//     if (!files || files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded." });
//     }

//     const results = [];

//     for (const file of files) {
//       const url = `/uploads/${file.filename}`;
//       const sizeMB = file.size / (1024 * 1024);
//       const newPhoto = await addPhoto({ url, name, category, type, sizeMB });
//       results.push(newPhoto);
//     }

//     res.status(200).json(results);
//   } catch (err) {
//     console.error("Upload error:", err);
//     res.status(500).json({ message: "Server error during upload." });
//   }
// };

// const fetchPhotos = async (req, res) => {
//   try {
//     const photos = await getAllPhotos();
//     res.json(photos);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch photos." });
//   }
// };

// const deletePhotoById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deleted = await deletePhoto(id);
//     if (!deleted) return res.status(404).json({ message: "Photo not found." });

//     const filePath = path.join(uploadDir, deleted.url.split("/uploads/")[1]);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     res.json({ message: "Photo deleted." });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete photo." });
//   }
// };

// module.exports = { upload, uploadPhotos, fetchPhotos, deletePhotoById };
