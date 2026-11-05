// Turns each photo in public/images/projects/ into responsive WebP variants and
// writes src/data/image-manifest.json with the real dimensions.
// Runs automatically before `npm run dev` and `npm run build`.
import sharp from 'sharp';
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIR = 'public/images/projects';
const OUT = path.join(DIR, 'variants');
const WIDTHS = [480, 800, 1200, 1600, 2400];

await mkdir(OUT, { recursive: true });
const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
const manifest = {};
const keep = new Set();

for (const file of files) {
  const input = path.join(DIR, file);
  const base = path.parse(file).name;
  const { width, height } = await sharp(input, { failOn: 'none' }).metadata();
  const srcTime = (await stat(input)).mtimeMs;
  const widths = WIDTHS.filter((w) => w < width);
  if (widths.length === 0 || width <= 2400) widths.push(Math.min(width, 2400));
  const variants = [];

  for (const w of [...new Set(widths)]) {
    const name = `${base}-${w}.webp`;
    const target = path.join(OUT, name);
    keep.add(name);
    const fresh = await stat(target).then((s) => s.mtimeMs >= srcTime).catch(() => false);
    if (!fresh) await sharp(input).rotate().resize({ width: w }).webp({ quality: 74, effort: 5 }).toFile(target);
    variants.push({ w, src: `/images/projects/variants/${name}` });
  }
  manifest[file] = { width, height, variants };
}

for (const f of await readdir(OUT)) if (!keep.has(f)) await rm(path.join(OUT, f));
await writeFile('src/data/image-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`Optimised ${files.length} images, ${keep.size} variants.`);
