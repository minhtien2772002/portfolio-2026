const crypto = require("node:crypto");
const { recipients } = require("../../private/farewell/recipients.cjs");
const {
  createSessionToken,
  isSameOrigin,
  isValidSessionSecret,
  noStore,
  readJsonBody,
  sendJson,
  sessionCookie,
  timingSafeTextEqual,
} = require("../../server/farewell-auth.js");

const RATE_WINDOW_MS = 10 * 60_000;
const RATE_LIMIT = 12;
const attempts = new Map();

function clientKey(req) {
  return String(req.headers?.["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim();
}

function recordFailure(req, now = Date.now()) {
  const key = clientKey(req);
  const recent = (attempts.get(key) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > RATE_LIMIT;
}

function isBlocked(req, now = Date.now()) {
  const recent = (attempts.get(clientKey(req)) || []).filter((timestamp) => now - timestamp < RATE_WINDOW_MS);
  return recent.length > RATE_LIMIT;
}

function normalizeKey(value) {
  return String(value || "").trim().toUpperCase();
}

function keyDigest(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

module.exports = async function unlock(req, res) {
  noStore(res);
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!isSameOrigin(req)) return sendJson(res, 403, { error: "Request not allowed." });
  if (isBlocked(req)) return sendJson(res, 429, { error: "Please wait a moment and try again." });
  if (!isValidSessionSecret(process.env.FAREWELL_SESSION_SECRET)) {
    return sendJson(res, 503, { error: "Access verification is unavailable." });
  }

  try {
    const body = await readJsonBody(req);
    const key = normalizeKey(body.key);
    if (!/^[A-Z]{3}-\d{2}-[A-Z]{2}$/.test(key)) {
      recordFailure(req);
      return sendJson(res, 401, { error: "Couldn't find that letter. Check your code and try again." });
    }

    const suppliedDigest = keyDigest(key);
    const recipient = recipients.find((item) => timingSafeTextEqual(suppliedDigest, item.keyDigest));
    if (!recipient) {
      const limited = recordFailure(req);
      return sendJson(res, limited ? 429 : 401, {
        error: limited ? "Please wait a moment and try again." : "Couldn't find that letter. Check your code and try again.",
      });
    }

    attempts.delete(clientKey(req));
    const token = createSessionToken(process.env.FAREWELL_SESSION_SECRET, recipient.id);
    res.setHeader("Set-Cookie", sessionCookie(token));
    return sendJson(res, 200, { ok: true });
  } catch {
    return sendJson(res, 400, { error: "Invalid request." });
  }
};
