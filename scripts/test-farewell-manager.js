const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const {
  formatTable,
  loadRecipients,
  persistRecipient,
  prepareRecipient,
  recipientRows,
} = require("./farewell-manager-lib.cjs");

const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "farewell-manager-"));
const registryPath = path.join(temporaryRoot, "recipients.cjs");
const existingEntry = `  {\n    id: "old-person",\n    keyDigest: "${"a".repeat(64)}",\n    recipient: "Existing Person",\n    company: "OLD",\n    flowerSeed: "existing-seed",\n    directory: path.join(contentRoot, "old-person"),\n  },`;

fs.mkdirSync(path.join(temporaryRoot, "old-person", "images"), { recursive: true });
fs.writeFileSync(path.join(temporaryRoot, "old-person", "letter.md"), "Existing letter\n");
fs.writeFileSync(registryPath, `const path = require("node:path");\nconst contentRoot = __dirname;\nconst recipients = [\n${existingEntry}\n];\nmodule.exports = { recipients };\n`);

try {
  const recipient = prepareRecipient({
    company: "adz",
    fullName: "Nguyễn Minh Tiến",
    birthYear: "99",
    initials: "tt",
  }, { flowerSeed: "fixed-test-seed" });

  assert.equal(recipient.id, "adz-nguyen-minh-tien");
  assert.equal(recipient.key, "ADZ-99-TT");
  assert.equal(recipient.keyDigest, crypto.createHash("sha256").update("ADZ-99-TT").digest("hex"));

  const result = persistRecipient(recipient, { registryPath, contentRoot: temporaryRoot });
  assert.equal(fs.existsSync(result.letterPath), true);
  assert.equal(fs.existsSync(result.imagesPath), true);
  assert.equal(fs.readdirSync(result.imagesPath).length, 0);

  const registrySource = fs.readFileSync(registryPath, "utf8");
  assert.equal(registrySource.includes(existingEntry), true);
  assert.equal(registrySource.includes("ADZ-99-TT"), false);
  assert.equal(registrySource.includes(recipient.keyDigest), true);

  const recipients = loadRecipients(registryPath);
  assert.equal(recipients.length, 2);
  assert.equal(recipients[0].id, "old-person");
  assert.equal(recipients[1].id, recipient.id);

  const rows = recipientRows({ registryPath });
  const table = formatTable(rows);
  assert.match(table, /Name\s+\| Company\s+\| Key identifier\/folder\s+\| Has letter\s+\| Image count/);
  assert.match(table, /Nguyễn Minh Tiến/);
  assert.doesNotMatch(table, /keyDigest|ADZ-99-TT/);

  assert.throws(
    () => persistRecipient(recipient, { registryPath, contentRoot: temporaryRoot }),
    /already uses the folder/,
  );

  console.log("Farewell manager tests passed (validation, digest-only registry, protected folders, and listing). ");
} finally {
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}
