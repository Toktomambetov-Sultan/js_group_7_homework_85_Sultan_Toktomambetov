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
  const [user1, user2] = await schema.User.create(
    {
      role: "admin",
      username: "Sultan",
      password: "H1h2h3h4",
      token: nanoid(),
    },
    {
      role: "user",
      username: "Bakyt",
      password: "H1h2h3h4",
      token: nanoid(),
    }
  );
  const [Author1, Author2] = await schema.Author.create(
    {
      name: "Anya Teylor Joy",
      image: "author-1.jpg",
      user: user1._id,
      published: true,
    },
    {
      name: "David Guetta",
      image: "author-2.jpeg",
      user: user2._id,
      published: true,
    }
  );
  const [album1, album2, album3, album4] = await schema.Album.create(
    {
      name: "Best",
      author: Author2._id,
      image: "album-1.jpeg",
      year: 2002,
      user: user1._id,
      published: true,
    },
    {
      name: "before Best",
      author: Author2._id,
      image: "album-2.jpeg",
      year: 1998,
      user: user2._id,
      published: true,
    },
    {
      name: "Best1",
      author: Author1._id,
      image: "album-3.jpeg",
      year: 2002,
      user: user1._id,
      published: true,
    },
    {
      name: "before Bes2",
      author: Author1._id,
      image: "album-4.jpeg",
      year: 1998,
      user: user2._id,
      published: true,
    }
  );
  const [track1, track2] = await schema.Track.create(
    {
      name: "first",
      lasting: 100,
      album: album1._id,
      user: user1._id,
      published: true,
    },
    {
      name: "second",
      lasting: 100,
      album: album1._id,
      user: user1._id,
      published: true,
    },
    {
      name: "third",
      lasting: 100,
      album: album1._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fourth",
      lasting: 100,
      album: album1._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fifth",
      lasting: 100,
      album: album1._id,
      user: user1._id,
      published: true,
    },
    {
      name: "first2",
      lasting: 100,
      album: album2._id,
      user: user1._id,
      published: true,
    },
    {
      name: "second2",
      lasting: 100,
      album: album2._id,
      user: user1._id,
      published: true,
    },
    {
      name: "third2",
      lasting: 100,
      album: album2._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fourth2",
      lasting: 100,
      album: album2._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fifth2",
      lasting: 100,
      album: album2._id,
      user: user1._id,
      published: true,
    },
    {
      name: "first3",
      lasting: 100,
      album: album3._id,
      user: user1._id,
      published: true,
    },
    {
      name: "second3",
      lasting: 100,
      album: album3._id,
      user: user1._id,
      published: true,
    },
    {
      name: "third3",
      lasting: 100,
      album: album3._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fourth3",
      lasting: 100,
      album: album3._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fifth3",
      lasting: 100,
      album: album3._id,
      user: user1._id,
      published: true,
    },
    {
      name: "first4",
      lasting: 100,
      album: album4._id,
      user: user1._id,
      published: true,
    },
    {
      name: "second4",
      lasting: 100,
      album: album4._id,
      user: user1._id,
      published: true,
    },
    {
      name: "third4",
      lasting: 100,
      album: album4._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fourth4",
      lasting: 100,
      album: album4._id,
      user: user1._id,
      published: true,
    },
    {
      name: "fifth4",
      lasting: 100,
      album: album4._id,
      user: user1._id,
      published: true,
    }
  );
  await schema.TrackHistory.create(
    {
      user: user1._id,
      track: track1._id,
    },
    {
      user: user1._id,
      track: track2._id,
    }
  );
  db.close();
});
