const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const rootDir = path.resolve(__dirname, "..");
const errors = [];

const trackedAndUntrackedFiles = execFileSync(
  "git",
  ["ls-files", "-z", "--cached", "--others", "--exclude-standard"],
  { cwd: rootDir },
)
  .toString("utf8")
  .split("\0")
  .filter(Boolean)
  .filter((file) => fs.existsSync(path.join(rootDir, file)) && fs.statSync(path.join(rootDir, file)).isFile());

const blockedFilePatterns = [
  { name: "environment file", test: (file) => /(^|\/)\.env(?:\.|$)/i.test(file) && !file.endsWith(".env.example") },
  { name: "private credential file", test: (file) => /\.(?:pem|key|p12|pfx|jks|keystore)$/i.test(file) },
  { name: "service account file", test: (file) => /(^|\/)service-account[^/]*\.json$/i.test(file) },
  { name: "public source map", test: (file) => /\.map$/i.test(file) },
  { name: "backup or archive", test: (file) => /\.(?:bak|backup|zip)$/i.test(file) },
  { name: "OS metadata", test: (file) => /(^|\/)\.DS_Store$/i.test(file) },
];

const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----/],
  ["AWS access key", /\b(?:AKIA|ASIA)[A-Z0-9]{16}\b/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/],
  ["OpenAI key", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/],
  ["Anthropic key", /\bsk-ant-[A-Za-z0-9_-]{20,}\b/],
  ["Stripe secret key", /\bsk_live_[A-Za-z0-9]{16,}\b/],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{30,}\b/],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/],
  ["npm token", /\bnpm_[A-Za-z0-9]{20,}\b/],
  ["database connection string", /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^\s"'<>]+/i],
];

for (const file of trackedAndUntrackedFiles) {
  for (const blocked of blockedFilePatterns) {
    if (blocked.test(file)) errors.push(`${file}: blocked ${blocked.name}`);
  }

  const absolutePath = path.join(rootDir, file);
  const buffer = fs.readFileSync(absolutePath);
  if (buffer.includes(0)) continue;

  const source = buffer.toString("utf8");
  for (const [name, pattern] of secretPatterns) {
    if (pattern.test(source)) errors.push(`${file}: possible ${name}`);
  }
  const isPublicArtifact = file === "index.html" || file.startsWith("src/") || file.startsWith("public/");
  if (isPublicArtifact && /sourceMappingURL|X-SourceMap/i.test(source)) {
    errors.push(`${file}: source-map reference is not allowed in the public static artifact`);
  }
}

const indexSource = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
if (/<script\b(?![^>]*\bsrc=)[^>]*>[\s\S]*?<\/script>/i.test(indexSource)) {
  errors.push("index.html: inline script conflicts with the enforced script-src policy");
}

const vercelConfig = JSON.parse(fs.readFileSync(path.join(rootDir, "vercel.json"), "utf8"));
const configuredHeaders = new Map(
  (vercelConfig.headers?.[0]?.headers || []).map(({ key, value }) => [key.toLowerCase(), value]),
);
for (const requiredHeader of [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
]) {
  if (!configuredHeaders.has(requiredHeader)) errors.push(`vercel.json: missing ${requiredHeader}`);
}

const csp = configuredHeaders.get("content-security-policy") || "";
for (const directive of ["default-src 'self'", "object-src 'none'", "frame-ancestors 'none'", "script-src 'self'"]) {
  if (!csp.includes(directive)) errors.push(`vercel.json: CSP missing ${directive}`);
}
if (/script-src[^;]*'unsafe-(?:inline|eval)'/.test(csp)) {
  errors.push("vercel.json: script-src must not allow unsafe-inline or unsafe-eval");
}

const javascriptFiles = trackedAndUntrackedFiles.filter(
  (file) => file.endsWith(".js") && !file.startsWith("public/vendor/"),
);
for (const file of javascriptFiles) {
  try {
    execFileSync(process.execPath, ["--check", path.join(rootDir, file)], { stdio: "pipe" });
  } catch (error) {
    errors.push(`${file}: JavaScript syntax check failed`);
  }
}

if (errors.length) {
  console.error("Security checks failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Security checks passed (${trackedAndUntrackedFiles.length} files, ${javascriptFiles.length} JavaScript files).`);
}
