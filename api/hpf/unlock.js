const {
  createVisitAccessToken,
  isSameOrigin,
  isValidSessionSecret,
  isValidVisitId,
  noStore,
  readJsonBody,
  sendJson,
  timingSafeTextEqual,
} = require("../../server/hpf-auth.js");

const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 20;
const attempts = new Map();

function clientKey(req) {
  return String(req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
}

function isRateLimited(req, now = Date.now()) {
  const key = clientKey(req);
  const recent = (attempts.get(key) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > RATE_LIMIT;
}

module.exports = async function unlock(req, res) {
  noStore(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isSameOrigin(req)) return sendJson(res, 403, { error: "Request not allowed." });
  if (isRateLimited(req)) return sendJson(res, 429, { error: "Please wait a moment and try again." });

  const configuredPasscode = process.env.HPF_PASSCODE;
  const sessionSecret = process.env.HPF_SESSION_SECRET;
  if (!/^\d{4}$/.test(configuredPasscode || "") || !isValidSessionSecret(sessionSecret)) {
    return sendJson(res, 503, { error: "Access verification is unavailable." });
  }

  try {
    const body = await readJsonBody(req);
    const passcode = typeof body.passcode === "string" ? body.passcode : "";
    const visitId = typeof body.visitId === "string" ? body.visitId : "";
    if (!isValidVisitId(visitId)) return sendJson(res, 400, { error: "Invalid visit." });
    if (!/^\d{4}$/.test(passcode) || !timingSafeTextEqual(passcode, configuredPasscode)) {
      return sendJson(res, 401, { error: "Incorrect passcode." });
    }

    return sendJson(res, 200, {
      ok: true,
      accessToken: createVisitAccessToken(sessionSecret, visitId),
    });
  } catch {
    return sendJson(res, 400, { error: "Invalid request." });
  }
};
