const express = require("express");
const schema = require("./../Models");
const router = express.Router();

const tokenHandler = async (req, res, next) => {
  const token = req.get("Authorization");
  const user = await schema.User.findOne({ token });
  if (!user) return res.status(401).send({ error: "Token is not correct." });
  req.user = user;
  next(null, { user });
};

router.post("/", tokenHandler, async (req, res) => {
  if (!req.body.track)
    return res.status(401).send({ error: "Track is not specified." });
  const trackEvent = new schema.TrackHistory({
    track: req.body.track,
    user: user._id,
  });

  try {
    await trackEvent.save();
    return res.send(trackEvent);
  } catch (error) {
    res.status(400).send(error);
  }
});

// // if you want to see result.

// router.get("/", async (req, res) => {
//   try {
//     const events = await schema.TrackHistory.find(req.query);
//     res.send(events);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

module.exports = router;
