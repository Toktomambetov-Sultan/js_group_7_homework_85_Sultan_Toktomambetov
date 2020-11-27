const express = require("express");
const schema = require("./../Models");
const config = require("../config");
const uploadImage = require("../tools/routers/uploadImg");
const router = express.Router();
const fs = require("fs").promises;

const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");
const permitMiddleware = require("./../tools/routers/permitMiddleware");

router.get("/", authorizationMiddleware, async (req, res) => {
  res.send(
    await schema.Author.find({
      ...req.query,
      ...(req.user.role === "admin" ? {} : { published: true }),
    }).populate("user")
  );
});

router.post(
  "/",
  [authorizationMiddleware, uploadImage.single("image")],
  async (req, res) => {
    try {
      delete req.body.published;
      const author = new schema.Author(req.body);
      author.image = req.file && req.file.filename;
      author.user = req.user._id;
      await author.save();
      res.send(author);
    } catch (error) {
      req.file &&
        (await fs.unlink(config.ImageUploadingDir + "/" + req.file.filename));
      res.send(error);
    }
  }
);

router.post(
  "/accept",
  [authorizationMiddleware, permitMiddleware("admin")],
  async (req, res) => {
    try {
      const author = await schema.Author.findByIdAndUpdate(req.body.id, {
        published: true,
      });
      res.send(author);
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
      const author = await schema.Author.findOneAndDelete({ _id: req.body.id });
      res.send(author);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
