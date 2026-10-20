#!/usr/bin/env node
/**
 * Import the optional complete visual asset pack.
 *
 * The checked-in game contains a playable baseline and the visual-pack manifest,
 * but the large generated PNG archive is not in the repository. For normal
 * builds preserve checked-in assets rather than deleting them or failing the
 * Android pipeline. Set VISUAL_ASSETS_REQUIRED=1 for strict full-art releases.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archive = process.argv[2] || path.join(root, 'assets', 'import', 'mo-rpg-hero-generated-assets-v1.zip');
const destination = path.join(root, 'src', 'assets', 'visual');
const required = process.env.VISUAL_ASSETS_REQUIRED === '1';

function fail(message) {
  console.error(`visual assets: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(archive)) {
  const manifestPath = path.join(destination, 'visual-pack-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    fail(`archive is missing and visual manifest is unavailable: ${path.relative(root, archive)}`);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (error) {
    fail(`visual-pack-manifest.json is invalid: ${error.message}`);
  }

  let productionPngs = 0;
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'source') walk(full);
      } else if (entry.name.toLowerCase().endsWith('.png')) {
        productionPngs += 1;
      }
    }
  }
  walk(destination);

  if (productionPngs === Number(manifest.productionCount)) {
    console.log(`visual assets: complete pack already present (${productionPngs} production PNGs); skipping import`);
    process.exit(0);
  }

  const message = `archive is missing (${path.relative(root, archive)}) and checked-in visual directory contains ${productionPngs}/${manifest.productionCount} production PNGs. Preserving the existing game assets.`;
  if (required) fail(message);
  console.warn(`visual assets: WARNING: ${message}`);
  console.warn('visual assets: continuing with the existing asset set; strict full-pack validation remains available for release builds.');
  process.exit(0);
}

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });
try {
  execFileSync('unzip', ['-q', archive, '-d', destination], { stdio: 'inherit' });
} catch (error) {
  fail(`unable to extract asset archive: ${error.message}`);
}
console.log(`visual assets: imported PNG pack into ${path.relative(root, destination)}`);
