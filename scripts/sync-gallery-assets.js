const fs = require("fs");
const path = require("path");
const { execFile } = require("child_process");
const { promisify } = require("util");
const cwebpExecutable = require("webp-converter/src/cwebp")();
const runExecutable = promisify(execFile);

const rootDir = path.resolve(__dirname, "..");
const galleryDir = path.join(rootDir, "public", "gallery");
const outputFile = path.join(rootDir, "src", "data", "gallery.js");
const supportedImageExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const supportedVideoExtensions = new Set([".mp4", ".webm", ".mov"]);
const imagePreference = [".webp", ".avif", ".png", ".jpg", ".jpeg"];

const naturalCompare = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
const slugify = (value) => value
  .toLowerCase()
  .normalize("NFKD")
  .replace(/[\u0300-\u036f]/g, "")
  .replace(/[^a-z0-9]+/g, "-")
  .replace(/^-+|-+$/g, "");

const titleFromFolder = (folderName) => folderName
  .replace(/[-_]+/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .replace(/\b\w/g, (letter) => letter.toUpperCase())
  .replace(/\bSaas\b/g, "SaaS")
  .replace(/\bB2b\b/g, "B2B")
  .replace(/\bUi\b/g, "UI");

const titleFromFile = (fileName) => path.basename(fileName, path.extname(fileName))
  .replace(/[-_]+/g, " ")
  .replace(/\s+/g, " ")
  .trim();

const readExistingAlbums = () => {
  if (!fs.existsSync(outputFile)) return [];
  const source = fs.readFileSync(outputFile, "utf8");
  const match = source.match(/export const galleryAlbums = ([\s\S]*);\s*$/);
  if (!match) return [];
  try {
    return JSON.parse(match[1]);
  } catch {
    return [];
  }
};

const folderNameFromAlbum = (album) => decodeURIComponent(String(album.folderPath || "").split("/").pop() || "");

const convertPngs = async (folders) => {
  fs.chmodSync(cwebpExecutable, 0o755);
  let converted = 0;
  let skipped = 0;

  for (const folderName of folders) {
    const folder = path.join(galleryDir, folderName);
    const pngFiles = fs.readdirSync(folder, { withFileTypes: true })
      .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".png")
      .map((entry) => entry.name)
      .sort(naturalCompare);

    for (const fileName of pngFiles) {
      const input = path.join(folder, fileName);
      const output = path.join(folder, `${path.basename(fileName, path.extname(fileName))}.webp`);
      const inputStats = fs.statSync(input);
      const outputIsCurrent = fs.existsSync(output) && fs.statSync(output).mtimeMs >= inputStats.mtimeMs;
      if (outputIsCurrent) {
        skipped += 1;
        continue;
      }

      const temporaryOutput = `${output}.tmp.webp`;
      if (fs.existsSync(temporaryOutput)) fs.unlinkSync(temporaryOutput);
      await runExecutable(cwebpExecutable, ["-q", "85", "-m", "6", input, "-o", temporaryOutput]);
      fs.renameSync(temporaryOutput, output);
      converted += 1;
    }
  }

  return { converted, skipped };
};

const buildAlbums = (folders, existingAlbums) => {
  const existingByFolder = new Map(existingAlbums.map((album) => [folderNameFromAlbum(album), album]));
  const existingOrder = new Map(existingAlbums.map((album, index) => [folderNameFromAlbum(album), index]));
  const orderedFolders = [...folders].sort((a, b) => {
    const aOrder = existingOrder.has(a) ? existingOrder.get(a) : Number.MAX_SAFE_INTEGER;
    const bOrder = existingOrder.has(b) ? existingOrder.get(b) : Number.MAX_SAFE_INTEGER;
    return aOrder === bOrder ? naturalCompare(a, b) : aOrder - bOrder;
  });

  let imagesFound = 0;
  let mediaReferencesUpdated = 0;

  const albums = orderedFolders.map((folderName) => {
    const existing = existingByFolder.get(folderName);
    const slug = existing?.slug || slugify(folderName);
    const title = existing?.title || titleFromFolder(folderName);
    const folder = path.join(galleryDir, folderName);
    const files = fs.readdirSync(folder, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
    const imageGroups = new Map();
    const videoFiles = [];

    files.forEach((fileName) => {
      const extension = path.extname(fileName).toLowerCase();
      if (supportedImageExtensions.has(extension)) {
        const stem = path.basename(fileName, extension);
        if (!imageGroups.has(stem)) imageGroups.set(stem, []);
        imageGroups.get(stem).push(fileName);
      } else if (supportedVideoExtensions.has(extension)) {
        videoFiles.push(fileName);
      }
    });

    const imageFiles = [...imageGroups.entries()]
      .sort(([a], [b]) => naturalCompare(a, b))
      .map(([stem, variants]) => {
        const selected = [...variants].sort((a, b) => {
          const aRank = imagePreference.indexOf(path.extname(a).toLowerCase());
          const bRank = imagePreference.indexOf(path.extname(b).toLowerCase());
          return aRank - bRank || naturalCompare(a, b);
        })[0];
        const original = variants.find((fileName) => path.extname(fileName).toLowerCase() === ".png") || selected;
        return { selected, original, stem };
      });

    imagesFound += imageFiles.length;
    const logicalFiles = [
      ...imageFiles.map((item) => ({ ...item, type: "image", sortName: item.original })),
      ...videoFiles.map((fileName) => ({ selected: fileName, original: fileName, stem: path.basename(fileName, path.extname(fileName)), type: "video", sortName: fileName })),
    ].sort((a, b) => naturalCompare(a.sortName, b.sortName));

    const previousMedia = new Map((existing?.media || []).map((item) => [item.id, item.src]));
    const media = logicalFiles.map((item, index) => {
      const sourcePath = path.join(folder, item.original);
      const stats = fs.statSync(sourcePath);
      const id = `${slug}-${slugify(item.stem) || index}`;
      const src = `public/gallery/${folderName}/${item.selected}`;
      if (previousMedia.get(id) !== src) mediaReferencesUpdated += 1;
      return {
        id,
        type: item.type,
        src,
        fileName: item.original,
        title: titleFromFile(item.original),
        alt: `${title} media ${index + 1}`,
        order: index,
        modifiedAt: stats.mtime.toISOString(),
        modifiedAtMs: Math.round(stats.mtimeMs),
      };
    });
    const imageEntries = media.filter((item) => item.type === "image");

    return {
      id: existing?.id || slug,
      title,
      slug,
      folderPath: `./public/gallery/${folderName}`,
      coverImage: imageEntries[0]?.src || media[0]?.src || "",
      images: imageEntries.map((item) => item.src),
      imageEntries,
      media,
    };
  });

  return { albums, imagesFound, mediaReferencesUpdated };
};

const writeDataFile = (albums) => {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  const data = `// Generated by scripts/sync-gallery-assets.js. Do not edit manually.\nexport const galleryAlbums = ${JSON.stringify(albums, null, 2)};\n`;
  fs.writeFileSync(outputFile, data);
};

const main = async () => {
  if (!fs.existsSync(galleryDir)) throw new Error(`Gallery directory not found: ${galleryDir}`);
  const folders = fs.readdirSync(galleryDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name);
  const existingAlbums = readExistingAlbums();
  const conversion = await convertPngs(folders);
  const result = buildAlbums(folders, existingAlbums);
  writeDataFile(result.albums);

  console.log("Gallery sync complete.");
  console.log(`Albums scanned: ${result.albums.length}`);
  console.log(`Images found: ${result.imagesFound}`);
  console.log(`PNG converted to WebP: ${conversion.converted}`);
  console.log(`Media references updated: ${result.mediaReferencesUpdated}`);
  console.log(`Skipped unchanged files: ${conversion.skipped}`);
};

main().catch((error) => {
  console.error(`Gallery sync failed: ${error.message}`);
  process.exitCode = 1;
});
