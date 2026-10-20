#!/usr/bin/env node
/**
 * Validate the generated visual pack before an Android build.
 * Strict full-pack validation is enabled with VISUAL_ASSETS_REQUIRED=1.
 * The default build still validates the manifest and checks every declared
 * master asset, but allows the baseline build when the optional PNG archive
 * has not been supplied.
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
const productionFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'source') walk(full);
    } else if (entry.name.toLowerCase().endsWith('.png')) {
      actualProduction += 1;
      productionFiles.push(path.relative(visualRoot, full).replaceAll(path.sep, '/'));
    }
  }
}
walk(visualRoot);

if (!Array.isArray(manifest.masterAssets) || manifest.masterAssets.length === 0) {
  fail('manifest must define at least one master asset');
}
for (const master of manifest.masterAssets) {
  if (!fs.existsSync(path.join(visualRoot, master))) fail(`missing master asset: ${master}`);
}

if (actualProduction !== EXPECTED_PACK_COUNT) {
  const message = `expected ${EXPECTED_PACK_COUNT} production PNGs, found ${actualProduction}`;
  if (strict) fail(message);
  console.warn(`validate-visual-assets: WARNING: ${message}; optional full pack is not present`);
  console.warn('validate-visual-assets: continuing with checked-in baseline assets; set VISUAL_ASSETS_REQUIRED=1 to require the complete pack');
} else {
  console.log(`validate-visual-assets: OK (${actualProduction} production PNGs + ${manifest.masterAssets.length} master asset(s))`);
}
