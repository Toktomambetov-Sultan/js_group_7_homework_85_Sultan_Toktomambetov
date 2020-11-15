const express = require("express");
const { nanoid } = require("nanoid");
const multer = require("multer");
const config = require("../config");
const schema = require("./../Models");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

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
    return callback(null, true);
  },
});

router.get("/", async (req, res) => {
  let albums;
  try {
    albums = await schema.Album.find(req.query).populate("author").sort({year: 1});
  } catch (error) {
    res.status(400).send(error);
  }
  res.send(albums);
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const album = new schema.Album(req.body);
    album.image = req.file && req.file.filename;
    await album.save();
    res.send(album);
  } catch (error) {
    req.file &&
      (await fs.unlink(config.ImageUploadingDir + "/" + req.file.filename));
    res.status(400).send(error);
  }
});

// # if you need to use delete method for all albums, look at down

router.delete("/", async (req, res) => {
  try {
    const ans = await schema.Album.deleteMany();
    res.send(ans);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
