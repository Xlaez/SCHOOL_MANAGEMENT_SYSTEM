const multer = require("multer");
var prefix = Date.now().toLocaleString();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${prefix}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/pdf" ||
    file.mimetype === "image/srt" ||
    file.mimetype === "image/svg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

module.exports = { fileStorage, fileFilter };
