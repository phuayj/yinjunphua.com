const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

// Cache of content hashes keyed by asset path, so each file is hashed
// at most once per build.
const bustCache = new Map();

module.exports = function (eleventyConfig) {
  // Re-hash assets once per build (keeps --serve/watch rebuilds fresh).
  eleventyConfig.on("eleventy.before", () => bustCache.clear());

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("files");
  eleventyConfig.addPassthroughCopy("papers");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("favicon-32x32.png");
  eleventyConfig.addPassthroughCopy("favicon-16x16.png");
  eleventyConfig.addPassthroughCopy("android-chrome-192x192.png");
  eleventyConfig.addPassthroughCopy("android-chrome-512x512.png");
  eleventyConfig.addPassthroughCopy("apple-touch-icon.png");

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  });

  eleventyConfig.addFilter("readableDateJa", (dateObj) => {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(dateObj);
  });

  eleventyConfig.addFilter("readableDateLong", (dateObj) => {
    if (!dateObj) return "";
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(dateObj);
  });

  eleventyConfig.addFilter("where", (array, path, expected) => {
    if (!Array.isArray(array)) return [];
    const parts = (path || "").split(".").filter(Boolean);
    const getValue = (item) => parts.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), item);
    return array.filter((item) => getValue(item) === expected);
  });

  // Content-hash cache busting for passthrough-copied assets (e.g. /css/style.css).
  // Assets live at the repo root and are copied verbatim, so resolve against
  // the project root. Returns "<path>?v=<10-hex-char sha256 prefix>".
  eleventyConfig.addFilter("bust", (assetPath) => {
    if (bustCache.has(assetPath)) return bustCache.get(assetPath);

    const filePath = path.join(__dirname, assetPath.replace(/^\//, ""));
    let busted;
    try {
      const contents = fs.readFileSync(filePath);
      const hash = crypto.createHash("sha256").update(contents).digest("hex").slice(0, 10);
      busted = `${assetPath}?v=${hash}`;
    } catch (err) {
      console.warn(
        `\n[bust filter] WARNING: could not hash asset "${assetPath}" (resolved to "${filePath}"): ${err.message}\n` +
          `[bust filter] Returning the path UNCHANGED - this asset will NOT be cache-busted!\n`
      );
      busted = assetPath;
    }
    bustCache.set(assetPath, busted);
    return busted;
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
  };
};
