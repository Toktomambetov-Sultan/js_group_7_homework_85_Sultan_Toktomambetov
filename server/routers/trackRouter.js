const express = require("express");
const router = express.Router();
const schema = require("./../Models");

const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");
const permitMiddleware = require("./../tools/routers/permitMiddleware");

router.get("/", authorizationMiddleware, async (req, res) => {
  try {
    const tracksAll = await schema.Track.find()
      .populate({
        path: "album",
        populate: "author",
      })
      .populate("user");
    const tracks = tracksAll.filter((track) => {
      const author = track.album.author._id;
      const album = track.album._id;

      if (req.query.author) {
        return String(author) === req.query.author;
      } else if (req.query.album) {
        return String(album) === req.query.album;
      } else {
        return true;
      }
    });

    res.send(tracks);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", authorizationMiddleware, async (req, res) => {
  try {
    delete req.body.published;
    const track = schema.Track(req.body);
    track.user = req.user._id;
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post(
  "/accept",
  [authorizationMiddleware, permitMiddleware("admin")],
  async (req, res) => {
    try {
      const track = await schema.Track.findByIdAndUpdate(req.body.id, {
        published: true,
      });
      res.send(track);
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
      const track = await schema.Track.findOneAndDelete({ _id: req.body.id });
      res.send(track);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
