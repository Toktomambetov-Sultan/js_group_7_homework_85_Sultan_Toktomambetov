const express = require("express");
const multer = require("multer");
const schema = require("./../Models");
const path = require("path");
const config = require("../config");
const { nanoid } = require("nanoid");
const router = express.Router();
const fs = require("fs").promises;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.ImageUploadingDir);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(null, false);
    }
    callback(null, true);
  },
});

router.get("/", async (req, res) => {
  res.send(await schema.Author.find(req.query));
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const author = new schema.Author(req.body);
    author.image = req.file && req.file.filename;
    await author.save();
    res.send(author);
  } catch (error) {
    req.file &&
      (await fs.unlink(config.ImageUploadingDir + "/" + req.file.filename));
    res.send(error);
  }
});

// # if you need to use delete method for all authors, look at down

router.delete("/", async (req, res) => {
  try {
    const ans = await schema.Author.deleteMany();
    res.send(ans);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
