#!/usr/bin/env node
/**
 * Validate the generated visual pack before an Android build.
 * The full generated pack is optional for baseline builds and mandatory only
 * when VISUAL_ASSETS_REQUIRED=1. Missing master/PNG assets must not prevent a
 * baseline package from building when the import archive is unavailable.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const visualRoot = path.join(root, 'src', 'assets', 'visual');
const manifestPath = path.join(visualRoot, 'visual-pack-manifest.json');
const EXPECTED_PACK_COUNT = 169;
const strict = process.env.VISUAL_ASSETS_REQUIRED === '1';

function fail(message) {
  console.error(`validate-visual-assets: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(visualRoot)) fail('src/assets/visual is missing');
if (!fs.existsSync(manifestPath)) fail('visual-pack-manifest.json is missing');

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (error) {
  fail(`visual-pack-manifest.json is invalid: ${error.message}`);
}
if (manifest.productionCount !== EXPECTED_PACK_COUNT) {
  fail(`manifest productionCount must be ${EXPECTED_PACK_COUNT}`);
}

let actualProduction = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'source') walk(full);
    } else if (entry.name.toLowerCase().endsWith('.png')) {
      actualProduction += 1;
    }
  }
}
walk(visualRoot);

const missingMasters = Array.isArray(manifest.masterAssets)
  ? manifest.masterAssets.filter(master => !fs.existsSync(path.join(visualRoot, master)))
  : ['<manifest.masterAssets>'];
if (!Array.isArray(manifest.masterAssets) || manifest.masterAssets.length === 0) {
  fail('manifest must define at least one master asset');
}

if (actualProduction !== EXPECTED_PACK_COUNT || missingMasters.length > 0) {
  const message = `expected ${EXPECTED_PACK_COUNT} production PNGs + all master assets; found ${actualProduction} production PNGs; missing masters: ${missingMasters.join(', ') || 'none'}`;
  if (strict) fail(message);
  console.warn(`validate-visual-assets: WARNING: ${message}`);
  console.warn('validate-visual-assets: continuing with checked-in baseline assets; set VISUAL_ASSETS_REQUIRED=1 to require the complete visual pack');
} else {
  console.log(`validate-visual-assets: OK (${actualProduction} production PNGs + ${manifest.masterAssets.length} master asset(s))`);
}
