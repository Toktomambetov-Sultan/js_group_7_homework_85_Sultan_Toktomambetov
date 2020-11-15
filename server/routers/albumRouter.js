const express = require("express");
const config = require("../config");
const uploadImage = require("../tools/routers/uploadImg");
const schema = require("./../Models");
const fs = require("fs").promises;
const router = express.Router();

router.get("/", async (req, res) => {
  let albums;
  try {
    albums = (await schema.Album.find(req.query).populate("author")).sort(
      (a, b) => a.year > b.year
    );
  } catch (error) {
    res.status(400).send(error);
  }
  res.send(albums);
});

router.post("/", uploadImage.single("image"), async (req, res) => {
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
