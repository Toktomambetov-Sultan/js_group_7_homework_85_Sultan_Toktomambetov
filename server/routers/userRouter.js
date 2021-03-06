const express = require("express");
const schema = require("./../Models");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  try {
    const users = await schema.User.find(req.query);
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = new schema.User(req.body);
    user.generateToken();
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/sessions", async (req, res) => {
  const user = await schema.User.findOne({ username: req.body.username });

  if (!user) return res.status(400).send({ error: "username not found." });

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) res.status(400).send({ error: "Password is wrong." });
  user.generateToken();
  await user.save();

  res.send({ message: "Username and password correct.", user });
});

module.exports = router;
