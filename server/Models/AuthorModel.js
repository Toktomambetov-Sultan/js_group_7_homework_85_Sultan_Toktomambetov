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
  image: { type: String, required: true },
  information: String,
});

AuthorModel.pre("findOneAndDelete", async function (next) {
  const id = this.getQuery()._id
  const author = await mongoose.model("Author").findById(id)
  try {
    await mongoose.model("Album").deleteMany({
      author: id,
    });
  } catch (error) {
    console.log(error);
  } finally {
    author.image &&
      (await fs.unlink(config.ImageUploadingDir + "/" + author.image));
    next();
  }
});

module.exports = AuthorModel;
