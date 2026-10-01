// Run after an Eleventy build. External assets are blocked for deterministic checks.
// Set PAPER_SCREENSHOTS to save screenshots; PAPER_ALLOW_NETWORK=1 also loads fonts/MathJax.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { chromium } = require('playwright');
const gnri = require('../src/_data/gnri');
const site = require('../src/_data/site.json');

const root = path.resolve(__dirname, '../_site');
const screenshots = process.env.PAPER_SCREENSHOTS;
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf',
};
const server = http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
    res.writeHead(404).end();
    return;
  }
  res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});

async function checkLocalLinks(page, origin, pagePath) {
  const links = await page.locator('a[href], img[src], link[href]').evaluateAll(elements =>
    elements.map(el => el.getAttribute('href') || el.getAttribute('src')));
  for (const link of links) {
    const url = new URL(link, origin + pagePath);
    if (![origin, site.url].includes(url.origin)) continue;
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    assert.ok(fs.existsSync(target), `${pagePath}: missing local target ${link}`);
    if (url.hash) {
      assert.ok(fs.readFileSync(target, 'utf8').includes(`id="${decodeURIComponent(url.hash.slice(1))}"`),
        `${pagePath}: missing fragment ${link}`);
    }
  }
}

(async () => {
  assert.ok(fs.existsSync(root), 'Run npm run build first');
  assert.equal(gnri.benchmarks.length, 19);
  assert.equal(new Set(gnri.benchmarks.map(row => row.name)).size, 19);
  assert.deepEqual(gnri.mean, { nri: 70.2, gnri: 76.2, tree: 89.5 });
  const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
  for (const slug of ['nri', 'g-nri']) {
    assert.equal(sitemap.split(`<loc>${site.url}/papers/${slug}/</loc>`).length - 1, 1);
    assert.equal(fs.readFileSync(path.join(root, 'papers', slug, 'paper.pdf')).subarray(0, 5).toString(), '%PDF-');
  }
  assert.ok(!sitemap.includes('citation.bib'));
  for (const file of ['index.html', 'ja/index.html', 'my-research.html', 'ja/my-research.html']) {
    assert.ok(fs.readFileSync(path.join(root, file), 'utf8').includes('href="/papers/g-nri/"'), `${file}: missing G-NRI link`);
  }
  assert.ok(!fs.existsSync(path.join(root, 'papers/g-nri/citation.bib')), 'No BibTeX download before proceedings registration');
  if (screenshots) fs.mkdirSync(screenshots, { recursive: true });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const originalHeroStyles = {};
    for (const slug of ['nri', 'g-nri']) {
      const pagePath = `/papers/${slug}/`;
      const page = await browser.newPage({ reducedMotion: 'reduce' });
      const errors = [];
      if (process.env.PAPER_ALLOW_NETWORK !== '1') {
        await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
      }
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => {
        if (response.url().startsWith(origin) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      const response = await page.goto(origin + pagePath, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200);
      await page.locator('img').evaluateAll(images => images.forEach(img => { img.loading = 'eager'; }));
      await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('body > nav').count(), 0, `${pagePath}: no separate navigation header`);
      assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), site.url + pagePath);
      const arxivId = slug === 'nri' ? '2605.04916' : '2608.00383';
      assert.equal(await page.locator('meta[name="citation_arxiv_id"]').getAttribute('content'), arxivId);
      assert.equal(await page.locator('meta[name="citation_pdf_url"]').getAttribute('content'), site.url + pagePath + 'paper.pdf');
      assert.equal(await page.locator('meta[name="citation_title"]').count(), 1);
      if (slug === 'nri') {
        assert.equal(await page.locator('meta[name="citation_title"]').getAttribute('content'), 'A Foundation Model for Zero-Shot Logical Rule Induction');
        assert.ok((await page.locator('meta[name="citation_conference_title"]').getAttribute('content')).includes('IJCAI 2026'));
        assert.equal(await page.locator('.research-update a[href="/papers/g-nri/"]').count(), 1);
        assert.equal(await page.locator('a[href="appendix.pdf"]').count(), 2);
      } else {
        assert.equal(await page.locator('meta[name="citation_title"]').getAttribute('content'), gnri.title);
        assert.equal((await page.locator('h1').innerText()).replace(/\s+/g, ' '), 'Symmetry-Aware Foundation Model for Logic Rule Induction');
        assert.equal(await page.locator('.hero .subtitle').count(), 0);
        assert.equal(await page.locator('meta[property="og:title"]').getAttribute('content'), await page.title());
        assert.deepEqual(await page.locator('main h2').allTextContents(), ['How G-NRI works', 'Variable-count scaling', 'Benchmark results', 'Code and reproducibility', 'BibTeX']);
        assert.ok((await page.locator('meta[name="citation_conference_title"]').getAttribute('content')).includes('NeSy 2026'));
        assert.equal(await page.locator('#bibtex pre code').textContent(), 'TBD — will be updated once the official NeSy 2026 proceedings are released and registered.');
        assert.equal(await page.locator('a[href="citation.bib"]').count(), 0);
        assert.equal(await page.locator('.links a[href="#bibtex"]').count(), 1);
        assert.equal(await page.locator('.links a[href="https://github.com/phuayj/g-nri"]').count(), 1);
        assert.ok(await page.locator('a[href="/papers/nri/"]').count());
        const article = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
        assert.equal(article['@type'], 'ScholarlyArticle');
        assert.equal(article.name, gnri.title);
        assert.equal(article.identifier, 'arXiv:2608.00383');
        assert.equal(article.encoding.contentUrl, site.url + pagePath + 'paper.pdf');
        const renderedRows = await page.locator('tbody tr').evaluateAll(rows => rows.map(row => [...row.cells].map(cell => cell.textContent.trim())));
        assert.deepEqual(renderedRows, gnri.benchmarks.map(row => [row.name, String(row.variables), row.nri.toFixed(1), row.gnri.toFixed(1), row.tree.toFixed(1)]));
        await page.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.ok(await page.locator('details').evaluate(el => el.open));
        await page.keyboard.press('Enter');
        assert.ok(!await page.locator('details').evaluate(el => el.open));
        await page.locator('summary').evaluate(el => el.blur());
      }
      await checkLocalLinks(page, origin, pagePath);
      for (const width of [320, 360, 390, 600, 768, 1280, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        assert.equal(await page.locator('.hero').evaluate(el => el.getBoundingClientRect().top + window.scrollY), 0);
        const heroStyles = await page.evaluate(() => {
          const properties = {
            '.hero': ['paddingTop', 'paddingBottom', 'backgroundImage'],
            '.hero .container': ['width', 'paddingLeft', 'paddingRight'],
            '.hero .venue': ['fontSize', 'letterSpacing', 'padding', 'textTransform'],
            '.hero h1': ['fontSize', 'lineHeight', 'letterSpacing'],
            '.hero .affil img': ['height'],
            '.hero .links': ['gap'],
            '.hero .links a': ['padding', 'fontSize', 'lineHeight', 'letterSpacing'],
            '.hero .stats': ['maxWidth', 'gap'],
            '.hero .stat': ['padding'],
          };
          return Object.fromEntries(Object.entries(properties).map(([selector, keys]) => {
            const style = getComputedStyle(document.querySelector(selector));
            return [selector, Object.fromEntries(keys.map(key => [key, style[key]]))];
          }));
        });
        if (slug === 'nri') originalHeroStyles[width] = heroStyles;
        else assert.deepEqual(heroStyles, originalHeroStyles[width], `G-NRI hero should match NRI at ${width}px`);
        const assertFits = async () => {
          const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
          assert.ok(scrollWidth <= width, `${pagePath} overflows at ${width}px (${scrollWidth}px)`);
        };
        await assertFits();
        if (slug === 'g-nri') {
          await page.locator('details').evaluate(el => { el.open = true; });
          await assertFits();
          await page.locator('details').evaluate(el => { el.open = false; });
        }
        if (screenshots && [390, 1280].includes(width)) {
          await page.screenshot({ path: path.join(screenshots, `${slug}-${width}.png`), fullPage: true });
          await page.locator('header.hero').screenshot({ path: path.join(screenshots, `${slug}-hero-${width}.png`) });
        }
      }
      assert.deepEqual(errors, []);
      console.log(`PASS ${pagePath}: paper identity, citations, links, assets and responsive layout at 320–1440px`);
      await page.close();
    }
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
