const fs = require("node:fs");
const path = require("node:path");

const outputDir = path.join(process.cwd(), "_site");
const siteDataPath = path.join(process.cwd(), "src", "_data", "site.json");
const siteData = JSON.parse(fs.readFileSync(siteDataPath, "utf8"));
const websiteId = process.env.UMAMI_WEBSITE_ID || siteData.umamiWebsiteId;

if (!websiteId) {
  throw new Error("Missing Umami website ID");
}

const trackingSrc = "https://um.yinjunphua.com/script.js";
const trackingTag = `<script>
(function () {
  var trackingSrc = ${JSON.stringify(trackingSrc)};
  var websiteId = ${JSON.stringify(websiteId)};
  var loadTracking = function () {
    if (document.querySelector('script[src="' + trackingSrc + '"]')) return;
    var script = document.createElement('script');
    script.async = true;
    script.src = trackingSrc;
    script.dataset.websiteId = websiteId;
    script.onerror = function () {};
    document.head.appendChild(script);
  };
  var scheduleTracking = function () {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(loadTracking, { timeout: 2000 });
    } else {
      window.setTimeout(loadTracking, 0);
    }
  };
  if (document.readyState === 'complete') {
    scheduleTracking();
  } else {
    window.addEventListener('load', scheduleTracking, { once: true });
  }
})();
</script>`;

function getHtmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return getHtmlFiles(fullPath);
    if (entry.isFile() && entry.name.endsWith(".html")) return [fullPath];
    return [];
  });
}

let injected = 0;
let skipped = 0;

for (const file of getHtmlFiles(outputDir)) {
  const html = fs.readFileSync(file, "utf8");
  if (html.includes(trackingSrc)) {
    skipped += 1;
    continue;
  }

  if (!/<\/head>/i.test(html)) {
    skipped += 1;
    continue;
  }

  const updated = html.replace(/<\/head>/i, `${trackingTag}\n</head>`);
  fs.writeFileSync(file, updated);
  injected += 1;
}

console.log(`Injected tracking into ${injected} HTML files; skipped ${skipped}.`);
