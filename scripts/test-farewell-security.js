const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const validKey = ["ADZ", "96", "TT"].join("-");
const testSecret = "farewell-test-session-secret-with-more-than-thirty-two-bytes";
process.env.FAREWELL_SESSION_SECRET = testSecret;
process.env.NODE_ENV = "test";

const unlock = require("../api/farewell/unlock.js");
const content = require("../api/farewell/content.js");
const image = require("../api/farewell/image.js");
const close = require("../api/farewell/close.js");
const { createSessionToken, verifySessionToken } = require("../server/farewell-auth.js");
const { recipients } = require("../private/farewell/recipients.cjs");

const routes = new Map([
  ["/api/farewell/unlock", unlock],
  ["/api/farewell/content", content],
  ["/api/farewell/image", image],
  ["/api/farewell/close", close],
]);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  if (url.pathname === "/4ever") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    fs.createReadStream(path.join(root, "index.html")).pipe(res);
    return;
  }
  req.query = Object.fromEntries(url.searchParams.entries());
  const handler = routes.get(url.pathname);
  if (!handler) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  Promise.resolve(handler(req, res)).catch(() => {
    if (!res.headersSent) res.statusCode = 500;
    res.end("Request failed");
  });
});

async function request(baseUrl, pathname, options = {}) {
  return fetch(`${baseUrl}${pathname}`, { redirect: "manual", ...options });
}

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const originHeaders = { Origin: baseUrl, "Content-Type": "application/json" };

  const publicPage = await request(baseUrl, "/4ever");
  const publicHtml = await publicPage.text();
  assert.equal(publicPage.status, 200);
  assert.doesNotMatch(publicHtml, /private\/farewell|hot-air-balloon/i);

  const anonymousContent = await request(baseUrl, "/api/farewell/content");
  assert.equal(anonymousContent.status, 401);
  await anonymousContent.text();

  const anonymousImage = await request(baseUrl, "/api/farewell/image?index=0");
  assert.equal(anonymousImage.status, 401);

  const invalid = await request(baseUrl, "/api/farewell/unlock", {
    method: "POST",
    headers: originHeaders,
    body: JSON.stringify({ key: "BAD-11-ZZ" }),
  });
  assert.equal(invalid.status, 401);
  assert.equal(invalid.headers.get("set-cookie"), null);

  const crossOrigin = await request(baseUrl, "/api/farewell/unlock", {
    method: "POST",
    headers: { Origin: "https://example.invalid", "Content-Type": "application/json" },
    body: JSON.stringify({ key: validKey }),
  });
  assert.equal(crossOrigin.status, 403);

  const unlocked = await request(baseUrl, "/api/farewell/unlock", {
    method: "POST",
    headers: originHeaders,
    body: JSON.stringify({ key: validKey }),
  });
  assert.equal(unlocked.status, 200);
  const setCookie = unlocked.headers.get("set-cookie");
  assert.match(setCookie, /farewell_session=/);
  assert.match(setCookie, /HttpOnly/);
  assert.match(setCookie, /SameSite=Strict/);
  assert.doesNotMatch(setCookie, new RegExp(validKey));
  const cookie = setCookie.split(";")[0];

  const refreshedContent = await request(baseUrl, "/api/farewell/content", { headers: { Cookie: cookie } });
  assert.equal(refreshedContent.status, 200);
  const payload = await refreshedContent.json();
  assert.equal(payload.recipient, "Thi Thao");
  const privateMarker = payload.letter.trim().slice(0, 64);
  assert.ok(privateMarker.length >= 16);
  assert.equal(publicHtml.includes(privateMarker), false);
  const fixtureRecipient = recipients.find((recipient) => recipient.id === "advizia-thi-thao");
  const expectedImageCount = fs.readdirSync(path.join(fixtureRecipient.directory, "images"))
    .filter((fileName) => /\.(?:avif|jpe?g|png|webp)$/i.test(fileName)).length;
  assert.equal(payload.images.length, expectedImageCount);
  assert.deepEqual(Object.keys(payload.images[0]).sort(), ["id", "index"]);

  const authorizedImage = await request(baseUrl, "/api/farewell/image?index=0", { headers: { Cookie: cookie } });
  assert.equal(authorizedImage.status, 200);
  assert.match(authorizedImage.headers.get("content-type"), /^image\/(?:avif|jpeg|png|webp)$/);
  assert.ok((await authorizedImage.arrayBuffer()).byteLength > 0);

  const forged = await request(baseUrl, "/api/farewell/content", { headers: { Cookie: "farewell_session=unsigned" } });
  assert.equal(forged.status, 401);

  const otherRecipientToken = createSessionToken(testSecret, "different-recipient");
  const crossRecipient = await request(baseUrl, "/api/farewell/content", {
    headers: { Cookie: `farewell_session=${otherRecipientToken}` },
  });
  assert.equal(crossRecipient.status, 401);

  const expiredToken = createSessionToken(testSecret, "advizia-thi-thao", Date.now() - (3 * 60 * 60 * 1000));
  assert.equal(verifySessionToken(expiredToken, testSecret), null);
  const expired = await request(baseUrl, "/api/farewell/content", {
    headers: { Cookie: `farewell_session=${expiredToken}` },
  });
  assert.equal(expired.status, 401);

  const closed = await request(baseUrl, "/api/farewell/close", {
    method: "POST",
    headers: { ...originHeaders, Cookie: cookie },
    body: "{}",
  });
  assert.equal(closed.status, 200);
  assert.match(closed.headers.get("set-cookie"), /Max-Age=0/);
  const afterClose = await request(baseUrl, "/api/farewell/content");
  assert.equal(afterClose.status, 401);

  let rateLimitedResponse;
  for (let attempt = 0; attempt < 13; attempt += 1) {
    rateLimitedResponse = await request(baseUrl, "/api/farewell/unlock", {
      method: "POST",
      headers: { ...originHeaders, "X-Forwarded-For": "198.51.100.24" },
      body: JSON.stringify({ key: "BAD-11-ZZ" }),
    });
  }
  assert.equal(rateLimitedResponse.status, 429);

  const publicSources = [
    fs.readFileSync(path.join(root, "index.html"), "utf8"),
    fs.readFileSync(path.join(root, "src/app.js"), "utf8"),
    fs.readFileSync(path.join(root, "src/farewell.js"), "utf8"),
  ].join("\n");
  assert.equal(publicSources.includes(privateMarker), false);
  assert.doesNotMatch(publicSources, new RegExp(validKey));
  assert.doesNotMatch(publicSources, /hot-air-balloon|private\/farewell/i);

  console.log("Farewell security tests passed (authorization, refresh, close, isolation, and protected media). ");
}

run()
  .catch((error) => {
    console.error(error.stack || error.message);
    process.exitCode = 1;
  })
  .finally(() => server.close());
