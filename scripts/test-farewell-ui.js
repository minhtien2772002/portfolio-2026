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
    createFarewellPhotoGridLayout,
    createFarewellPhotoLayout,
    createFarewellProtectedImageCache,
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
  assert.ok(first.every((variant, index) => (
    variant !== first[index - 1] && variant !== first[index - 2]
  )));
  assert.ok(first.every((variant) => variant >= 0 && variant < 12));

  for (const seed of ["recipient-b", "recipient-c", "recipient-d"]) {
    const sequence = createFarewellFlowerSequence(seed, 120);
    assert.ok(sequence.every((variant, index) => (
      variant !== sequence[index - 1] && variant !== sequence[index - 2]
    )));
  }

  const flowerDescriptors = first.map((variant, index) => ({
    index,
    side: ["top", "right", "bottom", "left"][index % 4],
    variant,
  }));
  const firstMotion = createFarewellFlowerMotion("recipient-a", flowerDescriptors);
  const secondMotion = createFarewellFlowerMotion("recipient-a", flowerDescriptors);
  assert.deepEqual(firstMotion, secondMotion);
  assert.notDeepEqual(firstMotion, createFarewellFlowerMotion("recipient-b", flowerDescriptors));
  assert.ok(firstMotion.every(({ depth }) => depth >= 0 && depth <= 1));
  assert.ok(firstMotion.every(({ x }) => Math.abs(x) <= 30));
  assert.ok(firstMotion.every(({ y }) => Math.abs(y) <= 70));
  assert.ok(firstMotion.every(({ rotation }) => Math.abs(rotation) >= 1 && Math.abs(rotation) <= 6));
  assert.ok(firstMotion.every(({ scale }) => scale >= 0.97 && scale <= 1.06));
  assert.ok(firstMotion.some(({ x }) => x < 0) && firstMotion.some(({ x }) => x > 0));
  assert.ok(firstMotion.some(({ y }) => y < 0) && firstMotion.some(({ y }) => y > 0));
  assert.ok(new Set(firstMotion.map(({ depth, x, y }) => `${depth}:${x}:${y}`)).size > 20);

  for (const count of [0, 1, 2, 4, 6, 10]) {
    const photoIds = Array.from({ length: count }, (_, index) => `photo-${index + 1}`);
    const layout = createFarewellPhotoLayout("recipient-a:letter-a", photoIds, 4000);
    assert.equal(layout.length, count);
    assert.deepEqual(layout, createFarewellPhotoLayout("recipient-a:letter-a", photoIds, 4000));
    assert.ok(layout.every(({ side }) => side === "left" || side === "right"));
    assert.ok(layout.every(({ side }, index) => index === 0 || side !== layout[index - 1].side));
    assert.ok(layout.every(({ top }) => top >= 104 && top <= 3751));
    if (count >= 2) assert.deepEqual(new Set(layout.map(({ side }) => side)), new Set(["left", "right"]));
    if (count >= 4) {
      const tops = layout.map(({ top }) => top);
      assert.ok(Math.max(...tops) - Math.min(...tops) > 2800);
      const gaps = tops.slice(1).map((top, index) => Math.round(top - tops[index]));
      assert.ok(new Set(gaps).size > 1);
    }
    if (count >= 6) {
      const leftCount = layout.filter(({ side }) => side === "left").length;
      assert.ok(leftCount >= Math.floor(count / 3) && leftCount <= Math.ceil(count * 2 / 3));
    }
  }
  const recipientALayout = createFarewellPhotoLayout("recipient-a:letter-a", ["photo-1", "photo-2"], 1800);
  const recipientBLayout = createFarewellPhotoLayout("recipient-b:letter-b", ["photo-1", "photo-2"], 1800);
  assert.notDeepEqual(recipientALayout, recipientBLayout);
  const preservedSixPhotoLayout = createFarewellPhotoLayout(
    "recipient-a:letter-a",
    Array.from({ length: 6 }, (_, index) => `photo-${index + 1}`),
    4000,
  );
  assert.deepEqual(preservedSixPhotoLayout.map(({ side, ...placement }) => placement), [
    { top: 126.46, edgeOffset: 11, rotation: 8, motionDepth: 0.956 },
    { top: 881.88, edgeOffset: 4, rotation: -6, motionDepth: 0.778 },
    { top: 1602.77, edgeOffset: 13, rotation: 6, motionDepth: 0.845 },
    { top: 2254.38, edgeOffset: 0, rotation: 8, motionDepth: 0.987 },
    { top: 3167.19, edgeOffset: 1, rotation: -6, motionDepth: 0.826 },
    { top: 3664.51, edgeOffset: 11, rotation: 8, motionDepth: 0.853 },
  ]);
  for (const viewport of ["tablet", "mobile"]) {
    for (const count of [1, 2, 3, 5, 6]) {
      const photoIds = Array.from({ length: count }, (_, index) => `photo-${index + 1}`);
      const compactLayout = createFarewellPhotoGridLayout(`recipient-${viewport}`, photoIds);
      assert.equal(compactLayout.length, count);
      assert.deepEqual(compactLayout, createFarewellPhotoGridLayout(`recipient-${viewport}`, photoIds));
      assert.ok(compactLayout.every(({ rotation }) => Math.abs(rotation) >= 3 && Math.abs(rotation) <= 6));
      assert.ok(compactLayout.every(({ column }, index) => {
        if (count % 2 === 1 && index === count - 1) return column === "center";
        return column === (index % 2 === 0 ? "left" : "right");
      }));
    }
  }
  assert.notDeepEqual(
    createFarewellPhotoGridLayout("recipient-a", ["photo-1", "photo-2"]),
    createFarewellPhotoGridLayout("recipient-b", ["photo-1", "photo-2"]),
  );

  const createdUrls = [];
  const revokedUrls = [];
  const imageCache = createFarewellProtectedImageCache({
    createObjectURL(blob) {
      const url = `blob:${blob.recipient}:${createdUrls.length}`;
      createdUrls.push(url);
      return url;
    },
    revokeObjectURL(url) { revokedUrls.push(url); },
  });
  const recipientAContext = imageCache.activate("recipient-a:photos");
  const recipientAUrl = imageCache.commit(recipientAContext, 0, { recipient: "a" });
  assert.equal(imageCache.get(recipientAContext, 0), recipientAUrl);
  const recipientBContext = imageCache.activate("recipient-b:photos");
  assert.equal(imageCache.get(recipientAContext, 0), undefined);
  assert.ok(revokedUrls.includes(recipientAUrl));
  assert.throws(
    () => imageCache.commit(recipientAContext, 1, { recipient: "a-late" }),
    (error) => error.name === "AbortError",
  );
  const recipientBUrl = imageCache.commit(recipientBContext, 0, { recipient: "b" });
  assert.equal(imageCache.get(recipientBContext, 0), recipientBUrl);
  const recipientASecondContext = imageCache.activate("recipient-a:photos");
  assert.equal(imageCache.get(recipientBContext, 0), undefined);
  assert.equal(imageCache.get(recipientASecondContext, 0), undefined);
  const recipientBSecondContext = imageCache.activate("recipient-b:photos");
  assert.equal(imageCache.get(recipientASecondContext, 0), undefined);
  const recipientCContext = imageCache.activate("recipient-c:no-photos");
  assert.equal(imageCache.get(recipientBSecondContext, 0), undefined);
  const recipientAThirdContext = imageCache.activate("recipient-a:photos");
  assert.equal(imageCache.get(recipientAThirdContext, 0), undefined);
  assert.equal(imageCache.isActive(recipientCContext), false);

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
  assert.match(farewellSource, /createFarewellPhotoLayout/);
  assert.match(farewellSource, /createFarewellPhotoGridLayout/);
  assert.match(farewellSource, /window\.matchMedia\("\(max-width: 1024px\)"\)\.matches/);
  assert.match(farewellSource, /if \(compact && stampLayer\.parentElement !== letter\) \{[\s\S]*?letter\.append\(stampLayer\)/);
  assert.match(farewellSource, /else if \(!compact && canvas && stampLayer\.parentElement !== canvas\) \{[\s\S]*?letter\.after\(stampLayer\)/);
  assert.match(farewellSource, /stampLayer\.dataset\.farewellStampLayout = compact \? "grid" : "sides"/);
  assert.match(farewellSource, /invalidateProtectedImages\(\)/);
  assert.match(farewellSource, /loadProtectedImage\(Number\(button\.dataset\.farewellStampIndex\), imageContext\)/);
  assert.match(farewellSource, /document\.body\.append\(lightboxPortal\)/);
  assert.match(farewellSource, /motionElements = Array\.from\(root\.querySelectorAll\("\.farewell-flower, \.farewell-stamp"\)\)\.map/);
  assert.match(farewellSource, /targetFlowerProgress = Math\.max\(0, Math\.min\(1,/);
  assert.match(farewellSource, /flowerMotionStrength = window\.matchMedia\("\(max-width: 767px\)"\)\.matches \? 0\.62 : 1/);
  assert.match(farewellSource, /--reader-parallax-rotate/);
  assert.equal((farewellSource.match(/window\.addEventListener\("scroll", onReaderScroll/g) || []).length, 1);
  assert.match(cursorSource, /function syncCursorAvailability\(\)/);
  assert.match(cursorSource, /document\.body\.dataset\.page === "farewell"/);
  assert.match(cursorSource, /window\.cancelAnimationFrame\(animationFrame\)/);
  assert.match(cursorSource, /cursor\.remove\(\)/);
  assert.match(farewellStyles, /--farewell-error:\s*#e8001f/);
  assert.match(farewellStyles, /--farewell-entry-background:\s*radial-gradient/);
  assert.match(farewellStyles, /ellipse 184% 58% at 50% 112%/);
  assert.match(farewellStyles, /\.farewell-root\s*\{[\s\S]*?background:\s*var\(--farewell-entry-background\)/);
  assert.match(farewellStyles, /\.farewell-landing\s*\{[\s\S]*?background:\s*transparent/);
  assert.match(farewellStyles, /\.farewell-key-screen\s*\{[\s\S]*?background:\s*transparent/);
  assert.match(farewellStyles, /@font-face[\s\S]*DFVN Excalifont/);
  assert.match(farewellStyles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(farewellStyles, /\.farewell-flower-motion\s*\{[\s\S]*?transform:\s*translate3d/);
  assert.match(farewellStyles, /\.farewell-flower-orientation\s*\{[\s\S]*?rotate\(var\(--flower-rotate\)\) scale\(var\(--flower-scale\)\)/);
  assert.match(farewellStyles, /@media \(prefers-reduced-motion: reduce\)[\s\S]*?\.farewell-flower-motion\s*\{[\s\S]*?transform:\s*none !important/);
  assert.match(farewellStyles, /@media \(max-width: 767px\)[\s\S]*\.farewell-key-fields[\s\S]*flex-direction:\s*column/);
  assert.match(farewellStyles, /width:\s*min\(334px, calc\(100% - 48px\)\)/);
  assert.match(farewellStyles, /stamp-outline\.svg/);
  assert.match(farewellStyles, /\.farewell-stamp-layer\s*\{[\s\S]*?z-index:\s*4/);
  assert.match(farewellStyles, /@media \(max-width: 1024px\)[\s\S]*?data-farewell-stamp-layout="grid"[\s\S]*?grid-template-columns:\s*repeat\(2, 145px\)/);
  assert.match(farewellStyles, /@media \(max-width: 767px\)[\s\S]*?data-farewell-stamp-layout="grid"[\s\S]*?grid-template-columns:\s*repeat\(2, 112px\)/);
  assert.match(farewellStyles, /data-farewell-stamp-layout="grid"\]\s*\{[\s\S]*?position:\s*relative[\s\S]*?width:\s*100%/);
  assert.match(farewellStyles, /--stamp-hover-scale:\s*1/);
  assert.match(farewellStyles, /\.farewell-stamp\s*\{[\s\S]*?filter:\s*drop-shadow\(0 16px 20px rgba\(0, 0, 0, 0\.2\)\)/);
  assert.doesNotMatch(farewellStyles, /\.farewell-stamp-[0-3]\s*\{/);
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
