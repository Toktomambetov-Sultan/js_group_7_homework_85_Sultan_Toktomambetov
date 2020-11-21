const express = require("express");
const schema = require("./../Models");
const router = express.Router();
const bcrypt = require("bcrypt");
const authorizationMiddleware = require("./../tools/routers/authorizationMiddleware");

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
  try {
    const user = await schema.User.findOne({ username: req.body.username });
    if (!user)
      return res.status(400).send({
        error: {
          username: { message: "Username not found." },
        },
      });
    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch)
      return res.status(400).send({
        error: {
          password: { message: "Password is wrong." },
        },
      });
    user.generateToken();
    await user.save({ validateBeforeSave: false });

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/log_out", authorizationMiddleware, async (req, res) => {
  try {
    req.user.generateToken();
    await req.user.save({ validateBeforeSave: false });
    res.send({ message: "user loged out" });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/", async (req, res) => {
  return res.send(await schema.User.deleteMany());
});

module.exports = router;
