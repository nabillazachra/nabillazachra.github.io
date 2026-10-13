import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

const business = mobile.locator("details").filter({ hasText: "Business" }).first();
const capabilities = mobile.locator("details").filter({ hasText: "View capabilities" }).first();
const experience = mobile.locator("details").filter({ hasText: "Jr Technical Consultant" }).first();
const career = mobile.locator("details").filter({ hasText: "Build / Software foundation" }).first();

for (const [name, locator] of [
  ["Business", business],
  ["Capabilities", capabilities],
  ["Experience", experience],
  ["Career", career],
]) {
  if ((await locator.count()) !== 1) throw new Error(name + " accordion missing on mobile");
  if (await locator.evaluate((el) => el.open)) throw new Error(name + " should be closed by default");
}

await business.locator("summary").click();
if (!(await mobile.getByText("Requirements", { exact: true }).last().isVisible())) {
  throw new Error("Business detail did not open");
}

await capabilities.locator("summary").click();
if (!(await mobile.getByText("Requirements & system analysis", { exact: true }).last().isVisible())) {
  throw new Error("Capabilities detail did not open");
}

await experience.locator("summary").click();
const experienceText = experience.locator("p").last();
if (!(await experienceText.isVisible())) throw new Error("Experience detail did not open");

await career.locator("summary").click();
if (!(await career.evaluate((el) => el.open))) {
  throw new Error("Career disclosure did not enter open state");
}
const careerDebug = await career.locator("h3").evaluate((element) => {
  const chain = [];
  let node = element;
  while (node) {
    const style = getComputedStyle(node);
    const rect = node.getBoundingClientRect();
    chain.push({
      tag: node.tagName,
      className: String(node.className || ""),
      display: style.display,
      visibility: style.visibility,
      opacity: style.opacity,
      width: rect.width,
      height: rect.height,
    });
    node = node.parentElement;
  }
  return chain;
});
console.log("CAREER_DEBUG", JSON.stringify(careerDebug));
if (!(await career.locator("h3").isVisible())) {
  throw new Error("Career detail did not open");
}

await mobile.screenshot({ path: "/tmp/mobile-accordion-open.png", fullPage: true });

const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await desktop.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

const desktopDetails = desktop.locator("details");
const detailsCount = await desktopDetails.count();
for (let i = 0; i < detailsCount; i += 1) {
  const display = await desktopDetails.nth(i).evaluate((el) => getComputedStyle(el).display);
  if (display !== "none") {
    throw new Error("Mobile accordion leaked into desktop layout");
  }
}

const desktopBusiness = desktop.getByText("Business", { exact: true }).first();
if (!(await desktopBusiness.isVisible())) throw new Error("Desktop workflow is not visible");

await browser.close();
console.log("Mobile accordion QA passed.");
