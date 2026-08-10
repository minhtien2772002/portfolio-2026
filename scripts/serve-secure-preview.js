const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const localEnvironmentPath = path.join(root, ".env.local");
if (fs.existsSync(localEnvironmentPath)) {
  for (const line of fs.readFileSync(localEnvironmentPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    const value = match[2].trim().replace(/^(['"])(.*)\1$/, "$2");
    process.env[match[1]] = value;
  }
}

if (!process.env.HPF_PASSCODE || !process.env.HPF_SESSION_SECRET) {
  console.error("HPF_PASSCODE and HPF_SESSION_SECRET are required for the secure preview.");
  process.exit(1);
}

const output = path.join(root, "dist");
const port = Number(process.env.PORT || 4174);
const apiRoutes = new Map([
  ["/api/hpf/unlock", require("../api/hpf/unlock.js")],
  ["/api/hpf/content", require("../api/hpf/content.js")],
  ["/api/hpf/assets", require("../api/hpf/assets.js")],
]);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "127.0.0.1"}`);
  const api = apiRoutes.get(url.pathname);
  if (api) {
    req.query = Object.fromEntries(url.searchParams.entries());
    Promise.resolve(api(req, res)).catch(() => {
      if (!res.headersSent) res.statusCode = 500;
      res.end("Request failed");
    });
    return;
  }

  const relativePath = url.pathname === "/" ? "index.html" : decodeURIComponent(url.pathname).replace(/^\/+/, "");
  const filePath = path.resolve(output, relativePath);
  if (!filePath.startsWith(`${output}${path.sep}`) || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.statusCode = 404;
    res.end("Not found");
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", contentTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Secure production preview running at http://127.0.0.1:${port}`);
});
