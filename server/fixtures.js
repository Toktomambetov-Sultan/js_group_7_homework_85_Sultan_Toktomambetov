const schema = require("./Models");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./config");
mongoose.connect(config.db.url + config.db.name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});
const db = mongoose.connection;

db.once("open", async () => {
  try {
    await db.dropDatabase();
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }
  const [Author1, Author2] = await schema.Author.create(
    {
      name: "Anya Teylor Joy",
      image: "author-1.jpg",
    },
    {
      name: "David Guetta",
      image: "author-2.jpeg",
    }
  );
  const [album] = await schema.Album.create(
    {
      name: "Best",
      author: Author2._id,
      image: "album.jpeg",
      year: 2002,
    },
    {
      name: "before Best",
      author: Author2._id,
      image: "album.jpeg",
      year: 1998,
    }
  );
  const [track1, track2] = await schema.Track.create(
    {
      name: "first",
      lasting: 100,
      album: album._id,
    },
    {
      name: "second",
      lasting: 100,
      album: album._id,
    }
  );
  const user = await schema.User.create({
    username: "sultan",
    password: "H1h2h3h4",
    token: nanoid(),
  });
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
