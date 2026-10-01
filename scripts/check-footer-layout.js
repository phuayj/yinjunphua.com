// Run after a build. Serve built files through Playwright routing, without external requests.
// Also check research paragraph alignment. Set FOOTER_SCREENSHOTS for page screenshots.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '../_site');
const origin = 'http://site.test';
const screenshots = process.env.FOOTER_SCREENSHOTS;
const pages = [
  '/', '/ja/', '/my-research.html', '/ja/my-research.html',
  '/about.html', '/ja/about.html', '/error.html',
  '/thoughts/2023-08-23-reflections-on-my-first-lecture.html',
  '/ja/thoughts/2023-11-14-ニューロシンボリックAI入門.html',
];
const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1280, height: 1600 },
  { width: 1280, height: 800 },
  { width: 1920, height: 1080 },
];

async function checkResearchParagraphs(page, label) {
  const sections = await page.evaluate(() => ['/papers/nri/assets/pipeline.png', '/images/sddr-2023.png'].map(src => {
    const image = document.querySelector(`img[src="${src}"]`);
    const row = image.closest('.row');
    const heading = row.previousElementSibling.getBoundingClientRect();
    const paragraphs = [];
    for (let el = row.nextElementSibling; el?.tagName === 'P'; el = el.nextElementSibling) {
      const rect = el.getBoundingClientRect();
      paragraphs.push({ left: rect.left, right: rect.right, top: rect.top });
    }
    return { left: heading.left, right: heading.right, imageBottom: image.getBoundingClientRect().bottom, paragraphs };
  }));
  for (const [index, section] of sections.entries()) {
    assert.equal(section.paragraphs.length, index === 0 ? 1 : 2, `${label}: prose belongs after the image row`);
    for (const paragraph of section.paragraphs) {
      assert.ok(Math.abs(paragraph.left - section.left) < 1, `${label}: paragraph left edge must align with its heading`);
      assert.ok(Math.abs(paragraph.right - section.right) < 1, `${label}: paragraph right edge must align with its heading`);
      assert.ok(paragraph.top >= section.imageBottom, `${label}: prose must follow the diagram`);
    }
  }
}

(async () => {
  assert.ok(fs.existsSync(root), 'Run npm run build first');
  if (screenshots) fs.mkdirSync(screenshots, { recursive: true });
  const browser = await chromium.launch();
  let shortCases = 0;
  let longCases = 0;
  try {
    for (const pagePath of pages) {
      const page = await browser.newPage();
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.route('**/*', async route => {
        const url = new URL(route.request().url());
        if (url.origin !== origin) return route.abort();
        let file = path.join(root, decodeURIComponent(url.pathname));
        if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
        if (!file.startsWith(root + path.sep) || !fs.existsSync(file)) {
          errors.push(`Missing asset: ${url.pathname}`);
          return route.fulfill({ status: 404, body: 'Not found' });
        }
        return route.fulfill({ path: file });
      });
      await page.goto(origin + pagePath, { waitUntil: 'networkidle' });
      assert.ok(await page.locator('body').evaluate(el => el.classList.contains('site-layout')));
      await page.locator('img').evaluateAll(images => images.forEach(img => { img.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        // Compare paragraph geometry/typography with the previous normal block layout.
        const paragraphs = () => page.locator('body > .container p').evaluateAll(elements => elements.map(el => {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          return [rect.width, rect.height, style.fontSize, style.lineHeight, style.fontFamily];
        }));
        await page.locator('body').evaluate(el => el.classList.remove('site-layout'));
        const previousParagraphs = await paragraphs();
        await page.locator('body').evaluate(el => el.classList.add('site-layout'));
        assert.deepEqual(await paragraphs(), previousParagraphs, `${pagePath}: paragraph layout must not change`);
        const layout = await page.evaluate(() => {
          const footer = document.querySelector('body > footer');
          const content = document.querySelector('body > .container');
          return {
            bottom: footer.getBoundingClientRect().bottom + scrollY,
            gap: footer.getBoundingClientRect().top - content.getBoundingClientRect().bottom,
            position: getComputedStyle(footer).position,
            height: document.documentElement.scrollHeight,
            width: document.documentElement.scrollWidth,
          };
        });
        const label = `${pagePath} at ${viewport.width}×${viewport.height}`;
        if (pagePath.endsWith('/my-research.html')) await checkResearchParagraphs(page, label);
        assert.equal(layout.position, 'static', `${label}: footer must stay in normal flow`);
        assert.ok(layout.gap >= 23.9, `${label}: preserve the 24px gap; never overlap content`);
        assert.ok(Math.abs(layout.bottom - Math.max(layout.height, viewport.height)) <= 1, `${label}: footer must reach the page/viewport bottom`);
        assert.ok(layout.width <= viewport.width, `${label}: horizontal overflow`);
        if (layout.height <= viewport.height + 1) shortCases++;
        else longCases++;
        if (['/', '/ja/'].includes(pagePath) && viewport.height === 1600) {
          assert.equal(layout.height, viewport.height, `${label}: a short homepage must fill the viewport`);
        }
        if (screenshots && (['/', '/ja/'].includes(pagePath) || pagePath.endsWith('/my-research.html')) && [390, 1280].includes(viewport.width)) {
          const name = (pagePath.startsWith('/ja/') ? 'ja' : 'en') + (pagePath.endsWith('/my-research.html') ? '-research' : '');
          await page.screenshot({ path: path.join(screenshots, `${name}-${viewport.width}x${viewport.height}.png`), fullPage: true });
        }
      }
      assert.deepEqual(errors, []);
      console.log(`PASS ${pagePath}: footer position, no overlap, unchanged typography at six viewport sizes`);
      await page.close();
    }
    assert.ok(shortCases > 0 && longCases > 0, 'Exercise both short and scrolling pages');
    console.log(`PASS ${shortCases} short-page and ${longCases} long-page layouts`);
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
