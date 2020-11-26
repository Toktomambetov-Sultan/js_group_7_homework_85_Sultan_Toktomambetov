const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const Schema = mongoose.Schema;
const fs = require("fs").promises;
const config = require("../config");

const AlbumModel = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  image: { type: String, required: true },
});

AlbumModel.plugin(mongooseIdValidator);

AlbumModel.pre("findOneAndDelete", async function (next) {
  const id = this.getQuery()._id;
  const album = await mongoose.model("Album").findById(id);
  try {
    await mongoose.model("Track").deleteMany({
      album: id,
    });
  } catch (error) {
    console.log(error);
  } finally {
    album.image &&
      (await fs.unlink(config.ImageUploadingDir + "/" + album.image));
    next();
  }
});

AlbumModel.pre("deleteMany", async function () {
  const data = await mongoose.model("Album").find(this.getQuery());
  for (item of data) {
    await mongoose.model("Track").deleteMany({
      album: item._id,
    });
    item.image &&
      (await fs.unlink(config.ImageUploadingDir + "/" + item.image));
  }
});

module.exports = AlbumModel;
