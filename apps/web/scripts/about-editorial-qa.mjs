import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

async function desktopQA() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();

  const portrait = about.getByAltText("Nabilla Zachra");
  if (!(await portrait.isVisible())) throw new Error("About portrait is not visible");

  const portraitBox = await portrait.boundingBox();
  if (!portraitBox || portraitBox.width < 240 || portraitBox.height < 300) {
    throw new Error("Portrait is not visually dominant enough: " + JSON.stringify(portraitBox));
  }

  const watermark = about.locator('[class*="aboutWatermark"]');
  if (!(await watermark.isVisible())) throw new Error("About watermark is missing");

  const quote = about.locator("blockquote");
  if (!(await quote.isVisible())) throw new Error("Pull quote is missing");

  const annotations = about.locator('[class*="profileAnnotations"]');
  if (!(await annotations.isVisible())) throw new Error("Profile annotations are missing");

  const principles = about.locator('[class*="principles"] article');
  if ((await principles.count()) !== 3) throw new Error("Expected three working principles");

  const availability = about.locator('[class*="availabilityStrip"]');
  if (!(await availability.isVisible())) throw new Error("Availability strip is missing");

  const careerDesktop = about.locator('[class*="careerDesktop"]');
  if (!(await careerDesktop.isVisible())) throw new Error("Desktop career timeline is not visible");

  const careerRows = careerDesktop.locator("article");
  if ((await careerRows.count()) < 5) throw new Error("Expected full verified career history");

  const current = about.locator('[class*="currentRole"]');
  if (!(await current.isVisible())) throw new Error("Current role highlight is missing");

  if (await page.getByText("From code and implementation.", { exact: true }).count()) {
    throw new Error("Legacy Career Arc content still exists");
  }

  await about.screenshot({ path: "/tmp/about-editorial-desktop.png" });
  await page.close();
}

async function mobileQA() {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (overflow.scrollWidth > overflow.clientWidth + 2) {
    throw new Error("Mobile page has horizontal overflow: " + JSON.stringify(overflow));
  }

  const desktopCareer = about.locator('[class*="careerDesktop"]');
  if (await desktopCareer.isVisible()) throw new Error("Desktop career timeline leaked into mobile");

  const mobileCareer = about.locator('[class*="careerMobile"]');
  if (!(await mobileCareer.isVisible())) throw new Error("Mobile career timeline is missing");

  const items = mobileCareer.locator("details");
  if ((await items.count()) < 5) throw new Error("Mobile career timeline is incomplete");

  const first = items.first();
  if (await first.evaluate((el) => el.open)) throw new Error("Career detail should start collapsed");
  await first.locator("summary").click();
  if (!(await first.evaluate((el) => el.open))) throw new Error("Career detail did not open");
  if (!(await first.locator("p").isVisible())) throw new Error("Career summary did not reveal");

  const principleRail = about.locator('[class*="principles"]');
  const display = await principleRail.evaluate((el) => getComputedStyle(el).display);
  if (display !== "flex") throw new Error("Mobile principles are not using the swipe rail");

  await about.screenshot({ path: "/tmp/about-editorial-mobile.png" });
  await page.close();
}

await desktopQA();
await mobileQA();
await browser.close();
console.log("About editorial QA passed.");
