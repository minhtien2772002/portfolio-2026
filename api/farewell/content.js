const fs = require("node:fs");
const path = require("node:path");
const { recipients } = require("../../private/farewell/recipients.cjs");
const { noStore, readSession, sendJson } = require("../../server/farewell-auth.js");

const supportedImagePattern = /\.(?:avif|jpe?g|png|webp)$/i;

function resolveRecipient(req) {
  const session = readSession(req);
  return session ? recipients.find((item) => item.id === session.recipientId) || null : null;
}

module.exports = async function content(req, res) {
  noStore(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  const recipient = resolveRecipient(req);
  if (!recipient) return sendJson(res, 401, { error: "Authorization required." });

  try {
    const letter = fs.readFileSync(path.join(recipient.directory, "letter.md"), "utf8");
    const imagesDirectory = path.join(recipient.directory, "images");
    const imageFiles = fs.readdirSync(imagesDirectory)
      .filter((file) => supportedImagePattern.test(file))
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
    return sendJson(res, 200, {
      recipient: recipient.recipient,
      company: recipient.company,
      letter,
      flowerSeed: recipient.flowerSeed,
      images: imageFiles.map((_, index) => ({ id: `photo-${index + 1}`, index })),
    });
  } catch {
    return sendJson(res, 500, { error: "This letter is temporarily unavailable." });
  }
};
