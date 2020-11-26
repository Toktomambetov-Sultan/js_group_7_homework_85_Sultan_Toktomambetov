const path = require("path");
const rootDir = __dirname;
module.exports = {
  port: 8000,
  ImageUploadingDir: path.join(rootDir, "public/images"),
  rootDir,
  FixturesImagesDir: path.join(rootDir, "fixtures/images"),
  db: {
    name: "music",
    url: "mongodb://localhost:27017/",
  },
};
