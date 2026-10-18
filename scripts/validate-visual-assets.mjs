#!/usr/bin/env node
/**
 * Validate the generated visual pack before an Android build.
 *
 * The production pack is 169 PNGs. The master sheet is intentionally excluded
 * from the production count and is kept under visual/source/ for reference.
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
if (!Array.isArray(manifest.files) || manifest.files.length !== EXPECTED_PACK_COUNT) {
  fail(`manifest must list exactly ${EXPECTED_PACK_COUNT} production PNG files`);
}

const missing = [];
const seen = new Set();
for (const rel of manifest.files) {
  if (seen.has(rel)) fail(`duplicate manifest entry: ${rel}`);
  seen.add(rel);
  if (!rel.toLowerCase().endsWith('.png')) fail(`non-PNG manifest entry: ${rel}`);
  const full = path.join(visualRoot, rel);
  if (!fs.existsSync(full)) missing.push(rel);
}

if (missing.length) {
  console.error(`validate-visual-assets: ${missing.length} generated PNGs are missing`);
  for (const file of missing.slice(0, 20)) console.error(`  missing: ${file}`);
  if (missing.length > 20) console.error(`  ... ${missing.length - 20} more`);
  process.exit(1);
}

let actualProduction = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.toLowerCase().endsWith('.png') && !full.includes(`${path.sep}source${path.sep}`)) actualProduction += 1;
  }
}
walk(visualRoot);

if (actualProduction !== EXPECTED_PACK_COUNT) {
  fail(`expected ${EXPECTED_PACK_COUNT} production PNGs, found ${actualProduction}`);
}

console.log(`validate-visual-assets: OK (${actualProduction} production PNGs + master/source assets)`);
