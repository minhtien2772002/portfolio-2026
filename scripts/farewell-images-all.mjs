import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  convertImageDirectory,
  listConvertibleImageFiles,
  listPreservedImageFiles,
} from "./farewell-images.mjs";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultFarewellDirectory = path.join(projectRoot, "private", "farewell");

export function scanRecipientImageFolders(farewellDirectory = defaultFarewellDirectory) {
  const recipients = fs.readdirSync(farewellDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
    .map((folder) => {
      const directory = path.join(farewellDirectory, folder);
      const imagesDirectory = path.join(directory, "images");
      if (!fs.existsSync(imagesDirectory) || !fs.statSync(imagesDirectory).isDirectory()) {
        return { folder, directory, imagesDirectory, hasImagesDirectory: false, convertibleFiles: [], preservedFiles: [] };
      }
      return {
        folder,
        directory,
        imagesDirectory,
        hasImagesDirectory: true,
        convertibleFiles: listConvertibleImageFiles(imagesDirectory),
        preservedFiles: listPreservedImageFiles(imagesDirectory),
      };
    });

  return {
    farewellDirectory,
    recipients,
    recipientsScanned: recipients.length,
    foldersWithConvertibleImages: recipients.filter((recipient) => recipient.convertibleFiles.length > 0).length,
    convertibleImages: recipients.reduce((total, recipient) => total + recipient.convertibleFiles.length, 0),
    preservedImages: recipients.reduce((total, recipient) => total + recipient.preservedFiles.length, 0),
  };
}

export function isExactBatchConfirmation(value) {
  return value === "YES";
}

export async function processRecipientImageInventory(inventory, options = {}) {
  const log = options.log || console.log;
  const recipientsToProcess = inventory.recipients.filter((recipient) => recipient.convertibleFiles.length > 0);
  const summary = {
    recipientsScanned: inventory.recipientsScanned,
    recipientsProcessed: 0,
    imagesConverted: 0,
    imagesSkipped: inventory.preservedImages,
    failures: [],
  };

  for (const [index, recipient] of recipientsToProcess.entries()) {
    summary.recipientsProcessed += 1;
    log(`[${index + 1}/${recipientsToProcess.length}] ${recipient.folder}`);
    try {
      const result = await convertImageDirectory(recipient.imagesDirectory, {
        log() {},
        onEvent(event) {
          if (event.status === "converted") log(`  ✓ ${event.fileName} → ${event.outputName}`);
          if (event.status === "skipped") log(`  - ${event.fileName} skipped: ${event.outputName} already exists`);
          if (event.status === "failed") log(`  ✗ ${event.fileName}: ${event.message}`);
        },
      });
      summary.imagesConverted += result.converted;
      summary.imagesSkipped += result.conflicts.length;
      result.failed.forEach((failure) => {
        summary.failures.push({ folder: recipient.folder, ...failure });
      });
    } catch (error) {
      summary.failures.push({ folder: recipient.folder, fileName: "(images folder)", message: error.message });
      log(`  ✗ Could not process this images folder: ${error.message}`);
    }
    log("");
  }

  return { ...summary, errors: summary.failures.length };
}

function printSummary(summary) {
  console.log("Done.\n");
  console.log(`Recipients scanned: ${summary.recipientsScanned}`);
  console.log(`Recipients processed: ${summary.recipientsProcessed}`);
  console.log(`Images converted: ${summary.imagesConverted}`);
  console.log(`Images skipped: ${summary.imagesSkipped}`);
  console.log(`Errors: ${summary.errors}`);
  if (summary.failures.length) {
    console.log("\nFailed items:");
    summary.failures.forEach((failure) => {
      console.log(`- ${failure.folder}/${failure.fileName}: ${failure.message}`);
    });
  }
}

async function main() {
  const inventory = scanRecipientImageFolders();
  console.log(`Found ${inventory.recipientsScanned} recipient folder(s)`);
  console.log(`${inventory.foldersWithConvertibleImages} folder(s) contain convertible images`);
  console.log(`${inventory.convertibleImages} image(s) will be converted`);

  if (inventory.convertibleImages === 0) {
    console.log("\nNo JPG, JPEG, or PNG images need conversion. Existing WebP and AVIF images were left unchanged.");
    printSummary({
      recipientsScanned: inventory.recipientsScanned,
      recipientsProcessed: 0,
      imagesConverted: 0,
      imagesSkipped: inventory.preservedImages,
      errors: 0,
      failures: [],
    });
    return;
  }

  const interface_ = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const confirmation = await interface_.question("\nContinue? Type YES to confirm: ");
    if (!isExactBatchConfirmation(confirmation)) {
      console.log("Cancelled. No images were changed.");
      return;
    }
  } finally {
    interface_.close();
  }

  console.log("");
  const summary = await processRecipientImageInventory(inventory);
  printSummary(summary);
  if (summary.errors) process.exitCode = 1;
}

if (pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(`\nCould not process all recipient images. ${error.message}`);
    process.exitCode = 1;
  });
}
