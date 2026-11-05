// Regenerates every logo, favicon and social image from the original logo PNG.
// Run manually with: node scripts/build-brand.mjs
// The source already has a transparent background, so nothing needs removing.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SOURCE = 'src/assets/adashlogobg.png';
const OUT = 'public/images/brand';
await mkdir(OUT, { recursive: true });

const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const alphaAt = (x, y) => data[(y * info.width + x) * 4 + 3];
const rowHasInk = (y) => { for (let x = 0; x < info.width; x++) if (alphaAt(x, y) > 40) return true; return false; };

// Find the vertical runs of ink. The first is the mark, the last is the wordmark.
const runs = [];
let start = null;
for (let y = 0; y < info.height; y++) {
  if (rowHasInk(y)) { if (start === null) start = y; }
  else if (start !== null) { runs.push([start, y - 1]); start = null; }
}
if (start !== null) runs.push([start, info.height - 1]);
const major = runs.filter(([a, b]) => b - a > 10);
const [markTop, markBottom] = major[0];
const [wordTop, wordBottom] = major[major.length - 1];

const bounds = (top, bottom) => {
  let min = info.width, max = 0;
  for (let y = top; y <= bottom; y++) for (let x = 0; x < info.width; x++) if (alphaAt(x, y) > 40) { min = Math.min(min, x); max = Math.max(max, x); }
  return { left: min, top, width: max - min + 1, height: bottom - top + 1 };
};
const markBox = bounds(markTop, markBottom);
const wordBox = bounds(wordTop, wordBottom);
const fullBox = bounds(markTop, wordBottom);

// Keep the shape's alpha and force a flat colour, so edges stay anti-aliased.
const tint = async (input, [r, g, b]) => {
  const { data: d, info: i } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let p = 0; p < d.length; p += 4) { d[p] = r; d[p + 1] = g; d[p + 2] = b; }
  return sharp(d, { raw: { width: i.width, height: i.height, channels: 4 } }).png().toBuffer();
};
const crop = (box) => sharp(SOURCE).extract(box).png().toBuffer();

const mark = await crop(markBox);
const word = await sharp(await crop(wordBox)).resize({ width: wordBox.width * 2, kernel: 'lanczos3' }).png().toBuffer();
const wordMeta = await sharp(word).metadata();
const gap = Math.round(markBox.width * 0.2);
const hWidth = markBox.width + gap + wordMeta.width;

const horizontal = await sharp({ create: { width: hWidth, height: markBox.height, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([
    { input: mark, left: 0, top: 0 },
    { input: word, left: markBox.width + gap, top: Math.round((markBox.height - wordMeta.height) / 2) },
  ]).png().toBuffer();

const INK = [17, 18, 20];
const WHITE = [255, 255, 255];
await sharp(await tint(horizontal, INK)).png({ compressionLevel: 9 }).toFile(`${OUT}/logo-horizontal-black.png`);
await sharp(await tint(horizontal, WHITE)).png({ compressionLevel: 9 }).toFile(`${OUT}/logo-horizontal-white.png`);
await sharp(await tint(await crop(fullBox), INK)).png({ compressionLevel: 9 }).toFile(`${OUT}/logo-full-black.png`);

// Favicon: the mark on a white tile, so it stays visible on dark browser tabs.
const tile = async (size, radius, inset, file) => {
  const inner = Math.round(size * inset);
  const fitted = await sharp(await tint(mark, INK)).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  const bg = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="#fff"/></svg>`);
  await sharp(bg).composite([{ input: fitted, gravity: 'center' }]).png({ compressionLevel: 9 }).toFile(file);
};
await tile(32, 6, 0.8, 'public/favicon-32.png');
await tile(192, 36, 0.76, 'public/favicon-192.png');
await tile(180, 0, 0.72, 'public/apple-touch-icon.png');

// Social image uses the logo rather than a placeholder photo, so stock imagery
// is never shared as Adash's own work.
const ogLogo = await sharp(await tint(await crop(fullBox), INK)).resize({ height: 340 }).png().toBuffer();
const ogBg = Buffer.from('<svg width="1200" height="630"><rect width="1200" height="630" fill="#FBFBFA"/></svg>');
await sharp(ogBg).composite([{ input: ogLogo, gravity: 'center' }]).png({ compressionLevel: 9 }).toFile(`${OUT}/og-image.png`);

console.log({ runs: major, markBox, wordBox, fullBox, horizontal: [hWidth, markBox.height] });
