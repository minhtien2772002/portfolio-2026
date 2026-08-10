import fs from "node:fs";
import path from "node:path";
import { execFile } from "node:child_process";
import { createRequire } from "node:module";
import { promisify } from "node:util";

const require = createRequire(import.meta.url);
const cwebpExecutable = require("webp-converter/src/cwebp")();
const runExecutable = promisify(execFile);
const rootDir = path.resolve(import.meta.dirname, "..");

const readOption = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index >= 0 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
};

const sourceDir = path.resolve(rootDir, readOption("--source", "assets-source/hpf"));
const outputDir = path.resolve(rootDir, readOption("--output", "public/images/study-cases/hpf"));
const supportedExtensions = new Set([".png", ".jpg", ".jpeg"]);

const outputVariants = (fileName, width) => {
  const name = path.basename(fileName, path.extname(fileName));
  if (name === "thumbnail") {
    return [
      { fileName: "hpf-thumbnail-sm.webp", width: 640, quality: 92 },
      { fileName: "hpf-thumbnail.webp", width: 1280, quality: 92 },
      { fileName: "hpf-thumbnail-lg.webp", width: Math.min(width, 2560), quality: 92 },
    ];
  }
  if (width <= 188) {
    return [{ fileName: `${name}.webp`, width, quality: 94 }];
  }
  return [
    { fileName: `${name}-sm.webp`, width: Math.min(width, 188), quality: 94 },
    { fileName: `${name}.webp`, width, quality: 94 },
  ];
};

const pngWidth = async (input) => {
  const { stdout } = await runExecutable("sips", ["-g", "pixelWidth", input]);
  const match = stdout.match(/pixelWidth:\s*(\d+)/);
  if (!match) throw new Error(`Unable to read image width: ${input}`);
  return Number(match[1]);
};

const optimize = async (input, output, width, quality) => {
  const temporaryOutput = `${output}.tmp.webp`;
  if (fs.existsSync(temporaryOutput)) fs.unlinkSync(temporaryOutput);
  const args = [
    "-q", String(quality),
    "-m", "6",
    "-alpha_q", "100",
    "-sharp_yuv",
    "-mt",
    "-resize", String(width), "0",
    input,
    "-o", temporaryOutput,
  ];
  await runExecutable(cwebpExecutable, args);
  fs.renameSync(temporaryOutput, output);
};

const main = async () => {
  if (!fs.existsSync(sourceDir)) throw new Error(`Source directory not found: ${sourceDir}`);
  fs.mkdirSync(outputDir, { recursive: true });
  fs.chmodSync(cwebpExecutable, 0o755);

  const sourceFiles = fs.readdirSync(sourceDir)
    .filter((fileName) => supportedExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  let generated = 0;
  let skipped = 0;
  const expectedOutputs = new Set();

  for (const fileName of sourceFiles) {
    const input = path.join(sourceDir, fileName);
    const width = await pngWidth(input);
    for (const variant of outputVariants(fileName, width)) {
      expectedOutputs.add(variant.fileName);
      const output = path.join(outputDir, variant.fileName);
      const current = fs.existsSync(output) && fs.statSync(output).mtimeMs >= fs.statSync(input).mtimeMs;
      if (current) {
        skipped += 1;
        continue;
      }
      await optimize(input, output, variant.width, variant.quality);
      generated += 1;
    }
  }

  let removed = 0;
  for (const outputName of fs.readdirSync(outputDir)) {
    if (path.extname(outputName).toLowerCase() === ".webp" && !expectedOutputs.has(outputName)) {
      fs.unlinkSync(path.join(outputDir, outputName));
      removed += 1;
    }
  }

  console.log(`Image optimization complete: ${sourceFiles.length} sources, ${generated} generated, ${skipped} unchanged, ${removed} stale removed.`);
};

main().catch((error) => {
  console.error(`Image optimization failed: ${error.message}`);
  process.exitCode = 1;
});
