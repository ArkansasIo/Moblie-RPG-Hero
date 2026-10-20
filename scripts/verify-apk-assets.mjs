#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const apk = process.argv[2] || path.join(root, 'android', 'app', 'build', 'outputs', 'apk', 'release', 'app-release.apk');
const strict = process.env.VISUAL_ASSETS_REQUIRED === '1';

if (!fs.existsSync(apk)) {
  console.error(`APK verification: APK not found: ${apk}`);
  process.exit(1);
}

const stat = fs.statSync(apk);
if (stat.size < 100_000) {
  console.error(`APK verification: APK is unexpectedly small (${stat.size} bytes)`);
  process.exit(1);
}

let listing;
try {
  listing = execFileSync('unzip', ['-Z1', apk], { encoding: 'utf8' });
} catch (error) {
  console.error(`APK verification: unable to list APK entries: ${error.message}`);
  process.exit(1);
}
const entries = listing.split(/\r?\n/).filter(Boolean);
const visualEntries = entries.filter((entry) => entry.startsWith('assets/game/assets/visual/') && entry.toLowerCase().endsWith('.png'));
const productionEntries = visualEntries.filter((entry) => !entry.includes('/source/'));
const masterEntries = visualEntries.filter((entry) => entry.endsWith('/source/asset_sheet_master.png'));

if (productionEntries.length !== 169 || masterEntries.length !== 1) {
  const message = `expected 169 production visual PNGs + 1 master, found ${productionEntries.length} production PNGs + ${masterEntries.length} master PNGs`;
  if (strict) {
    console.error(`APK verification: ${message}`);
    process.exit(1);
  }
  console.warn(`APK verification: WARNING: ${message}. Continuing with baseline assets; the complete optional visual pack is not bundled.`);
} else {
  console.log(`APK verification: PASS (${stat.size} bytes, 169 production PNGs + master)`);
}
