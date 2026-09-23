const fs = require("node:fs");
const path = require("node:path");
const { recipients } = require("../../private/farewell/recipients.cjs");
const { noStore, readSession, sendJson } = require("../../server/farewell-auth.js");

const contentTypes = {
  ".avif": "image/avif",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
};

module.exports = async function image(req, res) {
  noStore(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  const session = readSession(req);
  const recipient = session ? recipients.find((item) => item.id === session.recipientId) : null;
  if (!recipient) return sendJson(res, 401, { error: "Authorization required." });

  const index = Number(req.query?.index);
  if (!Number.isInteger(index) || index < 0) return sendJson(res, 404, { error: "Image not found." });
  const imagesDirectory = path.join(recipient.directory, "images");
  const files = fs.readdirSync(imagesDirectory)
    .filter((file) => contentTypes[path.extname(file).toLowerCase()])
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
  const fileName = files[index];
  if (!fileName) return sendJson(res, 404, { error: "Image not found." });
  const filePath = path.resolve(imagesDirectory, fileName);
  if (!filePath.startsWith(`${path.resolve(imagesDirectory)}${path.sep}`)) {
    return sendJson(res, 404, { error: "Image not found." });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", contentTypes[path.extname(fileName).toLowerCase()]);
  res.setHeader("Content-Disposition", "inline");
  fs.createReadStream(filePath).pipe(res);
};
