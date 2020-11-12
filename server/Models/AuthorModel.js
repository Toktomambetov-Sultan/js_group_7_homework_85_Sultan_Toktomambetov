const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorModel = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value) => {
        const author = await mongoose.model("Author").findOne({ name: value });
        if (author) return false;
      },
      message: (props) => {
        console.log(props);
        return `Author property ${props.path} already exists.`;
      },
    },
  },
  information: String,
  image: { type: String, required: true },
});

AuthorModel.pre("deleteMany", async () => {
  await mongoose.model("Album").deleteMany();
});

module.exports = AuthorModel;
