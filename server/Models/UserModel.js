const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { User } = require("../Models");
const { nanoid } = require("nanoid");
const Schema = mongoose.Schema;

const UserModel = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  token: {
    type: String,
    required: true,
  },
});
UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserModel.set("toJSON", {
  transform: (doc, ret, option) => {
    delete ret.password;
    return ret;
  },
});

UserModel.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserModel.methods.generateToken = function () {
  this.token = nanoid();
};

module.exports = UserModel;
