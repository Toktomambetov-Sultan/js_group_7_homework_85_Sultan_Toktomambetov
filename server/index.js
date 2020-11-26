const express = require("express");
const config = require("./config");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const authorRouter = require("./routers/authorRouter");
const albumRouter = require("./routers/albumRouter");
const trackRouter = require("./routers/trackRouter");
const userRouter = require("./routers/userRouter");
const trackHistoryRouter = require("./routers/trackHistoryRouter");

const run = async () => {
  try {
    await mongoose.connect(config.db.url + config.db.name, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      autoIndex: true,
    });
  } catch (error) {
    console.error(error);
    return;
  }
  console.log("Connected to mongodb.");
  app.use(cors());
  app.use(express.static("public"));
  app.use(express.json());

  app.use("/authors", authorRouter);
  app.use("/albums", albumRouter);
  app.use("/tracks", trackRouter);
  app.use("/users", userRouter);
  app.use("/track_history", trackHistoryRouter);

  app.listen(config.port, () => {
    console.log(`Server started on ${config.port} port.`);
  });
};
run();
