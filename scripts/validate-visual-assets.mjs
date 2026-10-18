#!/usr/bin/env node
/**
 * Validate the generated visual pack before an Android build.
 * The production pack is 169 PNGs; source/ is reference material.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const visualRoot = path.join(root, 'src', 'assets', 'visual');
const manifestPath = path.join(visualRoot, 'visual-pack-manifest.json');
const EXPECTED_PACK_COUNT = 169;

function fail(message) {
  console.error(`validate-visual-assets: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(visualRoot)) fail('src/assets/visual is missing');
if (!fs.existsSync(manifestPath)) fail('visual-pack-manifest.json is missing');

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
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

if (actualProduction !== EXPECTED_PACK_COUNT) {
  fail(`expected ${EXPECTED_PACK_COUNT} production PNGs, found ${actualProduction}`);
}

if (!Array.isArray(manifest.masterAssets) || manifest.masterAssets.length === 0) {
  fail('manifest must define at least one master asset');
}
for (const master of manifest.masterAssets) {
  if (!fs.existsSync(path.join(visualRoot, master))) fail(`missing master asset: ${master}`);
}

console.log(`validate-visual-assets: OK (${actualProduction} production PNGs + ${manifest.masterAssets.length} master asset(s))`);
