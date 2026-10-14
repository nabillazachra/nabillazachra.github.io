import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await desktop.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

const section = desktop.locator('section[aria-labelledby="private-work-title"]');
await section.scrollIntoViewIfNeeded();

const map = section.locator('[class*="capabilityMap"]');
if (!(await map.isVisible())) throw new Error("Capability system map is not visible on desktop");

const phases = map.locator('[class*="phaseRail"] span');
if ((await phases.count()) !== 4) throw new Error("Expected four workflow phases");

const nodes = map.locator('[class*="capabilityNode"]');
if ((await nodes.count()) !== 8) throw new Error("Expected eight capability nodes");

const core = map.locator('[data-capability="02"]');
const coreBox = await core.boundingBox();
const node03Box = await map.locator('[data-capability="03"]').boundingBox();
if (!coreBox || !node03Box) throw new Error("Capability layout boxes missing");
if (coreBox.width <= node03Box.width) {
  throw new Error("Solution design core is not visually dominant");
}

await core.hover();
await desktop.waitForTimeout(450);
const detail = core.locator('[class*="capabilityDetail"]');
const detailHeight = await detail.evaluate((el) => el.getBoundingClientRect().height);
if (detailHeight < 20) throw new Error("Desktop capability detail did not expand on hover");

await section.screenshot({ path: "/tmp/capability-map-desktop.png" });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

const mobileSection = mobile.locator('section[aria-labelledby="private-work-title"]');
await mobileSection.scrollIntoViewIfNeeded();

const mobileMap = mobileSection.locator('[class*="capabilityMap"]');
if (await mobileMap.isVisible()) throw new Error("Desktop capability map leaked into mobile");

const timeline = mobileSection.locator('[class*="capabilityTimeline"]');
if (!(await timeline.isVisible())) throw new Error("Mobile capability timeline is not visible");

const items = timeline.locator("details");
if ((await items.count()) !== 8) throw new Error("Expected eight mobile timeline items");

const first = items.first();
if (await first.evaluate((el) => el.open)) throw new Error("Mobile timeline should start collapsed");
await first.locator("summary").click();
if (!(await first.evaluate((el) => el.open))) throw new Error("Mobile timeline did not open");
if (!(await first.locator('[class*="timelineArtifacts"]').isVisible())) {
  throw new Error("Mobile artifacts did not become visible");
}

const overflow = await mobile.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
}));
if (overflow.scrollWidth > overflow.clientWidth + 2) {
  throw new Error("Mobile horizontal overflow: " + JSON.stringify(overflow));
}

await mobileSection.screenshot({ path: "/tmp/capability-map-mobile.png" });

await browser.close();
console.log("Capability system map QA passed.");
