import { cp, mkdir, readFile, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "dist");
const productionEntries = ["index.html", "src", "public"];
const temporaryFigmaAssetPrefix = ["figma.com/api/mcp/", "asset"].join("");

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

for (const entry of productionEntries) {
  await cp(path.join(root, entry), path.join(output, entry), { recursive: true });
}

const sourceFiles = [path.join(output, "index.html")];
const sourceDirectory = path.join(output, "src");
for (const entry of await readdir(sourceDirectory, { recursive: true })) {
  if (/\.(?:css|html|js|json)$/i.test(entry)) {
    sourceFiles.push(path.join(sourceDirectory, entry));
  }
}

for (const file of sourceFiles) {
  const contents = await readFile(file, "utf8");
  if (contents.includes(temporaryFigmaAssetPrefix)) {
    throw new Error(`Temporary Figma asset URL found in ${path.relative(root, file)}`);
  }
}

console.log(`Static production build created at ${path.relative(root, output)}/`);
