import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

async function check(viewport, path) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();

  const image = page.getByAltText("Nabilla Zachra");
  if (!(await image.isVisible())) throw new Error("About portrait is not visible");

  const src = await image.getAttribute("src");
  if (!src?.startsWith("data:image/webp;base64,")) {
    throw new Error("About portrait did not render from embedded WebP data");
  }

  const box = await image.boundingBox();
  if (!box || box.width < 140 || box.height < 175) {
    throw new Error("About portrait is too small: " + JSON.stringify(box));
  }

  await about.screenshot({ path });
  await page.close();
}

await check({ width: 1440, height: 1000 }, "/tmp/about-desktop.png");
await check({ width: 390, height: 844 }, "/tmp/about-mobile.png");

await browser.close();
console.log("About portrait QA passed.");
