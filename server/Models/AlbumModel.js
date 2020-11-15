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
  year: {
    type: Number,
    default: new Date().getFullYear(),
  },
  image: { type: String, required: true },
});

AlbumModel.plugin(mongooseIdValidator);

AlbumModel.pre("deleteMany", async () => {
  const data = await mongoose.model("Album").find();
  await mongoose.model("Track").deleteMany();
  for (item of data) {
    item.image &&
      (await fs.unlink(config.ImageUploadingDir + "/" + item.image));
  }
});

module.exports = AlbumModel;
