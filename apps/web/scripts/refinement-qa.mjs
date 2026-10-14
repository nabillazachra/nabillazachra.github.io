import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await desktop.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

async function assertSingleLine(selector, name) {
  const locator = desktop.locator(selector).first();
  if (!(await locator.isVisible())) throw new Error(name + " is not visible");
  const metrics = await locator.evaluate((el) => {
    const style = getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const range = document.createRange();
    range.selectNodeContents(el);
    const rects = Array.from(range.getClientRects()).filter((r) => r.width > 1 && r.height > 1);
    return {
      whiteSpace: style.whiteSpace,
      height: rect.height,
      lineHeight: Number.parseFloat(style.lineHeight) || rect.height,
      rectCount: rects.length,
    };
  });

  if (metrics.whiteSpace !== "nowrap") {
    throw new Error(name + " is not locked to one line: " + JSON.stringify(metrics));
  }
}

await assertSingleLine(".header-role", "Header role");
await assertSingleLine(".hero-kicker p", "Hero role");

const impact = desktop.locator("section").filter({ hasText: "Years across digital products" }).first();
await impact.scrollIntoViewIfNeeded();
await desktop.waitForTimeout(220);

const metricValues = impact.locator("strong");
const early = [];
for (let i = 0; i < await metricValues.count(); i += 1) {
  early.push((await metricValues.nth(i).innerText()).trim());
}

const finals = ["5+", "50+", "10+", "5,000+"];
if (early.every((value, index) => value === finals[index])) {
  throw new Error("Impact metrics never entered an animated count state: " + JSON.stringify(early));
}

await desktop.waitForTimeout(1900);
const finished = [];
for (let i = 0; i < await metricValues.count(); i += 1) {
  finished.push((await metricValues.nth(i).innerText()).trim());
}

if (JSON.stringify(finished) !== JSON.stringify(finals)) {
  throw new Error("Impact metrics did not finish correctly: " + JSON.stringify(finished));
}

const rows = desktop.locator(".project-row");
if ((await rows.count()) < 3) throw new Error("Expected at least three selected project rows");

const directions = [];
for (let i = 0; i < 3; i += 1) {
  const row = rows.nth(i);
  const copy = await row.locator(".project-copy").boundingBox();
  const art = await row.locator(".project-artwork-link").boundingBox();
  if (!copy || !art) throw new Error("Missing layout box for project row " + (i + 1));
  directions.push(copy.x < art.x ? "copy-left" : "copy-right");
}

const expected = ["copy-left", "copy-right", "copy-left"];
if (JSON.stringify(directions) !== JSON.stringify(expected)) {
  throw new Error("Selected work is not alternating correctly: " + JSON.stringify(directions));
}

await desktop.locator("#work").screenshot({ path: "/tmp/selected-work-desktop.png" });
await impact.screenshot({ path: "/tmp/impact-counter-desktop.png" });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

const overflow = await mobile.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
}));
if (overflow.scrollWidth > overflow.clientWidth + 2) {
  throw new Error("Mobile has horizontal overflow: " + JSON.stringify(overflow));
}

const mobileRole = mobile.locator(".hero-kicker p");
const mobileWhiteSpace = await mobileRole.evaluate((el) => getComputedStyle(el).whiteSpace);
if (mobileWhiteSpace !== "nowrap") {
  throw new Error("Mobile hero role wrapped unexpectedly");
}

await mobile.locator("#work").screenshot({ path: "/tmp/selected-work-mobile.png" });

await browser.close();
console.log("Portfolio refinement QA passed.");
