import { chromium } from "playwright";

const labels = [
  "Selected Work",
  "Business → system → experience.",
  "Some of my most recent work cannot live on the internet.",
  "About / Experience",
  "Teaching design, too.",
  "Playground",
  "Have a complex problem to make clearer?",
];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

async function assertStable(stage) {
  for (const label of labels) {
    const locator = page.getByText(label, { exact: true }).first();

    if ((await locator.count()) === 0) {
      throw new Error(`${stage}: missing text: ${label}`);
    }

    const result = await locator.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const chain = [];
      let node = element;

      while (node) {
        const style = getComputedStyle(node);
        chain.push({
          tag: node.tagName,
          className: String(node.className || ""),
          display: style.display,
          visibility: style.visibility,
          opacity: style.opacity,
        });

        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          Number.parseFloat(style.opacity || "1") <= 0.01
        ) {
          return {
            ok: false,
            reason: "hidden-style",
            rect: { width: rect.width, height: rect.height },
            hiddenBy: chain.at(-1),
          };
        }
        node = node.parentElement;
      }

      return {
        ok: rect.width > 0 && rect.height > 0,
        reason: rect.width > 0 && rect.height > 0 ? null : "zero-size",
        rect: { width: rect.width, height: rect.height },
        hiddenBy: null,
      };
    });

    if (!result.ok) {
      throw new Error(
        `${stage}: ${label} failed visibility check: ${JSON.stringify(result)}`,
      );
    }
  }
}

await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
await assertStable("initial load");

await page.reload({ waitUntil: "networkidle" });
await page.waitForTimeout(5000);
await assertStable("5s after reload");

for (const label of labels) {
  const locator = page.getByText(label, { exact: true }).first();
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await assertStable(`after scrolling to ${label}`);
}

await page.screenshot({
  path: "/tmp/portfolio-runtime-visibility.png",
  fullPage: true,
});

await browser.close();
console.log("Runtime visibility QA passed.");
