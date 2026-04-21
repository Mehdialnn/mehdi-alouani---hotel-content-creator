#!/usr/bin/env node
/**
 * Pre-generate AVIF + WebP variants for every JPEG/PNG in public/.
 *
 * Output: beside each source file, siblings named <base>-<width>w.<ext>
 *   public/theretreat/1.jpg
 *     -> public/theretreat/1-400w.avif, 1-400w.webp
 *     -> public/theretreat/1-800w.avif, 1-800w.webp
 *     -> ...
 *
 * Idempotent: skips a variant if the output mtime is newer than the source.
 *
 * Run manually with `npm run images`, or automatically as a `prebuild`
 * script (see package.json).
 */

import { readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, parse, relative } from 'node:path';
import sharp from 'sharp';

const PUBLIC_DIR = 'public';
const WIDTHS = [400, 800, 1200, 1920, 2560];
const SOURCE_EXT = /\.(jpe?g|png)$/i;
const AVIF_QUALITY = 55; // visually indistinguishable from JPEG q75, ~40% smaller
const WEBP_QUALITY = 72;

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const s = statSync(full);
    if (s.isDirectory()) walk(full, out);
    else if (SOURCE_EXT.test(entry)) out.push(full);
  }
  return out;
}

async function needsBuild(srcPath, outPath) {
  if (!existsSync(outPath)) return true;
  const srcStat = statSync(srcPath);
  const outStat = statSync(outPath);
  return srcStat.mtimeMs > outStat.mtimeMs;
}

async function processOne(srcPath) {
  const { dir, name } = parse(srcPath);
  const meta = await sharp(srcPath).metadata();
  const sourceWidth = meta.width ?? Math.max(...WIDTHS);

  // Don't upscale — only generate variants <= the source width.
  const targets = WIDTHS.filter((w) => w <= sourceWidth);
  if (targets.length === 0) targets.push(sourceWidth);

  let produced = 0;
  let skipped = 0;

  for (const w of targets) {
    for (const fmt of ['avif', 'webp']) {
      const outPath = join(dir, `${name}-${w}w.${fmt}`);
      if (!(await needsBuild(srcPath, outPath))) {
        skipped++;
        continue;
      }
      const pipeline = sharp(srcPath).resize({ width: w, withoutEnlargement: true });
      if (fmt === 'avif') {
        await pipeline.avif({ quality: AVIF_QUALITY, effort: 4 }).toFile(outPath);
      } else {
        await pipeline.webp({ quality: WEBP_QUALITY }).toFile(outPath);
      }
      produced++;
    }
  }

  return { srcPath, produced, skipped };
}

async function main() {
  const sources = walk(PUBLIC_DIR);
  console.log(`[images] scanning ${PUBLIC_DIR}/ — found ${sources.length} source files`);
  if (sources.length === 0) return;

  const start = Date.now();
  let totalProduced = 0;
  let totalSkipped = 0;

  // Process sequentially — sharp is already multi-threaded internally, and
  // running in parallel on a laptop just thrashes the disk.
  for (const src of sources) {
    try {
      const { produced, skipped } = await processOne(src);
      totalProduced += produced;
      totalSkipped += skipped;
      if (produced > 0) {
        console.log(`  ✓ ${relative(PUBLIC_DIR, src)} — ${produced} variants`);
      }
    } catch (err) {
      console.error(`  ✗ ${relative(PUBLIC_DIR, src)} — ${err.message}`);
    }
  }

  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(
    `[images] done in ${elapsed}s — ${totalProduced} new, ${totalSkipped} up-to-date`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
