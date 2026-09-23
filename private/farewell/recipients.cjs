const path = require("node:path");

const contentRoot = __dirname;

const recipients = [
  {
    id: "advizia-thi-thao",
    keyDigest: "b7c20a58431fb8fb81decc9b20d2ef884c06f21c665d485a185624a6976b7446",
    recipient: "Thi Thao",
    company: "Advizia",
    flowerSeed: "advizia-thi-thao-farewell",
    directory: path.join(contentRoot, "advizia-thi-thao"),
  },
];

module.exports = { recipients };
