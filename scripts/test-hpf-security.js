const assert = require("node:assert/strict");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const testPasscode = [7, 3, 9, 1].join("");
const testSecret = "test-only-session-secret-with-more-than-thirty-two-bytes";
process.env.HPF_PASSCODE = testPasscode;
process.env.HPF_SESSION_SECRET = testSecret;
process.env.NODE_ENV = "test";

const unlock = require("../api/hpf/unlock.js");
const content = require("../api/hpf/content.js");
const asset = require("../api/hpf/assets.js");
const { createVisitAccessToken, verifyVisitAccessToken } = require("../server/hpf-auth.js");

const routes = new Map([
  ["/api/hpf/unlock", unlock],
  ["/api/hpf/content", content],
  ["/api/hpf/assets", asset],
]);

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
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
  return fetch(`${baseUrl}${pathname}`, {
    redirect: "manual",
    ...options,
  });
}

async function run() {
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address();
  const baseUrl = `http://127.0.0.1:${port}`;
  const originHeaders = { Origin: baseUrl, "Content-Type": "application/json" };
  const visitId = "visit-security-test-0001";
  const secondVisitId = "visit-security-test-0002";
  const protectedFiles = fs.readdirSync(path.join(root, "private/hpf/assets")).filter((file) => file.endsWith(".webp"));
  assert.ok(protectedFiles.length >= 3, "expected protected HPF screenshots");

  const anonymousContent = await request(baseUrl, "/api/hpf/content");
  assert.equal(anonymousContent.status, 401);
  assert.match(anonymousContent.headers.get("cache-control"), /private, no-store/);
  assert.doesNotMatch(await anonymousContent.text(), /personal-development platform for men/i);

  for (const file of protectedFiles.slice(0, 3)) {
    const anonymousAsset = await request(baseUrl, `/api/hpf/assets?name=${encodeURIComponent(file)}`);
    assert.equal(anonymousAsset.status, 404);
    assert.doesNotMatch(await anonymousAsset.text(), /private\/hpf|Users\//i);
  }

  const crossOrigin = await request(baseUrl, "/api/hpf/unlock", {
    method: "POST",
    headers: { Origin: "https://example.invalid", "Content-Type": "application/json" },
    body: JSON.stringify({ passcode: testPasscode, visitId }),
  });
  assert.equal(crossOrigin.status, 403);

  const wrong = await request(baseUrl, "/api/hpf/unlock", {
    method: "POST",
    headers: originHeaders,
    body: JSON.stringify({ passcode: "0000", visitId }),
  });
  assert.equal(wrong.status, 401);
  assert.equal(wrong.headers.get("set-cookie"), null);

  const correct = await request(baseUrl, "/api/hpf/unlock", {
    method: "POST",
    headers: originHeaders,
    body: JSON.stringify({ passcode: testPasscode, visitId }),
  });
  assert.equal(correct.status, 200);
  assert.equal(correct.headers.get("set-cookie"), null);
  const unlockPayload = await correct.json();
  assert.equal(unlockPayload.ok, true);
  assert.equal(typeof unlockPayload.accessToken, "string");
  assert.doesNotMatch(unlockPayload.accessToken, new RegExp(testPasscode));
  const authorizedHeaders = {
    Origin: baseUrl,
    Authorization: `Bearer ${unlockPayload.accessToken}`,
    "X-HPF-Visit": visitId,
  };

  const cookieOnly = await request(baseUrl, "/api/hpf/content", { headers: { Cookie: "hpf_access=legacy" } });
  assert.equal(cookieOnly.status, 401);

  const token = unlockPayload.accessToken;
  const tamperedToken = `${token.slice(0, -1)}${token.endsWith("a") ? "b" : "a"}`;
  const forgedToken = await request(baseUrl, "/api/hpf/content", {
    headers: { Origin: baseUrl, Authorization: `Bearer ${tamperedToken}`, "X-HPF-Visit": visitId },
  });
  assert.equal(forgedToken.status, 401);

  const differentVisit = await request(baseUrl, "/api/hpf/content", {
    headers: { Origin: baseUrl, Authorization: `Bearer ${token}`, "X-HPF-Visit": secondVisitId },
  });
  assert.equal(differentVisit.status, 401);

  const refreshedVisit = await request(baseUrl, "/api/hpf/content", { headers: { Origin: baseUrl } });
  assert.equal(refreshedVisit.status, 401);

  const authorizedContent = await request(baseUrl, "/api/hpf/content", { headers: authorizedHeaders });
  assert.equal(authorizedContent.status, 200);
  assert.match(authorizedContent.headers.get("x-robots-tag"), /noindex/);
  const payload = await authorizedContent.json();
  assert.equal(payload.caseStudy.title, "HPF");
  assert.ok(payload.caseStudy.sections.length > 10);

  const authorizedAsset = await request(baseUrl, `/api/hpf/assets?name=${encodeURIComponent(protectedFiles[0])}`, { headers: authorizedHeaders });
  assert.equal(authorizedAsset.status, 200);
  assert.equal(authorizedAsset.headers.get("content-type"), "image/webp");
  assert.ok((await authorizedAsset.arrayBuffer()).byteLength > 0);

  const expired = createVisitAccessToken(testSecret, visitId, Date.now() - (3 * 60 * 60 * 1000));
  assert.equal(verifyVisitAccessToken(expired, visitId, testSecret), false);
  assert.equal(verifyVisitAccessToken(token, secondVisitId, testSecret), false);

  const browserSources = [
    fs.readFileSync(path.join(root, "index.html"), "utf8"),
    fs.readFileSync(path.join(root, "src/app.js"), "utf8"),
    fs.readFileSync(path.join(root, "src/data/hpf-public.js"), "utf8"),
  ].join("\n");
  assert.doesNotMatch(browserSources, /mobile-first personal-development platform for men pursuing stronger roles/i);
  assert.doesNotMatch(browserSources, /today-dashboard(?:-sm)?\.webp/i);
  assert.doesNotMatch(browserSources, new RegExp(testPasscode));
  assert.match(browserSources, /Authorization: `Bearer \$\{hpfVisitAccessToken\}`/);

  const publicFiles = fs.readdirSync(path.join(root, "public/images/study-cases/hpf"));
  assert.ok(publicFiles.every((file) => /^hpf-thumbnail(?:-sm|-lg)?\.webp$/.test(file)));
  console.log(`HPF security tests passed (${protectedFiles.length} protected assets checked).`);
}

run()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(() => server.close());
