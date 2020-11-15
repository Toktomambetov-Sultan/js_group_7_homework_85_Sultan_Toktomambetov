const express = require("express");
const schema = require("./../Models");
const config = require("../config");
const uploadImage = require("../tools/routers/uploadImg");
const router = express.Router();
const fs = require("fs").promises;

router.get("/", async (req, res) => {
  res.send(await schema.Author.find(req.query));
});

router.post("/", uploadImage.single("image"), async (req, res) => {
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
