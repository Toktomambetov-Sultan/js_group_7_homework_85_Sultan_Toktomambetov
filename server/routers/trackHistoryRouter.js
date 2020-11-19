const express = require("express");
const schema = require("./../Models");
const router = express.Router();
const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");

router.post("/", authorizationMiddleware, async (req, res) => {
  try {
    if (!req.body.track)
      return res.status(401).send({ error: "Track is not specified." });
    const trackEvent = new schema.TrackHistory({
      track: req.body.track,
      user: req.user._id,
    });
    await trackEvent.save();
    return res.send(trackEvent);
  } catch (error) {
    return res.status(400).send(error);
  }
});
router.get("/", authorizationMiddleware, async (req, res) => {
  try {
    const events = await schema.TrackHistory.find({
      user: req.user._id,
    })
      .populate({
        path: "track",
        populate: {
          path: "album",
          populate: {
            path: "author",
          },
        },
      })
      .sort({ __datetime: -1 });
    res.send(events);
  } catch (error) {
    res.status(400).send(error);
  }
});

// if you want to see result.

router.delete("/", async (req, res) => {
  try {
    res.send(await schema.TrackHistory.deleteMany());
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
