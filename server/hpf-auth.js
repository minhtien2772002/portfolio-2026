const crypto = require("node:crypto");

const VISIT_TOKEN_TTL_SECONDS = 2 * 60 * 60;
const MINIMUM_SECRET_BYTES = 32;
const VISIT_ID_PATTERN = /^[a-z0-9_-]{16,128}$/i;

function isValidSessionSecret(secret) {
  return typeof secret === "string" && Buffer.byteLength(secret) >= MINIMUM_SECRET_BYTES;
}

function encode(value) {
  return Buffer.from(value).toString("base64url");
}

function decode(value) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function digest(value) {
  return crypto.createHash("sha256").update(String(value)).digest();
}

function timingSafeTextEqual(left, right) {
  return crypto.timingSafeEqual(digest(left), digest(right));
}

function sign(payload, secret) {
  return crypto.createHmac("sha256", secret).update(payload).digest("base64url");
}

function visitDigest(visitId) {
  return crypto.createHash("sha256").update(visitId).digest("base64url");
}

function isValidVisitId(visitId) {
  return typeof visitId === "string" && VISIT_ID_PATTERN.test(visitId);
}

function createVisitAccessToken(secret, visitId, now = Date.now()) {
  if (!isValidSessionSecret(secret)) throw new Error("HPF session secret is not configured securely.");
  if (!isValidVisitId(visitId)) throw new Error("HPF visit identifier is invalid.");
  const payload = encode(JSON.stringify({
    v: 2,
    aud: "hpf-visit",
    exp: Math.floor(now / 1000) + VISIT_TOKEN_TTL_SECONDS,
    visit: visitDigest(visitId),
    nonce: crypto.randomBytes(16).toString("base64url"),
  }));
  return `${payload}.${sign(payload, secret)}`;
}

function verifyVisitAccessToken(token, visitId, secret, now = Date.now()) {
  if (!token || !isValidVisitId(visitId) || !isValidSessionSecret(secret) || typeof token !== "string") return false;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return false;
  const payload = token.slice(0, separator);
  const suppliedSignature = token.slice(separator + 1);
  const expectedSignature = sign(payload, secret);
  if (!timingSafeTextEqual(suppliedSignature, expectedSignature)) return false;

  try {
    const data = JSON.parse(decode(payload));
    return data.v === 2
      && data.aud === "hpf-visit"
      && data.visit === visitDigest(visitId)
      && Number.isFinite(data.exp)
      && data.exp > Math.floor(now / 1000);
  } catch {
    return false;
  }
}

function readBearerToken(req) {
  const match = String(req.headers?.authorization || "").match(/^Bearer ([A-Za-z0-9._~-]+)$/);
  return match ? match[1] : "";
}

function hasValidVisitAccess(req) {
  const secret = process.env.HPF_SESSION_SECRET;
  if (!isValidSessionSecret(secret)) return false;
  const visitId = String(req.headers?.["x-hpf-visit"] || "");
  return verifyVisitAccessToken(readBearerToken(req), visitId, secret);
}

function noStore(res) {
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("X-Robots-Tag", "noindex, noarchive, nosnippet");
}

function isSameOrigin(req) {
  const fetchSite = String(req.headers?.["sec-fetch-site"] || "").toLowerCase();
  if (fetchSite && !["same-origin", "same-site", "none"].includes(fetchSite)) return false;
  const origin = req.headers?.origin;
  if (!origin) return true;
  const host = req.headers?.["x-forwarded-host"] || req.headers?.host;
  const protocol = req.headers?.["x-forwarded-proto"] || (process.env.NODE_ENV === "production" ? "https" : "http");
  if (!host) return false;
  try {
    return new URL(origin).origin === `${protocol}://${host}`;
  } catch {
    return false;
  }
}

function readJsonBody(req, limit = 1024) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  if (typeof req.body === "string") {
    if (Buffer.byteLength(req.body) > limit) return Promise.reject(new Error("body-too-large"));
    return Promise.resolve(JSON.parse(req.body));
  }
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (Buffer.byteLength(body) > limit) reject(new Error("body-too-large"));
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("invalid-json"));
      }
    });
    req.on("error", reject);
  });
}

function sendJson(res, statusCode, body) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

module.exports = {
  VISIT_TOKEN_TTL_SECONDS,
  createVisitAccessToken,
  hasValidVisitAccess,
  isValidSessionSecret,
  isValidVisitId,
  isSameOrigin,
  noStore,
  readJsonBody,
  sendJson,
  timingSafeTextEqual,
  verifyVisitAccessToken,
};
