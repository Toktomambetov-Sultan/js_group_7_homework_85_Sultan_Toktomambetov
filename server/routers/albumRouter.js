const express = require("express");
const config = require("../config");
const uploadImage = require("../tools/routers/uploadImg");
const schema = require("./../Models");
const fs = require("fs").promises;
const router = express.Router();

const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");
const permitMiddleware = require("./../tools/routers/permitMiddleware");

router.get("/", authorizationMiddleware, async (req, res) => {
  let albums;
  try {
    albums = (
      await schema.Album.find({
        ...req.query,
        ...(req.user.role === "admin" ? {} : { published: true }),
      })
        .populate("author")
        .populate("user")
    ).sort((a, b) => a.year > b.year);
  } catch (error) {
    res.status(400).send(error);
  }
  res.send(albums);
});

router.post(
  "/",
  [authorizationMiddleware, uploadImage.single("image")],
  async (req, res) => {
    try {
      delete req.body.published;
      const album = new schema.Album(req.body);
      album.image = req.file && req.file.filename;
      album.user = req.user._id;
      await album.save();
      res.send(album);
    } catch (error) {
      req.file &&
        (await fs.unlink(config.ImageUploadingDir + "/" + req.file.filename));
      res.status(400).send(error);
    }
  }
);

router.post(
  "/accept",
  [authorizationMiddleware, permitMiddleware("admin")],
  async (req, res) => {
    try {
      const album = await schema.Album.findByIdAndUpdate(req.body.id, {
        published: true,
      });
      res.send(album);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.delete(
  "/",
  [authorizationMiddleware, permitMiddleware("admin")],
  async (req, res) => {
    try {
      const album = await schema.Album.findOneAndDelete({ _id: req.body.id });
      res.send(album);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
