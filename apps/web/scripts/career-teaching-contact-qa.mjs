import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

async function desktopQA() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();

  const rows = about.locator('[class*="careerEvents"] article');
  if ((await rows.count()) < 5) throw new Error("Career ledger incomplete");

  const firstBox = await rows.first().boundingBox();
  if (!firstBox || firstBox.height > 170) {
    throw new Error("Career row still too tall: " + JSON.stringify(firstBox));
  }

  const firstMeta = await rows.first().locator('[class*="careerMeta"]').boundingBox();
  const firstRole = await rows.first().locator('[class*="careerRole"]').boundingBox();
  const firstSummary = await rows.first().locator('[class*="careerSummary"]').boundingBox();
  if (!firstMeta || !firstRole || !firstSummary) throw new Error("Career columns missing");
  if (!(firstMeta.x < firstRole.x && firstRole.x < firstSummary.x)) {
    throw new Error("Career columns are not ordered correctly");
  }

  const currentText = await rows.first().locator('[class*="careerMeta"] strong').innerText();
  if (!currentText.includes("CURRENT")) throw new Error("Current status not colocated with phase");

  const teaching = page.locator('section[aria-labelledby="teaching-title"]');
  await teaching.scrollIntoViewIfNeeded();
  const teachingCards = teaching.locator("article");
  if ((await teachingCards.count()) !== 2) throw new Error("Expected two teaching cards");
  const metrics = teaching.locator('[class*="teachingMetric"] strong');
  if ((await metrics.nth(0).innerText()).trim() !== "10+") throw new Error("10+ metric missing");
  if ((await metrics.nth(1).innerText()).trim() !== "5,000+") throw new Error("5,000+ metric missing");

  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  const contactLinks = contact.locator(".contact-link");
  if ((await contactLinks.count()) < 2) throw new Error("Contact finale lacks CTA rows");
  if (!(await contact.locator(".contact-watermark").isVisible())) throw new Error("Contact watermark missing");

  await about.locator('[class*="careerSection"]').screenshot({ path: "/tmp/career-ledger-desktop.png" });
  await teaching.screenshot({ path: "/tmp/teaching-editorial-desktop.png" });
  await contact.screenshot({ path: "/tmp/contact-finale-desktop.png" });
  await page.close();
}

async function mobileQA() {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  if (overflow.scrollWidth > overflow.clientWidth + 2) {
    throw new Error("Mobile horizontal overflow: " + JSON.stringify(overflow));
  }

  const about = page.locator("#about");
  const mobileCareer = about.locator('[class*="careerMobile"]');
  if (!(await mobileCareer.isVisible())) throw new Error("Mobile career timeline missing");

  const teaching = page.locator('section[aria-labelledby="teaching-title"]');
  await teaching.scrollIntoViewIfNeeded();
  const teachingRail = teaching.locator('[class*="teachingGrid"]');
  const railDisplay = await teachingRail.evaluate((el) => getComputedStyle(el).display);
  if (railDisplay !== "flex") throw new Error("Teaching is not a swipe rail on mobile");

  const contact = page.locator("#contact");
  await contact.scrollIntoViewIfNeeded();
  const heading = contact.locator("h2");
  if (!(await heading.isVisible())) throw new Error("Contact heading missing on mobile");
  const privateLink = contact.getByText("Request selected case studies", { exact: true });
  if (!(await privateLink.isVisible())) throw new Error("Private portfolio CTA missing");

  await about.locator('[class*="careerSection"]').screenshot({ path: "/tmp/career-ledger-mobile.png" });
  await teaching.screenshot({ path: "/tmp/teaching-editorial-mobile.png" });
  await contact.screenshot({ path: "/tmp/contact-finale-mobile.png" });
  await page.close();
}

await desktopQA();
await mobileQA();
await browser.close();
console.log("Career, Teaching, and Contact QA passed.");
