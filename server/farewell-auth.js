const crypto = require("node:crypto");

const SESSION_TTL_SECONDS = 2 * 60 * 60;
const MINIMUM_SECRET_BYTES = 32;
const COOKIE_NAME = "farewell_session";
const COOKIE_PATH = "/api/farewell";

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

function createSessionToken(secret, recipientId, now = Date.now()) {
  if (!isValidSessionSecret(secret)) throw new Error("Farewell session secret is not configured securely.");
  if (!/^[a-z0-9-]{3,80}$/.test(recipientId || "")) throw new Error("Farewell recipient identifier is invalid.");
  const payload = encode(JSON.stringify({
    v: 1,
    aud: "farewell-recipient",
    rid: recipientId,
    exp: Math.floor(now / 1000) + SESSION_TTL_SECONDS,
    nonce: crypto.randomBytes(16).toString("base64url"),
  }));
  return `${payload}.${sign(payload, secret)}`;
}

function verifySessionToken(token, secret, now = Date.now()) {
  if (!token || typeof token !== "string" || !isValidSessionSecret(secret)) return null;
  const separator = token.lastIndexOf(".");
  if (separator <= 0) return null;
  const payload = token.slice(0, separator);
  const suppliedSignature = token.slice(separator + 1);
  if (!timingSafeTextEqual(suppliedSignature, sign(payload, secret))) return null;

  try {
    const data = JSON.parse(decode(payload));
    if (data.v !== 1
      || data.aud !== "farewell-recipient"
      || !/^[a-z0-9-]{3,80}$/.test(data.rid || "")
      || !Number.isFinite(data.exp)
      || data.exp <= Math.floor(now / 1000)) return null;
    return { recipientId: data.rid, expiresAt: data.exp };
  } catch {
    return null;
  }
}

function parseCookies(req) {
  return String(req.headers?.cookie || "").split(";").reduce((cookies, pair) => {
    const separator = pair.indexOf("=");
    if (separator < 0) return cookies;
    const name = pair.slice(0, separator).trim();
    const value = pair.slice(separator + 1).trim();
    if (name) cookies[name] = decodeURIComponent(value);
    return cookies;
  }, {});
}

function readSession(req) {
  return verifySessionToken(parseCookies(req)[COOKIE_NAME], process.env.FAREWELL_SESSION_SECRET);
}

function sessionCookie(token) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; Path=${COOKIE_PATH}; Max-Age=${SESSION_TTL_SECONDS}; HttpOnly; SameSite=Strict${secure}`;
}

function clearSessionCookie() {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${COOKIE_NAME}=; Path=${COOKIE_PATH}; Max-Age=0; HttpOnly; SameSite=Strict${secure}`;
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
  COOKIE_NAME,
  SESSION_TTL_SECONDS,
  clearSessionCookie,
  createSessionToken,
  isSameOrigin,
  isValidSessionSecret,
  noStore,
  readJsonBody,
  readSession,
  sendJson,
  sessionCookie,
  timingSafeTextEqual,
  verifySessionToken,
};
