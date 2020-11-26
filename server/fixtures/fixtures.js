const schema = require("../Models");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("../config");
const fs = require("fs").promises;
mongoose.connect(config.db.url + config.db.name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});
const db = mongoose.connection;

db.once("open", async () => {
  // await Promise.all(await fs.readdir(config.FixturesImagesDir)).map((item) =>
  //   fs.copyFile(
  //     `${config.FixturesImagesDir}/${item}`,
  //     `${config.ImageUploadingDir}/${item}`
  //   )
  // );
  await Promise.all(
    (await fs.readdir(config.FixturesImagesDir)).map((item) =>
      fs.copyFile(
        `${config.FixturesImagesDir}/${item}`,
        `${config.ImageUploadingDir}/${item}`
      )
    )
  );
  try {
    await db.dropDatabase();
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }
  const user = await schema.User.create({
    role: "admin",
    username: "Sultan",
    password: "H1h2h3h4",
    token: nanoid(),
  });
  const [Author1, Author2] = await schema.Author.create(
    {
      name: "Anya Teylor Joy",
      image: "author-1.jpg",
      user: user._id,
      published: true,
    },
    {
      name: "David Guetta",
      image: "author-2.jpeg",
      user: user._id,
      published: true,
    }
  );
  const [album] = await schema.Album.create(
    {
      name: "Best",
      author: Author2._id,
      image: "album-1.jpeg",
      year: 2002,
      user: user._id,
      published: true,
    },
    {
      name: "before Best",
      author: Author2._id,
      image: "album-2.jpeg",
      year: 1998,
      user: user._id,
      published: true,
    }
  );
  const [track1, track2] = await schema.Track.create(
    {
      name: "first",
      lasting: 100,
      album: album._id,
      user: user._id,
      published: true,
    },
    {
      name: "second",
      lasting: 100,
      album: album._id,
      user: user._id,
      published: true,
    }
  );
  await schema.TrackHistory.create(
    {
      user: user._id,
      track: track1._id,
    },
    {
      user: user._id,
      track: track2._id,
    }
  );
  db.close();
});
