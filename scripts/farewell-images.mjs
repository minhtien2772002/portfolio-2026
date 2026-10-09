import fs from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { promisify } from "node:util";
import { pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const cwebpExecutable = require("webp-converter/src/cwebp")();
const { FarewellManagerError, findRecipientByFolder } = require("./farewell-manager-lib.cjs");
const runExecutable = promisify(execFile);
export const convertibleExtensions = new Set([".jpg", ".jpeg", ".png"]);
export const preservedImageExtensions = new Set([".webp", ".avif"]);

export function listConvertibleImageFiles(imagesDirectory) {
  return fs.readdirSync(imagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && convertibleExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

export function listPreservedImageFiles(imagesDirectory) {
  return fs.readdirSync(imagesDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && preservedImageExtensions.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));
}

export async function convertImageDirectory(imagesDirectory, options = {}) {
  const log = options.log || console.log;
  const onEvent = options.onEvent || (() => {});
  const sourceFiles = listConvertibleImageFiles(imagesDirectory);

  const result = { converted: 0, conflicts: [], failed: [] };
  fs.chmodSync(cwebpExecutable, 0o755);

  for (const fileName of sourceFiles) {
    const input = path.join(imagesDirectory, fileName);
    const output = path.join(imagesDirectory, `${path.basename(fileName, path.extname(fileName))}.webp`);
    const temporaryOutput = `${output}.tmp-${process.pid}.webp`;
    if (fs.existsSync(output)) {
      result.conflicts.push(fileName);
      onEvent({ status: "skipped", fileName, outputName: path.basename(output) });
      log(`Skipped ${fileName}: ${path.basename(output)} already exists. The original was kept.`);
      continue;
    }

    try {
      if (fs.existsSync(temporaryOutput)) fs.unlinkSync(temporaryOutput);
      await runExecutable(cwebpExecutable, [
        "-q", "94",
        "-m", "6",
        "-alpha_q", "100",
        "-sharp_yuv",
        "-mt",
        input,
        "-o", temporaryOutput,
      ]);
      if (!fs.existsSync(temporaryOutput) || fs.statSync(temporaryOutput).size === 0) {
        throw new Error("the converter did not create a valid WebP file");
      }
      fs.renameSync(temporaryOutput, output);
      fs.unlinkSync(input);
      result.converted += 1;
      onEvent({ status: "converted", fileName, outputName: path.basename(output) });
      log(`Converted ${fileName} -> ${path.basename(output)}`);
    } catch (error) {
      if (fs.existsSync(temporaryOutput)) fs.unlinkSync(temporaryOutput);
      result.failed.push({ fileName, message: error.message });
      onEvent({ status: "failed", fileName, message: error.message });
      log(`Could not convert ${fileName}. The original was kept. ${error.message}`);
    }
  }

  return result;
}

async function main() {
  let folder = process.argv[2];
  let interface_ = null;
  try {
    if (!folder) {
      interface_ = readline.createInterface({ input: process.stdin, output: process.stdout });
      folder = await interface_.question("Recipient folder (run npm run farewell:list to find it): ");
    }
    const recipient = findRecipientByFolder(folder);
    const imagesDirectory = path.join(recipient.directory, "images");
    if (!fs.existsSync(imagesDirectory)) {
      throw new FarewellManagerError(`The images folder does not exist: ${imagesDirectory}`);
    }

    const candidates = listConvertibleImageFiles(imagesDirectory);
    if (!candidates.length) {
      console.log("No JPG, JPEG, or PNG images need conversion. Existing WebP and AVIF images were left unchanged.");
      return;
    }

    if (!interface_) interface_ = readline.createInterface({ input: process.stdin, output: process.stdout });
    console.log(`\nFound ${candidates.length} image(s) to convert in ${path.basename(recipient.directory)}.`);
    console.log("Original JPG/PNG files are removed only after their WebP replacements are created successfully.");
    const confirmation = (await interface_.question("Type YES to continue: ")).trim().toUpperCase();
    if (confirmation !== "YES") {
      console.log("Cancelled. No images were changed.");
      return;
    }

    const result = await convertImageDirectory(imagesDirectory);
    console.log(`\nFinished: ${result.converted} converted, ${result.conflicts.length} skipped, ${result.failed.length} failed.`);
    if (result.failed.length) process.exitCode = 1;
  } finally {
    interface_?.close();
  }
}

if (pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    const message = error instanceof FarewellManagerError ? error.message : `Unexpected error: ${error.message}`;
    console.error(`\nCould not process the images. ${message}`);
    process.exitCode = 1;
  });
}
