const mongoose = require("mongoose");
const mongooseIdValidator = require("mongoose-id-validator");
const uniqueValidate = require("../tools/models/uniqueValidate");
const Schema = mongoose.Schema;

const TrackHistoryModel = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  track: {
    type: Schema.Types.ObjectId,
    ref: "Track",
    required: true,
    unique: true,
    validate: uniqueValidate("TrackHistory", "track"),
  },
  __datetime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

TrackHistoryModel.plugin(mongooseIdValidator);

module.exports = TrackHistoryModel;
