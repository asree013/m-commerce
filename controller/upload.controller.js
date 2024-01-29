const express = require('express');
const multer = require('multer');
const app = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
  try {
    const fileName = req.file.filename;
    res.status(200).json({fileName: fileName})
  } catch (error) {
    res.status(500).json(error)
  }
  
});

module.exports = app


