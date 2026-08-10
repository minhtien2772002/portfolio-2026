const { hpfCase } = require("../../private/hpf/content.cjs");
const { hasValidVisitAccess, isSameOrigin, noStore, sendJson } = require("../../server/hpf-auth.js");

module.exports = function content(req, res) {
  noStore(res);
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isSameOrigin(req)) return sendJson(res, 403, { error: "Request not allowed." });
  if (!hasValidVisitAccess(req)) {
    res.setHeader("WWW-Authenticate", "Bearer");
    return sendJson(res, 401, { error: "Access required." });
  }
  return sendJson(res, 200, { caseStudy: hpfCase });
};
