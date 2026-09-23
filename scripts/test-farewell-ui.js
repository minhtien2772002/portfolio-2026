const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { pathToFileURL } = require("node:url");

const root = path.resolve(__dirname, "..");

async function run() {
  const {
    farewellKeySegments,
    formatFarewellKey,
    parseFarewellKey,
    sanitizeFarewellSegment,
  } = await import(pathToFileURL(path.join(root, "src/components/farewell-key.mjs")));
  const {
    createFarewellFlowerMotion,
    createFarewellFlowerSequence,
  } = await import(pathToFileURL(path.join(root, "src/farewell.js")));

  assert.deepEqual(farewellKeySegments.map((segment) => segment.length), [3, 2, 2]);
  assert.equal(sanitizeFarewellSegment("a1d!z", 0), "ADZ");
  assert.equal(sanitizeFarewellSegment("9a6", 1), "96");
  assert.equal(sanitizeFarewellSegment("t-t", 2), "TT");
  assert.deepEqual(parseFarewellKey("adz-96-tt"), ["ADZ", "96", "TT"]);
  assert.deepEqual(parseFarewellKey("ADZ96TT"), ["ADZ", "96", "TT"]);
  assert.equal(parseFarewellKey("AD-96-TT"), null);
  assert.equal(formatFarewellKey(["adz", "96", "tt"]), "ADZ-96-TT");
  assert.equal(formatFarewellKey(["ad", "96", "tt"]), "");

  const first = createFarewellFlowerSequence("recipient-a", 40);
  const second = createFarewellFlowerSequence("recipient-a", 40);
  assert.deepEqual(first, second);
  assert.ok(first.every((variant, index) => index === 0 || variant !== first[index - 1]));

  const firstMotion = createFarewellFlowerMotion("recipient-a", 40);
  const secondMotion = createFarewellFlowerMotion("recipient-a", 40);
  assert.deepEqual(firstMotion, secondMotion);
  assert.ok(firstMotion.some(({ x, y }) => x === 0 && y === 0));
  assert.ok(firstMotion.some(({ x, y }) => x !== 0 && y !== 0));
  assert.ok(new Set(firstMotion.map(({ x, y }) => `${x}:${y}`)).size > 4);

  const appSource = fs.readFileSync(path.join(root, "src/app.js"), "utf8");
  const cursorSource = fs.readFileSync(path.join(root, "src/directional-cursor.js"), "utf8");
  const farewellSource = fs.readFileSync(path.join(root, "src/farewell.js"), "utf8");
  const farewellStyles = fs.readFileSync(path.join(root, "src/farewell.css"), "utf8");
  assert.match(appSource, /pathname === "\/4ever"/);
  assert.match(appSource, /isFarewell\s*\?\s*pageMarkup/);
  assert.match(farewellSource, /data-farewell-key-segment="0"/);
  assert.match(farewellSource, /data-farewell-key-status/);
  assert.match(farewellSource, /event\.key === "Backspace"/);
  assert.match(farewellSource, /clipboardData/);
  assert.match(farewellSource, /readerImages\.forEach/);
  assert.match(farewellSource, /const farewellMotion = Object\.freeze/);
  assert.match(farewellSource, /transitionTo\("reader"/);
  assert.match(farewellSource, /sideRotation = \{ top: 0, left: -90, right: 90, bottom: 180 \}/);
  assert.match(farewellSource, /verticalEdgeSpacing = mobile \? 68 : 105/);
  assert.match(farewellSource, /sideCount = Math\.max\(mobile \? 12 : 8/);
  assert.match(farewellSource, /document\.fonts\?\.ready\.then/);
  assert.match(farewellSource, /Array\.isArray\(readerContent\.images\)/);
  assert.match(farewellSource, /document\.body\.append\(lightboxPortal\)/);
  assert.match(farewellSource, /motionElements = Array\.from\(root\.querySelectorAll\("\.farewell-flower, \.farewell-stamp"\)\)/);
  assert.match(farewellSource, /--flower-parallax-x/);
  assert.match(cursorSource, /function syncCursorAvailability\(\)/);
  assert.match(cursorSource, /document\.body\.dataset\.page === "farewell"/);
  assert.match(cursorSource, /window\.cancelAnimationFrame\(animationFrame\)/);
  assert.match(cursorSource, /cursor\.remove\(\)/);
  assert.match(farewellStyles, /--farewell-error:\s*#e8001f/);
  assert.match(farewellStyles, /@font-face[\s\S]*DFVN Excalifont/);
  assert.match(farewellStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(farewellStyles, /@media \(max-width: 767px\)[\s\S]*\.farewell-key-fields[\s\S]*flex-direction:\s*column/);
  assert.match(farewellStyles, /width:\s*min\(334px, calc\(100% - 48px\)\)/);
  assert.match(farewellStyles, /stamp-outline\.svg/);
  assert.match(farewellStyles, /\.farewell-stamp-layer\s*\{[\s\S]*?z-index:\s*4/);
  assert.match(farewellStyles, /--stamp-hover-scale:\s*1/);
  assert.match(farewellStyles, /\.farewell-stamp\s*\{[\s\S]*?filter:\s*drop-shadow\(0 16px 20px rgba\(0, 0, 0, 0\.2\)\)/);
  assert.match(farewellStyles, /--landing-flower-rotate:\s*-44\.3deg/);
  assert.match(farewellStyles, /--landing-flower-rotate:\s*9\.68deg/);
  assert.match(farewellStyles, /--landing-flower-rotate:\s*-17\.34deg/);
  assert.match(farewellStyles, /--landing-flower-rotate:\s*22\.52deg/);
  assert.match(farewellStyles, /\.farewell-lightbox\s*\{[\s\S]*?position:\s*fixed[\s\S]*?height:\s*100dvh/);
  assert.match(farewellStyles, /width:\s*min\(620px, 142vw\)/);
  assert.match(farewellStyles, /\.farewell-key-form\s*\{[\s\S]*?align-items:\s*center/);

  console.log("Farewell UI tests passed (key behavior, deterministic flowers, responsive layout, and reduced motion). ");
}

run().catch((error) => {
  console.error(error.stack || error.message);
  process.exitCode = 1;
});
