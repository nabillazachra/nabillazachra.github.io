import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });

async function desktopQA() {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });

  const hero = page.locator(".hero");
  if (!(await hero.isVisible())) throw new Error("Hero is not visible");

  const monogram = page.locator(".hero-monogram");
  const rail = page.locator(".hero-system-rail");
  if (!(await monogram.isVisible())) throw new Error("Hero monogram missing");
  if (!(await rail.isVisible())) throw new Error("Hero system rail missing");

  const role = page.locator(".hero-kicker p");
  const ws = await role.evaluate((el) => getComputedStyle(el).whiteSpace);
  if (ws !== "nowrap") throw new Error("Hero role unexpectedly wraps");

  const rows = page.locator(".project-row");
  if ((await rows.count()) < 3) throw new Error("Need at least 3 selected work rows");

  for (let i = 0; i < 3; i += 1) {
    const row = rows.nth(i);
    const number = await row.getAttribute("data-case");
    if (!number) throw new Error("Missing giant case number data on row " + i);

    const copy = await row.locator(".project-copy").boundingBox();
    const art = await row.locator(".project-artwork-link").boundingBox();
    if (!copy || !art) throw new Error("Missing project boxes");
  }

  const method = page.locator('section[aria-labelledby="method-title"]');
  await method.scrollIntoViewIfNeeded();
  const nodes = method.locator('[class*="workflowNode"]');
  if ((await nodes.count()) !== 3) throw new Error("Expected 3 workflow nodes");

  const privateWork = page.locator('section[aria-labelledby="private-work-title"]');
  const dossier = privateWork.locator('[class*="dossierMeta"]');
  const stamp = privateWork.locator('[class*="privateStamp"]');
  if (!(await dossier.isVisible())) throw new Error("Dossier metadata missing on desktop");
  if (!(await stamp.isVisible())) throw new Error("Private stamp missing");

  await hero.screenshot({ path: "/tmp/expressive-hero-desktop.png" });
  await page.locator("#work").screenshot({ path: "/tmp/expressive-work-desktop.png" });
  await method.screenshot({ path: "/tmp/expressive-method-desktop.png" });
  await privateWork.screenshot({ path: "/tmp/expressive-private-desktop.png" });

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

  if (await page.locator(".hero-system-rail").isVisible()) {
    throw new Error("Desktop hero rail leaked into mobile");
  }

  const privateWork = page.locator('section[aria-labelledby="private-work-title"]');
  const dossier = privateWork.locator('[class*="dossierMeta"]');
  if (await dossier.isVisible()) {
    throw new Error("Desktop dossier metadata leaked into mobile");
  }

  await page.locator(".hero").screenshot({ path: "/tmp/expressive-hero-mobile.png" });
  await page.locator("#work").screenshot({ path: "/tmp/expressive-work-mobile.png" });
  await privateWork.screenshot({ path: "/tmp/expressive-private-mobile.png" });

  await page.close();
}

await desktopQA();
await mobileQA();
await browser.close();
console.log("Expressive art-direction QA passed.");
