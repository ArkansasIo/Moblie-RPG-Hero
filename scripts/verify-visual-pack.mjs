#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const visualRoot = path.join(root, 'src', 'assets', 'visual');
const manifestPath = path.join(visualRoot, 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('visual pack verification failed: src/assets/visual/manifest.json is missing');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const expected = new Set((manifest.assets ?? []).map((asset) => asset.path.replaceAll('\\', '/')));
const actual = new Set();

function walk(dir, prefix = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.posix.join(prefix, entry.name);
    if (entry.isDirectory()) walk(full, rel);
    else if (entry.name.toLowerCase().endsWith('.png')) actual.add(rel);
  }
}
walk(visualRoot);

const missing = [...expected].filter((p) => !actual.has(p)).sort();
const unexpected = [...actual].filter((p) => !expected.has(p)).sort();
const sourceMaster = unexpected.filter((p) => p === 'source/asset_sheet_master.png');
const gameplayPngs = actual.size - sourceMaster.length;

if (missing.length) {
  console.error(`visual pack verification failed: ${missing.length} manifest PNG(s) are missing`);
  for (const item of missing) console.error(`  missing: ${item}`);
  process.exit(1);
}

if (manifest.asset_count !== expected.size) {
  console.error(`visual pack verification failed: manifest asset_count=${manifest.asset_count}, entries=${expected.size}`);
  process.exit(1);
}

console.log(`visual pack verified: ${expected.size} manifest PNGs present (${gameplayPngs} gameplay assets + ${sourceMaster.length} master sheet)`);
