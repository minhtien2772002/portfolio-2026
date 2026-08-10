import { cp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const productionEntries = ["index.html", "src", "public"];
const temporaryFigmaAssetPrefix = ["figma.com/api/mcp/", "asset"].join("");
const protectedCopyMarker = "mobile-first personal-development platform for men pursuing stronger roles";

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of productionEntries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}

const sourceFiles = [path.join(output, "index.html")];
const sourceDirectory = path.join(output, "src");
for (const entry of await readdir(sourceDirectory, { recursive: true })) {
  if (/\.(?:css|html|js|json|mjs)$/i.test(entry)) {
    sourceFiles.push(path.join(sourceDirectory, entry));
  }
}

for (const file of sourceFiles) {
  const contents = await readFile(file, "utf8");
  if (contents.includes(temporaryFigmaAssetPrefix)) {
    throw new Error(`Temporary Figma asset URL found in ${path.relative(root, file)}`);
  }
  if (contents.includes(protectedCopyMarker)) {
    throw new Error(`Protected HPF content found in public build file ${path.relative(root, file)}`);
  }
}

const publicHpfFiles = await readdir(path.join(output, "public/images/study-cases/hpf"));
const unexpectedHpfAssets = publicHpfFiles.filter((file) => !/^hpf-thumbnail(?:-sm|-lg)?\.webp$/.test(file));
if (unexpectedHpfAssets.length) {
  throw new Error(`Confidential HPF assets found in public build: ${unexpectedHpfAssets.join(", ")}`);
}

console.log(`Static production build created at ${path.relative(root, output)}/`);
