#!/usr/bin/env node
/**
 * Mobile responsiveness screenshot tool.
 * Usage: node scripts/screenshot-mobile.js [path]
 * Captures screenshots at several viewport widths and saves to /tmp/mobile-shots/.
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE_URL = process.env.BASE_URL || "http://localhost:8081";
const PAGE = process.argv[2] || "/";
const OUT_DIR = "/tmp/mobile-shots";

const VIEWPORTS = [
  { name: "iphone-se",  width: 375, height: 667 },
  { name: "iphone-14",  width: 390, height: 844 },
  { name: "small-360",  width: 360, height: 740 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "desktop",    width: 1280, height: 800 },
];

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 2,
    });
    const page = await ctx.newPage();
    const url = BASE_URL + PAGE;
    await page.goto(url, { waitUntil: "networkidle" });
    const safeName = PAGE.replace(/[^a-z0-9]+/gi, "_").replace(/^_|_$/g, "") || "root";
    const file = path.join(OUT_DIR, `${safeName}__${vp.name}_${vp.width}x${vp.height}.png`);
    await page.screenshot({ path: file, fullPage: true });
    console.log(`✓ ${vp.name} (${vp.width}x${vp.height}) → ${file}`);
    await ctx.close();
  }
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
