const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const { Track } = require("../Models");
const Schema = mongoose.Schema;

const TrackModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value) => {
        const author = await mongoose.model("Track").findOne({ name: value });
        if (author) return false;
      },
      message: (props) => {
        return `Track property ${props.path} already exists.`;
      },
    },
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: "Album",
    required: true,
  },
  lasting: {
    type: Number,
    required: true,
  },
  count: { type: Number, default: 0 },
});
TrackModel.pre("save", async function (next) {
  this.count = (await mongoose.model("Track").countDocuments()) + 1;
  next();
});
TrackModel.plugin(mongooseIdValidator);

module.exports = TrackModel;
