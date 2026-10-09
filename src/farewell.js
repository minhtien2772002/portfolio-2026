import {
  farewellKeySegments,
  formatFarewellKey,
  parseFarewellKey,
  sanitizeFarewellSegment,
} from "./components/farewell-key.mjs";

const farewellAsset = (name) => `/public/assets/farewell/${name}`;
const flowerAssets = Array.from({ length: 12 }, (_, index) => farewellAsset(`flower-${String(index + 1).padStart(2, "0")}.svg`));
const reduceMotionQuery = "(prefers-reduced-motion: reduce)";
const farewellMotion = Object.freeze({
  viewExitMs: 260,
  envelopeOpenMs: 330,
  parallaxEase: 0.14,
  parallaxStop: 0.05,
});

function farewellHeaderMarkup() {
  return `
    <header class="farewell-header" aria-label="Farewell experience by Tien Nguyen">
      <div class="farewell-header-pill">
        <img src="${farewellAsset("avatar.webp")}" alt="" width="28" height="28">
        <span>Tien Nguyen</span>
      </div>
    </header>
  `;
}

function envelopeMarkup() {
  return `
    <button class="farewell-envelope-button" type="button" data-farewell-envelope aria-label="Open your message">
      <span class="farewell-envelope-stage" aria-hidden="true">
        <span class="farewell-envelope-flower farewell-envelope-flower-top" data-farewell-depth="0.15"><img src="${flowerAssets[11]}" alt=""></span>
        <span class="farewell-envelope-flower farewell-envelope-flower-left-top" data-farewell-depth="0.25"><img src="${flowerAssets[0]}" alt=""></span>
        <span class="farewell-envelope-flower farewell-envelope-flower-right-top" data-farewell-depth="0.19"><img src="${flowerAssets[8]}" alt=""></span>
        <span class="farewell-envelope-flower farewell-envelope-flower-left-bottom" data-farewell-depth="0.31"><img src="${flowerAssets[7]}" alt=""></span>
        <span class="farewell-envelope-flower farewell-envelope-flower-right-bottom" data-farewell-depth="0.27"><img src="${flowerAssets[1]}" alt=""></span>
        <span class="farewell-envelope-letter" data-farewell-depth="0.08">
          <img class="farewell-envelope-back" src="${farewellAsset("envelope-back.webp")}" alt="">
          <span class="farewell-envelope-paper">
            <span class="farewell-envelope-paper-text">Click here<br>to open your message</span>
          </span>
          <img class="farewell-envelope-front" src="${farewellAsset("envelope-front.webp")}" alt="">
        </span>
        <span class="farewell-play-parallax" data-farewell-depth="0.4">
          <span class="farewell-play-float">
            <img class="farewell-play-default" src="${farewellAsset("play.svg")}" alt="">
            <img class="farewell-play-active" src="${farewellAsset("play-active.svg")}" alt="">
          </span>
        </span>
      </span>
    </button>
  `;
}

function landingMarkup() {
  return `
    <div class="farewell-view farewell-landing-view" data-farewell-view="landing">
      ${farewellHeaderMarkup()}
      <section class="farewell-landing" aria-labelledby="farewell-title">
        <div class="farewell-landing-copy">
          <h1 id="farewell-title">I left something<br>for you.</h1>
          <p>Every now and then, life turns the page for us.<br>That doesn't mean the story is over - maybe we'll meet again in another chapter.<br>Before we get there, I left you something. Use your personal code to open your letter.</p>
        </div>
        <div class="farewell-envelope-area">
          ${envelopeMarkup()}
        </div>
      </section>
    </div>
  `;
}

function closeButtonMarkup(label) {
  return `<button class="farewell-close-button" type="button" data-farewell-close aria-label="${label}"><img src="${farewellAsset("close.svg")}" alt=""></button>`;
}

function keyEntryMarkup() {
  return `
    <section class="farewell-view farewell-key-screen" data-farewell-view="key" aria-labelledby="farewell-key-title">
      <div class="farewell-close-shell">${closeButtonMarkup("Close key entry")}</div>
      <form class="farewell-key-form" data-farewell-key-form novalidate>
        <h1 id="farewell-key-title">Enter your personal code</h1>
        <div class="farewell-key-fields" data-farewell-key-fields>
          <label class="farewell-key-group">
            <span class="sr-only">Company abbreviation, three letters</span>
            <input type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="3" placeholder="XXX" data-farewell-key-segment="0" aria-describedby="farewell-key-help farewell-key-status">
          </label>
          <span class="farewell-key-divider" aria-hidden="true">-</span>
          <label class="farewell-key-group">
            <span class="sr-only">Last two digits of birth year</span>
            <input type="text" inputmode="numeric" autocomplete="off" maxlength="2" placeholder="00" data-farewell-key-segment="1" aria-describedby="farewell-key-help farewell-key-status">
          </label>
          <span class="farewell-key-divider" aria-hidden="true">-</span>
          <label class="farewell-key-group">
            <span class="sr-only">Name initials, two letters</span>
            <input type="text" inputmode="text" autocomplete="off" autocapitalize="characters" spellcheck="false" maxlength="2" placeholder="XX" data-farewell-key-segment="2" aria-describedby="farewell-key-help farewell-key-status">
          </label>
        </div>
        <p class="farewell-key-help" id="farewell-key-help">Company abbreviation - birth year - name initials</p>
        <p class="farewell-key-status" id="farewell-key-status" data-farewell-key-status role="status" aria-live="polite"></p>
      </form>
    </section>
  `;
}

function hashSeed(value) {
  let hash = 2166136261;
  for (const character of String(value)) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seed) {
  let state = hashSeed(seed) || 1;
  return () => {
    state += 0x6d2b79f5;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createFarewellFlowerSequence(seed, count) {
  const random = seededRandom(seed);
  const sequence = [];
  for (let index = 0; index < count; index += 1) {
    const recentVariants = new Set(sequence.slice(-2));
    const allowedVariants = flowerAssets
      .map((_, variant) => variant)
      .filter((variant) => !recentVariants.has(variant));
    const variant = allowedVariants[Math.floor(random() * allowedVariants.length)];
    sequence.push(variant);
  }
  return sequence;
}

export function createFarewellFlowerMotion(seed, flowers) {
  const descriptors = typeof flowers === "number"
    ? Array.from({ length: flowers }, (_, index) => ({ index, side: "perimeter", variant: index % flowerAssets.length }))
    : flowers;

  return descriptors.map(({ index, side, variant }, fallbackIndex) => {
    const flowerIndex = Number.isInteger(index) ? index : fallbackIndex;
    const random = seededRandom(`${seed}:flower-motion:${flowerIndex}:${variant}:${side}`);
    const depth = 0.08 + random() * 0.92;
    const profile = random();
    const xDirection = random() < 0.5 ? -1 : 1;
    const yDirection = random() < 0.5 ? -1 : 1;
    const rotationDirection = random() < 0.5 ? -1 : 1;
    const scaleDirection = random() < 0.48 ? -1 : 1;
    let x = (5 + depth * 25) * (0.72 + random() * 0.28);
    let y = (10 + depth * 60) * (0.72 + random() * 0.28);

    // A few flowers favor one transform axis so the perimeter does not move as a synchronized ring.
    if (profile < 0.18) x *= 0.2;
    else if (profile < 0.36) y *= 0.42;
    else if (profile < 0.52) {
      x *= 0.4;
      y *= 0.5;
    }

    const rotation = (1 + depth * 5) * (0.72 + random() * 0.28);
    const scaleDelta = scaleDirection < 0
      ? -(0.008 + depth * 0.022)
      : 0.01 + depth * 0.05;

    return {
      depth: Number(depth.toFixed(3)),
      x: Number((xDirection * x).toFixed(3)),
      y: Number((yDirection * y).toFixed(3)),
      rotation: Number((rotationDirection * rotation).toFixed(3)),
      scale: Number((1 + scaleDelta).toFixed(4)),
    };
  });
}

export function createFarewellPhotoLayout(seed, photoIds, letterHeight, mobile = false) {
  const identities = Array.isArray(photoIds) ? photoIds.map(String) : [];
  const count = identities.length;
  if (count === 0) return [];

  const normalizedHeight = Math.max(mobile ? 600 : 500, Math.round(Number(letterHeight) || 0));
  const random = seededRandom(`${seed}:photo-layout:${identities.join("|")}:${normalizedHeight}:${mobile ? "mobile" : "desktop"}`);
  const stampHeight = mobile ? 120 : 193;
  const usableStart = mobile ? 76 : 104;
  const usableEnd = Math.max(usableStart, normalizedHeight - stampHeight - (mobile ? 36 : 56));
  const usableSpan = usableEnd - usableStart;

  const startSide = random() < 0.5 ? "left" : "right";
  const oppositeSide = startSide === "left" ? "right" : "left";
  const sides = Array.from({ length: count }, (_, index) => index % 2 === 0 ? startSide : oppositeSide);
  // Preserve the random stream consumed by the former side shuffle so every non-side value stays stable.
  for (let index = 1; index < count; index += 1) random();

  const step = count > 1 ? usableSpan / (count - 1) : 0;
  const minimumGap = count > 1 ? Math.min(mobile ? 92 : 145, step * 0.68) : 0;
  const jitterLimit = count > 1 ? Math.min(step * 0.26, Math.max(0, (step - minimumGap) * 0.45)) : 0;
  let previousTop = Number.NEGATIVE_INFINITY;

  return identities.map((_, index) => {
    const baseTop = count === 1 ? usableStart + usableSpan * 0.5 : usableStart + step * index;
    const directionalJitter = index === 0
      ? random() * jitterLimit
      : index === count - 1
        ? -random() * jitterLimit
        : (random() * 2 - 1) * jitterLimit;
    const remaining = count - index - 1;
    const maximumTop = usableEnd - remaining * minimumGap;
    const top = Math.min(maximumTop, Math.max(usableStart, previousTop + minimumGap, baseTop + directionalJitter));
    previousTop = top;

    return {
      side: sides[index],
      top: Number(top.toFixed(2)),
      edgeOffset: mobile ? Math.round(-30 + random() * 13) : Math.round(random() * 15),
      rotation: [8, -9, 6, -6][Math.floor(random() * 4)],
      motionDepth: Number((0.76 + random() * 0.24).toFixed(3)),
    };
  });
}

export function createFarewellPhotoGridLayout(seed, photoIds) {
  const identities = Array.isArray(photoIds) ? photoIds.map(String) : [];
  const random = seededRandom(`${seed}:photo-grid:${identities.join("|")}`);
  const rotations = [-6, -4, -3, 3, 4, 6];

  return identities.map((_, index) => ({
    column: identities.length % 2 === 1 && index === identities.length - 1
      ? "center"
      : index % 2 === 0 ? "left" : "right",
    rotation: rotations[Math.floor(random() * rotations.length)],
    motionDepth: Number((0.76 + random() * 0.24).toFixed(3)),
  }));
}

function paragraphsFromLetter(letter) {
  return String(letter || "").replace(/\r/g, "").split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
}

function lightboxMarkup() {
  return `
    <div class="farewell-lightbox" data-farewell-lightbox data-open="false" role="dialog" aria-modal="true" aria-label="Photo viewer" aria-hidden="true" tabindex="-1">
      <button class="farewell-lightbox-backdrop" type="button" data-farewell-lightbox-close aria-label="Close photo viewer"></button>
      <div class="farewell-lightbox-content">
        <img data-farewell-lightbox-image alt="">
        <button class="farewell-lightbox-close" type="button" data-farewell-lightbox-close aria-label="Close photo viewer"><img src="${farewellAsset("close.svg")}" alt=""></button>
      </div>
    </div>
  `;
}

function readerMarkup(content) {
  return `
    <section class="farewell-view farewell-reader" data-farewell-view="reader" aria-label="Letter for ${content.recipient || "you"}">
      <div class="farewell-reader-canvas" data-farewell-reader-canvas>
        <div class="farewell-decoration-layer" data-farewell-flowers aria-hidden="true"></div>
        <article class="farewell-letter" data-farewell-letter tabindex="-1">
          <div class="farewell-letter-close">${closeButtonMarkup("Close letter")}</div>
          <div class="farewell-letter-copy" data-farewell-letter-copy></div>
        </article>
        <div class="farewell-stamp-layer" data-farewell-stamps></div>
      </div>
    </section>
  `;
}

export function createFarewellProtectedImageCache(urlApi = URL) {
  const objectUrls = new Map();
  let activeScope = "";
  let activeVersion = 0;

  const clear = () => {
    activeVersion += 1;
    activeScope = "";
    objectUrls.forEach((url) => urlApi.revokeObjectURL(url));
    objectUrls.clear();
  };
  const activate = (scope) => {
    clear();
    activeScope = String(scope);
    return { scope: activeScope, version: activeVersion };
  };
  const isActive = (context) => (
    context?.version === activeVersion && context?.scope === activeScope && activeScope !== ""
  );
  const cacheKey = (context, index) => `${context.scope}:${index}`;
  const get = (context, index) => isActive(context) ? objectUrls.get(cacheKey(context, index)) : undefined;
  const commit = (context, index, blob) => {
    if (!isActive(context)) throw Object.assign(new Error("stale-image-request"), { name: "AbortError" });
    const objectUrl = urlApi.createObjectURL(blob);
    if (!isActive(context)) {
      urlApi.revokeObjectURL(objectUrl);
      throw Object.assign(new Error("stale-image-request"), { name: "AbortError" });
    }
    objectUrls.set(cacheKey(context, index), objectUrl);
    return objectUrl;
  };

  return { activate, clear, commit, get, isActive };
}

export function renderFarewellPage() {
  return `
    <main class="farewell-page" data-farewell-page>
      <div class="farewell-root" data-farewell-root>
        <div class="farewell-loading" role="status"><span class="sr-only">Checking your letter access.</span></div>
      </div>
    </main>
  `;
}

export function initFarewell() {
  const root = document.querySelector("[data-farewell-root]");
  if (!root) return null;

  const controllers = new Set();
  const protectedImages = createFarewellProtectedImageCache();
  const protectedImageRequests = new Map();
  const cleanupCallbacks = [];
  let activeView = "checking";
  let content = null;
  let lightboxTrigger = null;
  let lightboxPortal = null;
  let destroyed = false;
  let parallaxFrame = 0;
  let transitionVersion = 0;

  const request = async (url, options = {}) => {
    const controller = new AbortController();
    controllers.add(controller);
    try {
      return await fetch(url, {
        credentials: "same-origin",
        cache: "no-store",
        ...options,
        signal: controller.signal,
        headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      });
    } finally {
      controllers.delete(controller);
    }
  };

  const mountView = (view, data = null) => {
    if (destroyed) return;
    cleanupCallbacks.splice(0).forEach((callback) => callback());
    activeView = view;
    content = data;
    root.innerHTML = view === "landing"
      ? landingMarkup()
      : view === "key"
        ? keyEntryMarkup()
        : readerMarkup(data);
    document.body.dataset.farewellView = view;
    if (view === "landing") initLanding();
    if (view === "key") initKeyEntry();
    if (view === "reader") initReader(data);
  };

  const transitionTo = async (view, data = null) => {
    if (destroyed || view === activeView) return;
    const version = ++transitionVersion;
    const currentView = root.querySelector("[data-farewell-view]");
    const reducedMotion = window.matchMedia(reduceMotionQuery).matches;
    if (currentView && !reducedMotion) {
      root.classList.add("is-view-exiting");
      await new Promise((resolve) => window.setTimeout(resolve, farewellMotion.viewExitMs));
    }
    if (destroyed || version !== transitionVersion) return;
    root.classList.remove("is-view-exiting");
    mountView(view, data);
  };

  const addLocalCleanup = (callback) => cleanupCallbacks.push(callback);

  const initLanding = () => {
    const envelope = root.querySelector("[data-farewell-envelope]");
    const depthLayers = Array.from(root.querySelectorAll("[data-farewell-depth]"));
    if (!envelope) return;

    envelope.addEventListener("click", () => {
      if (envelope.dataset.opening === "true") return;
      envelope.dataset.opening = "true";
      envelope.classList.add("is-opening");
      const delay = window.matchMedia(reduceMotionQuery).matches ? 40 : farewellMotion.envelopeOpenMs;
      window.setTimeout(() => {
        if (!destroyed && activeView === "landing") void transitionTo("key");
      }, delay);
    });

    let currentOffset = 0;
    let targetOffset = 0;
    const applyParallax = () => {
      currentOffset += (targetOffset - currentOffset) * farewellMotion.parallaxEase;
      depthLayers.forEach((layer) => {
        const depth = Number(layer.dataset.farewellDepth || 0);
        layer.style.setProperty("--farewell-parallax-y", `${currentOffset * depth}px`);
      });
      if (Math.abs(targetOffset - currentOffset) > farewellMotion.parallaxStop) {
        parallaxFrame = window.requestAnimationFrame(applyParallax);
      } else {
        currentOffset = targetOffset;
        parallaxFrame = 0;
      }
    };
    const measureParallax = () => {
      if (window.matchMedia(reduceMotionQuery).matches || activeView !== "landing") return;
      const area = envelope.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const offset = Math.max(-1, Math.min(1, (area.top + area.height / 2 - viewportCenter) / window.innerHeight));
      targetOffset = offset * -70;
      if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(applyParallax);
    };
    const onScroll = () => measureParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    measureParallax();
    addLocalCleanup(() => {
      window.removeEventListener("scroll", onScroll);
      if (parallaxFrame) window.cancelAnimationFrame(parallaxFrame);
    });
  };

  const initKeyEntry = () => {
    const form = root.querySelector("[data-farewell-key-form]");
    const fields = Array.from(root.querySelectorAll("[data-farewell-key-segment]"));
    const close = root.querySelector("[data-farewell-close]");
    const status = root.querySelector("[data-farewell-key-status]");
    if (!form || fields.length !== 3) return;
    fields[0].focus({ preventScroll: true });

    const setStatus = (message = "", error = false) => {
      status.textContent = message;
      form.classList.toggle("has-error", error);
    };

    const submit = async () => {
      const key = formatFarewellKey(fields.map((field) => field.value));
      if (!key || form.dataset.submitting === "true") return;
      form.dataset.submitting = "true";
      fields.forEach((field) => { field.disabled = true; });
      setStatus("Opening your letter.");
      try {
        const response = await request("/api/farewell/unlock", {
          method: "POST",
          body: JSON.stringify({ key }),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          setStatus(result.error || "Couldn't find that letter. Check your code and try again.", true);
          form.classList.remove("is-shaking");
          void form.offsetWidth;
          form.classList.add("is-shaking");
          fields.forEach((field) => { field.disabled = false; field.value = ""; });
          fields[0].focus({ preventScroll: true });
          return;
        }
        const contentResponse = await request("/api/farewell/content");
        if (!contentResponse.ok) throw new Error("content-unavailable");
        await transitionTo("reader", await contentResponse.json());
      } catch (error) {
        if (error?.name === "AbortError") return;
        setStatus("Couldn't open that letter right now. Please try again.", true);
        fields.forEach((field) => { field.disabled = false; });
      } finally {
        if (activeView === "key") delete form.dataset.submitting;
      }
    };

    fields.forEach((field, index) => {
      field.addEventListener("input", () => {
        field.value = sanitizeFarewellSegment(field.value, index);
        setStatus();
        if (field.value.length === farewellKeySegments[index].length) {
          if (index < fields.length - 1) fields[index + 1].focus();
          else void submit();
        }
      });
      field.addEventListener("keydown", (event) => {
        if (event.key === "Backspace" && !field.value && index > 0) {
          event.preventDefault();
          fields[index - 1].focus();
          fields[index - 1].setSelectionRange(fields[index - 1].value.length, fields[index - 1].value.length);
        }
        if (event.key === "ArrowLeft" && field.selectionStart === 0 && index > 0) fields[index - 1].focus();
        if (event.key === "ArrowRight" && field.selectionStart === field.value.length && index < fields.length - 1) fields[index + 1].focus();
      });
      field.addEventListener("paste", (event) => {
        const parsed = parseFarewellKey(event.clipboardData?.getData("text"));
        if (!parsed) return;
        event.preventDefault();
        parsed.forEach((value, fieldIndex) => { fields[fieldIndex].value = value; });
        fields[2].focus();
        void submit();
      });
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      void submit();
    });
    close?.addEventListener("click", () => void transitionTo("landing"));
  };

  const buildFlowers = (seed) => {
    const layer = root.querySelector("[data-farewell-flowers]");
    const letter = root.querySelector("[data-farewell-letter]");
    if (!layer || !letter) return;
    const random = seededRandom(seed);
    const letterHeight = letter.offsetHeight;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const flowerWidth = mobile ? 145 : 220;
    const flowerHeight = mobile ? 210 : 320;
    const horizontalCount = Math.max(mobile ? 7 : 9, Math.ceil(letter.offsetWidth / (mobile ? 52 : 105)));
    const verticalEdgeSpacing = mobile ? 68 : 105;
    const sideCount = Math.max(mobile ? 12 : 8, Math.ceil(letterHeight / verticalEdgeSpacing));
    const slots = [
      ...Array.from({ length: horizontalCount }, (_, index) => ({ side: "top", index, total: horizontalCount })),
      ...Array.from({ length: sideCount }, (_, index) => ({ side: "left", index, total: sideCount })),
      ...Array.from({ length: sideCount }, (_, index) => ({ side: "right", index, total: sideCount })),
      ...Array.from({ length: horizontalCount }, (_, index) => ({ side: "bottom", index, total: horizontalCount })),
    ];
    const flowerSequence = createFarewellFlowerSequence(seed, slots.length);
    const flowerMotion = createFarewellFlowerMotion(seed, slots.map((slot, index) => ({
      index,
      side: slot.side,
      variant: flowerSequence[index],
    })));
    layer.replaceChildren();
    slots.forEach((slot, slotIndex) => {
      const variant = flowerSequence[slotIndex];
      const wrapper = document.createElement("span");
      const motionLayer = document.createElement("span");
      const orientationLayer = document.createElement("span");
      const image = document.createElement("img");
      wrapper.className = `farewell-flower farewell-flower-${slot.side}`;
      wrapper.dataset.farewellFlowerSide = slot.side;
      wrapper.style.setProperty("--slot", String(slot.index));
      wrapper.style.setProperty("--slots", String(slot.total));
      const progress = (slot.index + 0.5) / slot.total;
      const randomShift = Math.round(random() * (mobile ? 12 : 22) - (mobile ? 6 : 11));
      const crossShift = Math.round(random() * (mobile ? 10 : 18) - (mobile ? 5 : 9));
      const letterLeft = letter.offsetLeft;
      const letterTop = letter.offsetTop;
      const edgeOffset = mobile ? 15 : 28;
      const centerX = letterLeft + letter.offsetWidth * progress + randomShift;
      const centerY = letterTop + letterHeight * progress + randomShift;
      const positions = {
        top: [centerX - flowerWidth / 2, letterTop - flowerHeight / 2 - edgeOffset + crossShift],
        bottom: [centerX - flowerWidth / 2, letterTop + letterHeight - flowerHeight / 2 + edgeOffset + crossShift],
        left: [letterLeft - flowerWidth / 2 - edgeOffset + crossShift, centerY - flowerHeight / 2],
        right: [letterLeft + letter.offsetWidth - flowerWidth / 2 + edgeOffset + crossShift, centerY - flowerHeight / 2],
      };
      const sideRotation = { top: 0, left: -90, right: 90, bottom: 180 };
      wrapper.style.setProperty("--flower-left", `${positions[slot.side][0]}px`);
      wrapper.style.setProperty("--flower-top", `${positions[slot.side][1]}px`);
      wrapper.style.setProperty("--flower-rotate", `${sideRotation[slot.side] + Math.round(random() * 14 - 7)}deg`);
      wrapper.style.setProperty("--flower-scale", String((mobile ? 0.46 : 0.64) + random() * (mobile ? 0.12 : 0.2)));
      wrapper.style.setProperty("--flower-motion-depth", String(flowerMotion[slotIndex].depth));
      wrapper.style.setProperty("--flower-motion-x", String(flowerMotion[slotIndex].x));
      wrapper.style.setProperty("--flower-motion-y", String(flowerMotion[slotIndex].y));
      wrapper.style.setProperty("--flower-motion-rotate", String(flowerMotion[slotIndex].rotation));
      wrapper.style.setProperty("--flower-motion-scale", String(flowerMotion[slotIndex].scale - 1));
      wrapper.style.setProperty("--flower-enter-delay", `${Math.min(480, 35 + slotIndex * 12)}ms`);
      image.src = flowerAssets[variant];
      image.alt = "";
      motionLayer.className = "farewell-flower-motion";
      orientationLayer.className = "farewell-flower-orientation";
      orientationLayer.append(image);
      motionLayer.append(orientationLayer);
      wrapper.append(motionLayer);
      layer.append(wrapper);
    });
  };

  const invalidateProtectedImages = () => {
    root.querySelectorAll("[data-farewell-stamp-image]").forEach((image) => image.removeAttribute("src"));
    lightboxPortal?.querySelector("[data-farewell-lightbox-image]")?.removeAttribute("src");
    protectedImageRequests.clear();
    protectedImages.clear();
  };

  const activateProtectedImages = (readerContent, readerImages) => {
    root.querySelectorAll("[data-farewell-stamp-image]").forEach((image) => image.removeAttribute("src"));
    lightboxPortal?.querySelector("[data-farewell-lightbox-image]")?.removeAttribute("src");
    protectedImageRequests.clear();
    const scope = `${readerContent.flowerSeed}:${hashSeed(readerContent.letter)}:${readerImages.map((image) => image.id).join("|")}`;
    return protectedImages.activate(scope);
  };

  const isActiveImageContext = (context) => (
    !destroyed
    && activeView === "reader"
    && protectedImages.isActive(context)
  );

  const staleImageError = () => Object.assign(new Error("stale-image-request"), { name: "AbortError" });

  const loadProtectedImage = async (index, context) => {
    if (!isActiveImageContext(context)) throw staleImageError();
    const cachedUrl = protectedImages.get(context, index);
    if (cachedUrl) return cachedUrl;
    const requestKey = `${context.scope}:${context.version}:${index}`;
    if (protectedImageRequests.has(requestKey)) return protectedImageRequests.get(requestKey);
    const imageRequest = (async () => {
      const response = await request(`/api/farewell/image?index=${encodeURIComponent(index)}`, { headers: {} });
      if (!response.ok) throw new Error("image-unavailable");
      const blob = await response.blob();
      if (!isActiveImageContext(context)) throw staleImageError();
      return protectedImages.commit(context, index, blob);
    })();
    protectedImageRequests.set(requestKey, imageRequest);
    try {
      return await imageRequest;
    } finally {
      if (protectedImageRequests.get(requestKey) === imageRequest) protectedImageRequests.delete(requestKey);
    }
  };

  const openLightbox = async (trigger, index, imageContext) => {
    const lightbox = lightboxPortal;
    const image = lightbox?.querySelector("[data-farewell-lightbox-image]");
    if (!lightbox || !image) return;
    try {
      image.src = await loadProtectedImage(index, imageContext);
      if (!isActiveImageContext(imageContext) || !lightbox.isConnected || lightbox !== lightboxPortal) return;
      image.alt = `Farewell memory ${index + 1}`;
      lightboxTrigger = trigger;
      lightbox.dataset.open = "true";
      lightbox.setAttribute("aria-hidden", "false");
      document.body.classList.add("is-farewell-lightbox-open");
      lightbox.focus({ preventScroll: true });
    } catch {}
  };

  const closeLightbox = (restoreFocus = true) => {
    const lightbox = lightboxPortal;
    if (!lightbox || lightbox.dataset.open !== "true") return;
    lightbox.dataset.open = "false";
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-farewell-lightbox-open");
    if (restoreFocus) lightboxTrigger?.focus({ preventScroll: true });
    lightboxTrigger = null;
  };

  const initReader = (readerContent) => {
    const copy = root.querySelector("[data-farewell-letter-copy]");
    const letter = root.querySelector("[data-farewell-letter]");
    const stampLayer = root.querySelector("[data-farewell-stamps]");
    const close = root.querySelector("[data-farewell-close]");
    if (!copy || !letter || !stampLayer) return;
    const readerImages = Array.isArray(readerContent.images) ? readerContent.images : [];
    const imageContext = activateProtectedImages(readerContent, readerImages);

    if (readerImages.length > 0) {
      const template = document.createElement("template");
      template.innerHTML = lightboxMarkup().trim();
      lightboxPortal = template.content.firstElementChild;
      document.body.append(lightboxPortal);
    }
    paragraphsFromLetter(readerContent.letter).forEach((paragraph) => {
      const element = document.createElement("p");
      element.textContent = paragraph;
      copy.append(element);
    });

    readerImages.forEach((imageData, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "farewell-stamp";
      button.dataset.farewellStampIndex = String(imageData.index);
      button.style.setProperty("--stamp-enter-delay", `${180 + index * 90}ms`);
      button.setAttribute("aria-label", `Open farewell memory ${index + 1}`);
      button.innerHTML = `<span class="farewell-stamp-frame"><img alt="" data-farewell-stamp-image></span>`;
      button.addEventListener("click", () => void openLightbox(button, imageData.index, imageContext));
      stampLayer.append(button);
    });

    const stampButtons = Array.from(stampLayer.querySelectorAll("[data-farewell-stamp-index]"));
    const positionStamps = () => {
      const compact = window.matchMedia("(max-width: 1024px)").matches;
      const canvas = root.querySelector("[data-farewell-reader-canvas]");
      if (compact && stampLayer.parentElement !== letter) {
        letter.append(stampLayer);
      } else if (!compact && canvas && stampLayer.parentElement !== canvas) {
        letter.after(stampLayer);
      }
      const layoutSeed = `${readerContent.flowerSeed}:${hashSeed(readerContent.letter)}`;
      const photoIds = readerImages.map((image) => image.id);
      const layout = compact
        ? createFarewellPhotoGridLayout(layoutSeed, photoIds)
        : createFarewellPhotoLayout(layoutSeed, photoIds, letter.offsetHeight);
      stampLayer.dataset.farewellStampLayout = compact ? "grid" : "sides";
      stampButtons.forEach((button, index) => {
        const placement = layout[index];
        if (!placement) return;
        button.style.removeProperty("top");
        button.style.removeProperty("left");
        button.style.removeProperty("right");
        button.style.removeProperty("grid-column");
        button.style.removeProperty("justify-self");
        if (compact) {
          button.style.gridColumn = placement.column === "center"
            ? "1 / -1"
            : placement.column === "left" ? "1" : "2";
          button.style.justifySelf = "center";
        } else {
          button.style.top = `${letter.offsetTop + placement.top}px`;
          button.style[placement.side] = `${placement.edgeOffset}px`;
        }
        button.style.setProperty("--stamp-rotate", `${placement.rotation}deg`);
        button.style.setProperty("--motion-depth", String(placement.motionDepth));
        button.dataset.farewellStampSide = compact ? placement.column : placement.side;
      });
    };
    positionStamps();

    const loadStamp = async (button) => {
      if (button.dataset.loaded === "true") return;
      button.dataset.loaded = "true";
      try {
        const image = button.querySelector("[data-farewell-stamp-image]");
        image.src = await loadProtectedImage(Number(button.dataset.farewellStampIndex), imageContext);
      } catch {
        delete button.dataset.loaded;
      }
    };
    let stampObserver = null;
    if ("IntersectionObserver" in window) {
      stampObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          stampObserver.unobserve(entry.target);
          void loadStamp(entry.target);
        });
      }, { rootMargin: "400px" });
      stampButtons.forEach((button) => stampObserver.observe(button));
    } else {
      stampButtons.forEach((button) => void loadStamp(button));
    }

    let motionElements = [];
    let currentReaderOffset = 0;
    let targetReaderOffset = 0;
    let currentFlowerProgress = 0;
    let targetFlowerProgress = 0;
    let flowerMotionStrength = 1;
    let readerParallaxFrame = 0;
    const applyReaderParallax = () => {
      currentReaderOffset += (targetReaderOffset - currentReaderOffset) * farewellMotion.parallaxEase;
      currentFlowerProgress += (targetFlowerProgress - currentFlowerProgress) * farewellMotion.parallaxEase;
      motionElements.forEach((motion) => {
        if (motion.type === "flower") {
          const progress = currentFlowerProgress * flowerMotionStrength;
          motion.element.style.setProperty("--reader-parallax-x", `${motion.x * progress}px`);
          motion.element.style.setProperty("--reader-parallax-y", `${motion.y * progress}px`);
          motion.element.style.setProperty("--reader-parallax-rotate", `${motion.rotation * progress}deg`);
          motion.element.style.setProperty("--reader-parallax-scale", String(1 + motion.scale * progress));
        } else {
          motion.element.style.setProperty("--reader-parallax-y", `${currentReaderOffset * motion.depth}px`);
        }
      });
      const offsetMoving = Math.abs(targetReaderOffset - currentReaderOffset) > farewellMotion.parallaxStop;
      const flowerMoving = Math.abs(targetFlowerProgress - currentFlowerProgress) > 0.0005;
      if (offsetMoving || flowerMoving) {
        readerParallaxFrame = window.requestAnimationFrame(applyReaderParallax);
      } else {
        currentReaderOffset = targetReaderOffset;
        currentFlowerProgress = targetFlowerProgress;
        readerParallaxFrame = 0;
      }
    };
    const measureReaderParallax = () => {
      if (window.matchMedia(reduceMotionQuery).matches || activeView !== "reader") return;
      const canvas = root.querySelector("[data-farewell-reader-canvas]");
      if (!canvas) return;
      const canvasTop = window.scrollY + canvas.getBoundingClientRect().top;
      targetReaderOffset = Math.max(-36, Math.min(36, (window.scrollY + window.innerHeight / 2 - canvasTop) * 0.035));
      const viewportCenter = window.scrollY + window.innerHeight / 2;
      targetFlowerProgress = Math.max(0, Math.min(1, (viewportCenter - canvasTop) / Math.max(1, canvas.offsetHeight)));
      if (!readerParallaxFrame) readerParallaxFrame = window.requestAnimationFrame(applyReaderParallax);
    };
    const positionDecorations = () => {
      flowerMotionStrength = window.matchMedia("(max-width: 767px)").matches ? 0.62 : 1;
      positionStamps();
      buildFlowers(readerContent.flowerSeed);
      motionElements = Array.from(root.querySelectorAll(".farewell-flower, .farewell-stamp")).map((element) => (
        element.classList.contains("farewell-flower")
          ? {
              element,
              type: "flower",
              x: Number(element.style.getPropertyValue("--flower-motion-x") || 0),
              y: Number(element.style.getPropertyValue("--flower-motion-y") || 0),
              rotation: Number(element.style.getPropertyValue("--flower-motion-rotate") || 0),
              scale: Number(element.style.getPropertyValue("--flower-motion-scale") || 0),
            }
          : {
              element,
              type: "stamp",
              depth: Number(element.style.getPropertyValue("--motion-depth") || 0.8),
            }
      ));
      measureReaderParallax();
    };
    window.requestAnimationFrame(positionDecorations);
    let canRemeasure = true;
    document.fonts?.ready.then(() => {
      if (canRemeasure && !destroyed && activeView === "reader") positionDecorations();
    });
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(positionDecorations, 100);
    };
    window.addEventListener("resize", onResize);

    const onReaderScroll = () => measureReaderParallax();
    window.addEventListener("scroll", onReaderScroll, { passive: true });
    measureReaderParallax();

    close?.addEventListener("click", async () => {
      closeLightbox(false);
      invalidateProtectedImages();
      try {
        await request("/api/farewell/close", { method: "POST", body: "{}" });
      } finally {
        void transitionTo("landing");
      }
    });
    lightboxPortal?.querySelectorAll("[data-farewell-lightbox-close]").forEach((button) => button.addEventListener("click", () => closeLightbox()));
    const onKeydown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKeydown);
    letter.focus({ preventScroll: true });
    addLocalCleanup(() => {
      canRemeasure = false;
      stampObserver?.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onReaderScroll);
      document.removeEventListener("keydown", onKeydown);
      if (readerParallaxFrame) window.cancelAnimationFrame(readerParallaxFrame);
      closeLightbox(false);
      invalidateProtectedImages();
      lightboxPortal?.remove();
      lightboxPortal = null;
      document.body.classList.remove("is-farewell-lightbox-open");
    });
  };

  void request("/api/farewell/content", { headers: {} })
    .then(async (response) => {
      if (response.ok) mountView("reader", await response.json());
      else mountView("landing");
    })
    .catch((error) => {
      if (error?.name !== "AbortError") mountView("landing");
    });

  return () => {
    destroyed = true;
    controllers.forEach((controller) => controller.abort());
    cleanupCallbacks.splice(0).forEach((callback) => callback());
    protectedImageRequests.clear();
    protectedImages.clear();
    closeLightbox(false);
    lightboxPortal?.remove();
    lightboxPortal = null;
    document.body.classList.remove("is-farewell-lightbox-open");
    delete document.body.dataset.farewellView;
  };
}
