const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const analyticsSource = fs.readFileSync(path.join(rootDir, "src/analytics.js"), "utf8");
const window = {
  dataLayer: [],
  location: { href: "https://tienminhng.com/" },
};
const document = { title: "Nguyen Minh Tien - Product Designer" };

vm.runInNewContext(analyticsSource, { URL, window, document });

const calls = () => window.dataLayer.map((entry) => Array.from(entry));
const pageViews = () => calls().filter(([command, name]) => command === "event" && name === "page_view");
const normalized = (value) => JSON.parse(JSON.stringify(value));

const configCall = calls().find(([command, id]) => command === "config" && id === "G-DJVR3BEQ0F");
assert(configCall, "GA4 must be configured with the requested measurement ID");
assert.strictEqual(configCall[2].send_page_view, false, "automatic page views must be disabled");

assert.strictEqual(window.portfolioAnalytics.trackPageView(), true, "initial route should emit a page view");
assert.deepStrictEqual(normalized(pageViews()[0][2]), {
  page_location: "https://tienminhng.com/",
  page_path: "/",
  page_title: "Nguyen Minh Tien - Product Designer",
});

assert.strictEqual(window.portfolioAnalytics.trackPageView(), false, "rerendering the same route must be deduplicated");
assert.strictEqual(pageViews().length, 1);

window.location.href = "https://tienminhng.com/about";
document.title = "About | Nguyen Minh Tien";
assert.strictEqual(window.portfolioAnalytics.trackPageView(), true, "a new SPA route should emit a page view");
assert.strictEqual(pageViews().length, 2);
assert.deepStrictEqual(normalized(pageViews()[1][2]), {
  page_location: "https://tienminhng.com/about",
  page_path: "/about",
  page_title: "About | Nguyen Minh Tien",
});

window.location.href = "https://tienminhng.com/about#skills";
assert.strictEqual(window.portfolioAnalytics.trackPageView(), false, "an in-page anchor must not emit a page view");

window.location.href = "https://tienminhng.com/about?email=private@example.com#skills";
assert.strictEqual(window.portfolioAnalytics.trackPageView(), false, "query-only changes must not duplicate route page views");
assert(!JSON.stringify(calls()).includes("private@example.com"), "query data must not enter analytics payloads");

window.location.href = "https://tienminhng.com/study-cases/hpf";
document.title = "HPF Case Study | Nguyen Minh Tien";
assert.strictEqual(window.portfolioAnalytics.trackPageView(), true, "protected route entry should emit one page view");
assert.strictEqual(window.portfolioAnalytics.trackPageView(), false, "HPF unlock rerender must not duplicate its page view");

window.location.href = "https://tienminhng.com/about";
document.title = "About | Nguyen Minh Tien";
assert.strictEqual(window.portfolioAnalytics.trackPageView(), true, "browser back to a different route should emit a page view");
assert.strictEqual(pageViews().length, 4);

for (const [, eventName, payload] of pageViews()) {
  assert.strictEqual(eventName, "page_view");
  assert.deepStrictEqual(Array.from(Object.keys(payload)).sort(), ["page_location", "page_path", "page_title"]);
}

console.log("Analytics checks passed (manual SPA page views, deduplication, and payload privacy).");
