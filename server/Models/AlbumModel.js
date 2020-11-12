const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const Schema = mongoose.Schema;

const AlbumModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value) => {
        const author = await mongoose.model("Album").findOne({ name: value });
        if (author) return false;
      },
      message: (props) => {
        return `Album property ${props.path} already exists.`;
      },
    },
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  image: { type: String, required: true },
  __date: {
    type: Date,
    default: Date.now,
  },
});

AlbumModel.plugin(mongooseIdValidator);

AlbumModel.pre("deleteMany", async () => {
  await mongoose.model("Track").deleteMany();
});

module.exports = AlbumModel;
