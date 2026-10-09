import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { convertImageDirectory } from "./farewell-images.mjs";
import {
  isExactBatchConfirmation,
  processRecipientImageInventory,
  scanRecipientImageFolders,
} from "./farewell-images-all.mjs";

const onePixelPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);
const directory = fs.mkdtempSync(path.join(os.tmpdir(), "farewell-images-"));
const singleDirectory = path.join(directory, "single-recipient");
const source = path.join(singleDirectory, "memory.png");
const output = path.join(singleDirectory, "memory.webp");

function createRecipient(root, folder, withImages = true) {
  const recipientDirectory = path.join(root, folder);
  fs.mkdirSync(recipientDirectory, { recursive: true });
  if (withImages) fs.mkdirSync(path.join(recipientDirectory, "images"));
  return path.join(recipientDirectory, "images");
}

try {
  fs.mkdirSync(singleDirectory);
  fs.writeFileSync(source, onePixelPng);
  const converted = await convertImageDirectory(singleDirectory, { log() {} });
  assert.equal(converted.converted, 1);
  assert.equal(fs.existsSync(source), false);
  assert.ok(fs.statSync(output).size > 0);

  fs.writeFileSync(source, onePixelPng);
  const conflict = await convertImageDirectory(singleDirectory, { log() {} });
  assert.equal(conflict.converted, 0);
  assert.deepEqual(conflict.conflicts, ["memory.png"]);
  assert.equal(fs.existsSync(source), true);
  assert.ok(fs.statSync(output).size > 0);

  const farewellDirectory = path.join(directory, "farewell");
  fs.mkdirSync(farewellDirectory);
  const mixedImages = createRecipient(farewellDirectory, "alpha-mixed");
  fs.writeFileSync(path.join(mixedImages, "01.jpg"), onePixelPng);
  fs.writeFileSync(path.join(mixedImages, "02.png"), onePixelPng);
  fs.writeFileSync(path.join(mixedImages, "conflict.png"), onePixelPng);
  fs.writeFileSync(path.join(mixedImages, "conflict.webp"), Buffer.from("existing-webp"));

  const preservedImages = createRecipient(farewellDirectory, "beta-webp-only");
  const existingWebp = Buffer.from("untouched-webp");
  const existingAvif = Buffer.from("untouched-avif");
  fs.writeFileSync(path.join(preservedImages, "existing.webp"), existingWebp);
  fs.writeFileSync(path.join(preservedImages, "existing.avif"), existingAvif);

  createRecipient(farewellDirectory, "gamma-empty");
  createRecipient(farewellDirectory, "delta-no-images", false);

  const corruptImages = createRecipient(farewellDirectory, "epsilon-corrupt");
  fs.writeFileSync(path.join(corruptImages, "broken.jpeg"), Buffer.from("not-an-image"));
  fs.writeFileSync(path.join(corruptImages, "good.png"), onePixelPng);

  const inventory = scanRecipientImageFolders(farewellDirectory);
  assert.equal(inventory.recipientsScanned, 5);
  assert.equal(inventory.foldersWithConvertibleImages, 2);
  assert.equal(inventory.convertibleImages, 5);
  assert.equal(inventory.preservedImages, 3);
  assert.equal(inventory.recipients.find(({ folder }) => folder === "gamma-empty").hasImagesDirectory, true);
  assert.equal(inventory.recipients.find(({ folder }) => folder === "delta-no-images").hasImagesDirectory, false);

  const messages = [];
  const batch = await processRecipientImageInventory(inventory, { log(message) { messages.push(message); } });
  assert.equal(batch.recipientsScanned, 5);
  assert.equal(batch.recipientsProcessed, 2);
  assert.equal(batch.imagesConverted, 3);
  assert.equal(batch.imagesSkipped, 4);
  assert.equal(batch.errors, 1);
  assert.deepEqual(batch.failures.map(({ folder, fileName }) => ({ folder, fileName })), [
    { folder: "epsilon-corrupt", fileName: "broken.jpeg" },
  ]);
  assert.ok(messages.some((message) => message.includes("epsilon-corrupt")));
  assert.ok(messages.some((message) => message.includes("broken.jpeg")));

  assert.equal(fs.existsSync(path.join(mixedImages, "01.jpg")), false);
  assert.equal(fs.existsSync(path.join(mixedImages, "02.png")), false);
  assert.ok(fs.statSync(path.join(mixedImages, "01.webp")).size > 0);
  assert.ok(fs.statSync(path.join(mixedImages, "02.webp")).size > 0);
  assert.equal(fs.existsSync(path.join(mixedImages, "conflict.png")), true);
  assert.deepEqual(fs.readFileSync(path.join(mixedImages, "conflict.webp")), Buffer.from("existing-webp"));

  assert.equal(fs.existsSync(path.join(corruptImages, "broken.jpeg")), true);
  assert.equal(fs.existsSync(path.join(corruptImages, "broken.webp")), false);
  assert.equal(fs.existsSync(path.join(corruptImages, "good.png")), false);
  assert.ok(fs.statSync(path.join(corruptImages, "good.webp")).size > 0);
  assert.deepEqual(fs.readFileSync(path.join(preservedImages, "existing.webp")), existingWebp);
  assert.deepEqual(fs.readFileSync(path.join(preservedImages, "existing.avif")), existingAvif);

  assert.equal(isExactBatchConfirmation("YES"), true);
  assert.equal(isExactBatchConfirmation("yes"), false);
  assert.equal(isExactBatchConfirmation(" YES"), false);

  const packageJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8"));
  assert.equal(packageJson.scripts["farewell:images"], "node scripts/farewell-images.mjs");
  assert.equal(packageJson.scripts["farewell:images:all"], "node scripts/farewell-images-all.mjs");

  console.log("Farewell image tests passed (single-recipient conversion, batch scanning, failure isolation, and safe replacement). ");
} finally {
  fs.rmSync(directory, { recursive: true, force: true });
}
