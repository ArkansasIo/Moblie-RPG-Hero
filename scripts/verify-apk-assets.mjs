#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apk = process.argv[2] || path.join(root, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');

if (!fs.existsSync(apk)) {
  console.error(`APK verification: APK not found: ${apk}`);
  process.exit(1);
}

const stat = fs.statSync(apk);
if (stat.size < 100_000) {
  console.error(`APK verification: APK is unexpectedly small (${stat.size} bytes)`);
  process.exit(1);
}

// APK is a ZIP container. Use unzip -l so this script does not require a Node ZIP dependency.
const { execFileSync } = await import('node:child_process');
const listing = execFileSync('unzip', ['-Z1', apk], { encoding: 'utf8' });
const entries = listing.split(/\r?\n/).filter(Boolean);
const visualEntries = entries.filter((entry) => entry.startsWith('assets/game/assets/visual/') && entry.toLowerCase().endsWith('.png'));
const productionEntries = visualEntries.filter((entry) => !entry.includes('/source/'));
const masterEntries = visualEntries.filter((entry) => entry.endsWith('/source/asset_sheet_master.png'));

if (productionEntries.length === 169 && masterEntries.length === 1) {
  console.log(`APK verification: PASS (${stat.size} bytes, 169 production PNGs + master)`);
  process.exit(0);
}

if (visualEntries.length > 0) {
  console.error(
    `APK verification: incomplete visual pack (${productionEntries.length}/169 production PNGs, ${masterEntries.length}/1 master)`,
  );
  process.exit(1);
}

const requiredRuntimeAssets = [
  'assets/game/index.html',
  'assets/game/game.js',
  'assets/game/launcher.js',
  'assets/game/style.css',
  'assets/game/assets/generated/logo_main.svg',
  'assets/game/assets/generated/title_background.svg',
  'assets/game/assets/hero-knight.png',
  'assets/node_modules/pixi.js/dist/pixi.mjs',
];
const missingRuntimeAssets = requiredRuntimeAssets.filter((entry) => !entries.includes(entry));
if (missingRuntimeAssets.length) {
  console.error(`APK verification: required runtime assets are missing: ${missingRuntimeAssets.join(', ')}`);
  process.exit(1);
}

console.log(`APK verification: PASS (${stat.size} bytes, bundled runtime assets present; optional visual pack not included)`);
