const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const defaultContentRoot = path.join(projectRoot, "private/farewell");
const defaultRegistryPath = path.join(defaultContentRoot, "recipients.cjs");
const supportedImageExtensions = new Set([".avif", ".jpg", ".jpeg", ".png", ".webp"]);

class FarewellManagerError extends Error {
  constructor(message) {
    super(message);
    this.name = "FarewellManagerError";
  }
}

function normalizeCompanyCode(value) {
  const company = String(value || "").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(company)) {
    throw new FarewellManagerError("Company code must contain exactly three letters, for example ADZ.");
  }
  return company;
}

function normalizeFullName(value) {
  const fullName = String(value || "").trim().replace(/\s+/g, " ");
  if (fullName.length < 2 || fullName.length > 120) {
    throw new FarewellManagerError("Full name must contain between 2 and 120 characters.");
  }
  return fullName;
}

function normalizeBirthYear(value) {
  const birthYear = String(value || "").trim();
  if (!/^\d{2}$/.test(birthYear)) {
    throw new FarewellManagerError("Birth year must be the last two digits only, for example 99.");
  }
  return birthYear;
}

function normalizeInitials(value) {
  const initials = String(value || "").trim().toUpperCase();
  if (!/^[A-Z]{2}$/.test(initials)) {
    throw new FarewellManagerError("Name initials must contain exactly two letters, for example TT.");
  }
  return initials;
}

function slugifyName(value) {
  return value
    .replace(/[Đđ]/g, (character) => character === "Đ" ? "D" : "d")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function keyDigest(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

function prepareRecipient(input, options = {}) {
  const company = normalizeCompanyCode(input.company);
  const recipient = normalizeFullName(input.fullName);
  const birthYear = normalizeBirthYear(input.birthYear);
  const initials = normalizeInitials(input.initials);
  const nameSlug = slugifyName(recipient);
  if (!nameSlug) {
    throw new FarewellManagerError("The full name needs at least one letter or number for the folder name.");
  }

  const id = `${company.toLowerCase()}-${nameSlug}`.slice(0, 80).replace(/-+$/g, "");
  const key = `${company}-${birthYear}-${initials}`;
  return {
    id,
    key,
    keyDigest: keyDigest(key),
    recipient,
    company,
    flowerSeed: options.flowerSeed || crypto.randomBytes(16).toString("hex"),
  };
}

function loadRecipients(registryPath = defaultRegistryPath) {
  let resolved;
  try {
    resolved = require.resolve(registryPath);
    delete require.cache[resolved];
    const registry = require(resolved);
    if (!Array.isArray(registry.recipients)) throw new Error("missing recipients array");
    return registry.recipients;
  } catch (error) {
    throw new FarewellManagerError(`Could not read the protected recipient registry: ${error.message}`);
  }
}

function registryEntrySource(recipient) {
  return [
    "  {",
    `    id: ${JSON.stringify(recipient.id)},`,
    `    keyDigest: ${JSON.stringify(recipient.keyDigest)},`,
    `    recipient: ${JSON.stringify(recipient.recipient)},`,
    `    company: ${JSON.stringify(recipient.company)},`,
    `    flowerSeed: ${JSON.stringify(recipient.flowerSeed)},`,
    `    directory: path.join(contentRoot, ${JSON.stringify(recipient.id)}),`,
    "  },",
  ].join("\n");
}

function insertRecipientSource(source, recipient) {
  const arrayStart = source.indexOf("const recipients = [");
  const exportStart = source.indexOf("module.exports", arrayStart);
  const arrayEnd = exportStart >= 0 ? source.lastIndexOf("\n];", exportStart) : -1;
  if (arrayStart < 0 || exportStart < 0 || arrayEnd < arrayStart) {
    throw new FarewellManagerError("The protected recipient registry has an unexpected format. Nothing was changed.");
  }
  return `${source.slice(0, arrayEnd)}\n${registryEntrySource(recipient)}${source.slice(arrayEnd)}`;
}

function atomicWrite(filePath, source) {
  const temporaryPath = `${filePath}.tmp-${process.pid}-${crypto.randomBytes(4).toString("hex")}`;
  try {
    fs.writeFileSync(temporaryPath, source, { encoding: "utf8", mode: fs.statSync(filePath).mode });
    fs.renameSync(temporaryPath, filePath);
  } finally {
    if (fs.existsSync(temporaryPath)) fs.unlinkSync(temporaryPath);
  }
}

function persistRecipient(recipient, options = {}) {
  const registryPath = options.registryPath || defaultRegistryPath;
  const contentRoot = options.contentRoot || defaultContentRoot;
  const recipients = loadRecipients(registryPath);

  if (recipients.some((entry) => entry.id === recipient.id)) {
    throw new FarewellManagerError(`A recipient already uses the folder "${recipient.id}". No files were changed.`);
  }
  if (recipients.some((entry) => entry.keyDigest === recipient.keyDigest)) {
    throw new FarewellManagerError("That personal key is already registered. No files were changed.");
  }

  const destination = path.join(contentRoot, recipient.id);
  if (fs.existsSync(destination)) {
    throw new FarewellManagerError(`The protected folder "${recipient.id}" already exists. No files were changed.`);
  }

  const registrySource = fs.readFileSync(registryPath, "utf8");
  const updatedRegistrySource = insertRecipientSource(registrySource, recipient);
  const temporaryDirectory = path.join(
    contentRoot,
    `.tmp-${recipient.id}-${process.pid}-${crypto.randomBytes(4).toString("hex")}`,
  );
  let destinationCreated = false;

  try {
    fs.mkdirSync(path.join(temporaryDirectory, "images"), { recursive: true });
    fs.writeFileSync(
      path.join(temporaryDirectory, "letter.md"),
      `Dear ${recipient.recipient},\n\nWrite your letter here.\n`,
      "utf8",
    );
    fs.renameSync(temporaryDirectory, destination);
    destinationCreated = true;
    atomicWrite(registryPath, updatedRegistrySource);
  } catch (error) {
    if (fs.existsSync(temporaryDirectory)) fs.rmSync(temporaryDirectory, { recursive: true, force: true });
    if (destinationCreated && fs.existsSync(destination)) fs.rmSync(destination, { recursive: true, force: true });
    if (error instanceof FarewellManagerError) throw error;
    throw new FarewellManagerError(`Could not create the recipient safely: ${error.message}. Changes were rolled back.`);
  }

  return {
    folder: recipient.id,
    letterPath: path.join(destination, "letter.md"),
    imagesPath: path.join(destination, "images"),
  };
}

function recipientRows(options = {}) {
  const registryPath = options.registryPath || defaultRegistryPath;
  return loadRecipients(registryPath).map((recipient) => {
    const folder = path.basename(recipient.directory);
    const letterPath = path.join(recipient.directory, "letter.md");
    const imagesPath = path.join(recipient.directory, "images");
    let imageCount = 0;
    if (fs.existsSync(imagesPath)) {
      imageCount = fs.readdirSync(imagesPath, { withFileTypes: true })
        .filter((entry) => entry.isFile() && supportedImageExtensions.has(path.extname(entry.name).toLowerCase()))
        .length;
    }
    return {
      Name: recipient.recipient,
      Company: recipient.company,
      "Key identifier/folder": folder,
      "Has letter": fs.existsSync(letterPath) && fs.statSync(letterPath).isFile() ? "Yes" : "No",
      "Image count": String(imageCount),
    };
  });
}

function formatTable(rows) {
  const columns = ["Name", "Company", "Key identifier/folder", "Has letter", "Image count"];
  const widths = columns.map((column) => Math.max(column.length, ...rows.map((row) => String(row[column]).length)));
  const line = (row) => columns.map((column, index) => String(row[column]).padEnd(widths[index])).join(" | ");
  return [line(Object.fromEntries(columns.map((column) => [column, column]))), widths.map((width) => "-".repeat(width)).join("-|-"), ...rows.map(line)].join("\n");
}

function findRecipientByFolder(folder, options = {}) {
  const registryPath = options.registryPath || defaultRegistryPath;
  const requested = String(folder || "").trim();
  if (!requested || requested !== path.basename(requested) || requested === "." || requested === "..") {
    throw new FarewellManagerError("Enter only the recipient folder name shown by npm run farewell:list.");
  }
  const recipient = loadRecipients(registryPath).find(
    (entry) => entry.id === requested || path.basename(entry.directory) === requested,
  );
  if (!recipient) {
    throw new FarewellManagerError(`No registered recipient uses the folder "${requested}".`);
  }
  return recipient;
}

module.exports = {
  FarewellManagerError,
  defaultContentRoot,
  defaultRegistryPath,
  findRecipientByFolder,
  formatTable,
  insertRecipientSource,
  keyDigest,
  loadRecipients,
  normalizeBirthYear,
  normalizeCompanyCode,
  normalizeFullName,
  normalizeInitials,
  persistRecipient,
  prepareRecipient,
  recipientRows,
  registryEntrySource,
  slugifyName,
};
