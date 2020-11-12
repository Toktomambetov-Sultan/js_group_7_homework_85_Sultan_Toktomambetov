const express = require("express");
const multer = require("multer");
const schema = require("./../Models");
const path = require("path");
const config = require("../config");
const { nanoid } = require("nanoid");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.ImageUploadingDir);
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(null, false);
    }
    callback(null, true);
  },
});

router.get("/", async (req, res) => {
  res.send(await schema.Author.find());
});

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const author = new schema.Author(req.body);
    author.image = req.file && req.file.filename;
    await author.save();
    res.send(author);
  } catch (error) {
    res.send(error);
  }
});

// # if you need to use delete method for all authors, look at down

// router.delete("/", async (req, res) => {
//   let ans;
//   try {
//     const data = await schema.Author.find();
//     ans = await schema.Author.deleteMany();
//     for (item of data) {
//       item.image && (await fs.unlink(config.ImageUploadingDir + "/" + item.image));
//     }
//   } catch (error) {
//     res.send(error);
//   }
//   res.send(ans);
// });

module.exports = router;
