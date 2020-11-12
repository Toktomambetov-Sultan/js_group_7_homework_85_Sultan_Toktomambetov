const express = require("express");
const router = express.Router();
const schema = require("./../Models");

router.get("/", async (req, res) => {
  try {
    const tracksAll = await schema.Track.find().populate({
      path: "album",
      populate: "author",
    });
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

router.post("/", async (req, res) => {
  const track = schema.Track(req.body);
  try {
    await track.save();
    res.send(track);
  } catch (error) {
    res.status(400).send(error);
  }
});

// # if you need to use delete method for all tracks, look at down

router.delete("/", async (req, res) => {
  res.send(await schema.Track.deleteMany());
});

module.exports = router;
