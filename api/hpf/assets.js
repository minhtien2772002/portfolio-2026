const fs = require("node:fs");
const path = require("node:path");
const { hasValidVisitAccess, isSameOrigin, noStore, sendJson } = require("../../server/hpf-auth.js");

const assetDirectory = path.resolve(__dirname, "../../private/hpf/assets");

module.exports = function asset(req, res) {
  noStore(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isSameOrigin(req) || !hasValidVisitAccess(req)) return sendJson(res, 404, { error: "Not found." });

  const requestedName = typeof req.query?.name === "string" ? req.query.name : "";
  const fileName = path.basename(requestedName);
  if (fileName !== requestedName || !/^[a-z0-9-]+\.webp$/i.test(fileName)) {
    return sendJson(res, 404, { error: "Not found." });
  }

  const filePath = path.join(assetDirectory, fileName);
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    return sendJson(res, 404, { error: "Not found." });
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/webp");
  res.setHeader("Content-Length", fs.statSync(filePath).size);
  return fs.createReadStream(filePath).pipe(res);
};
