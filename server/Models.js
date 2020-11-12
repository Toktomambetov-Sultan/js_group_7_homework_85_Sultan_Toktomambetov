const mongoose = require("mongoose");

const AlbumModel = require("./Models/AlbumModel");
const AuthorModel = require("./Models/AuthorModel");
const TrackHistoryModel = require("./Models/TrackHistoryModel");
const TrackModel = require("./Models/TrackModel");
const UserModel = require("./Models/UserModel");

const Album = mongoose.model("Album", AlbumModel);
const Track = mongoose.model("Track", TrackModel);
const Author = mongoose.model("Author", AuthorModel);
const User = mongoose.model("User", UserModel);
const TrackHistory = mongoose.model("TrackHistory", TrackHistoryModel);

module.exports = {
  Author,
  Album,
  Track,
  User,
  TrackHistory,
};
