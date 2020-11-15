const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fs = require("fs").promises;
const config = require("../config");
const uniqueValidate = require("../tools/models/uniqueValidate");

const AuthorModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: uniqueValidate("Author"),
  },
  image: { type: String, required: true },
  information: String,
});

AuthorModel.pre("deleteMany", async () => {
  const data = await mongoose.model("Author").find();
  await mongoose.model("Album").deleteMany();
  for (item of data) {
    item.image &&
      (await fs.unlink(config.ImageUploadingDir + "/" + item.image));
  }
});

module.exports = AuthorModel;
