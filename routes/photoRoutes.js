// 📄 routes/photoRoutes.js
const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  uploadPhotos,
  getPhotos,
  deletePhoto,
} = require("../controllers/photoController");

const router = express.Router();

router.post("/upload", upload.array("photos", 5), uploadPhotos);
router.get("/", getPhotos);
router.delete("/:id", deletePhoto);

module.exports = router;

// const express = require("express");
// const {
//   upload,
//   uploadPhotos,
//   fetchPhotos,
//   deletePhotoById,
// } = require("../controllers/photoController");
// const { verifyAdmin } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.get("/", fetchPhotos);
// router.post("/upload", verifyAdmin, upload.array("photos", 80), uploadPhotos);
// router.delete("/:id", verifyAdmin, deletePhotoById);

// module.exports = router;
