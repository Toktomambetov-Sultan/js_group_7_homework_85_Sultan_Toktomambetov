const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const { Track } = require("../Models");
const Schema = mongoose.Schema;

const TrackModel = new Schema({
  name: {
    type: String,
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

TrackModel.plugin(mongooseIdValidator);

TrackModel.pre("save", async function (next) {
  this.count = (await mongoose.model("Track").countDocuments()) + 1;
  next();
});

TrackModel.pre("findOneAndDelete", async function (next) {
  try {
    const id = this.getQuery()._id;
    await mongoose.model("TrackHistory").deleteMany({
      track: id,
    });
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
});

TrackModel.pre("deleteMany", async function () {
  const data = await mongoose.model("Track").find(this.getQuery());
  for (item of data) {
    await mongoose.model("TrackHistory").deleteMany({
      track: item._id,
    });
  }
});

module.exports = TrackModel;
