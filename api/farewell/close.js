const {
  clearSessionCookie,
  isSameOrigin,
  noStore,
  sendJson,
} = require("../../server/farewell-auth.js");

module.exports = async function close(req, res) {
  noStore(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isSameOrigin(req)) return sendJson(res, 403, { error: "Request not allowed." });
  res.setHeader("Set-Cookie", clearSessionCookie());
  return sendJson(res, 200, { ok: true });
};
