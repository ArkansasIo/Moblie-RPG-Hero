#!/usr/bin/env node
/**
 * Stages the web game into the Android app's assets directory.
 *
 * This replaces the manual shell sequence documented in docs/ANDROID_BUILD.md:
 *
 *   rm -rf android/app/src/main/assets
 *   mkdir -p android/app/src/main/assets/node_modules
 *   cp -R src android/app/src/main/assets/game
 *   cp -R node_modules/pixi.js android/app/src/main/assets/node_modules/pixi.js
 *
 * Those commands only work in a bash shell. This script does the same thing in
 * pure Node so the Android build works identically on Windows, macOS and Linux,
 * and so the GitHub Actions workflow and local builds cannot drift apart.
 *
 * Resulting layout inside the APK assets:
 *   assets/game/                 <- copy of src/
 *   assets/node_modules/pixi.js/ <- copy of the installed pixi.js package
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const assetsDir = path.join(repoRoot, 'android', 'app', 'src', 'main', 'assets');
const gameDest = path.join(assetsDir, 'game');
const pixiDest = path.join(assetsDir, 'node_modules', 'pixi.js');

const srcDir = path.join(repoRoot, 'src');
const pixiSrc = path.join(repoRoot, 'node_modules', 'pixi.js');

function fail(message) {
  console.error(`stage-android-assets: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(srcDir)) {
  fail(`missing ${path.relative(repoRoot, srcDir)} — run this from the repository root`);
}

if (!fs.existsSync(pixiSrc)) {
  fail(
    `missing ${path.relative(repoRoot, pixiSrc)} — run "npm ci" first so pixi.js is installed`,
  );
}

// Replace the assets directory so a removed or renamed source file cannot linger
// in the APK as a stale copy.
fs.rmSync(assetsDir, { recursive: true, force: true });
fs.mkdirSync(path.dirname(pixiDest), { recursive: true });

fs.cpSync(srcDir, gameDest, { recursive: true });
fs.cpSync(pixiSrc, pixiDest, { recursive: true });

function countFiles(dir) {
  let total = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    total += entry.isDirectory() ? countFiles(path.join(dir, entry.name)) : 1;
  }
  return total;
}

console.log('stage-android-assets: staged web game into Android assets');
console.log(`  src/                 -> ${path.relative(repoRoot, gameDest)} (${countFiles(gameDest)} files)`);
console.log(`  node_modules/pixi.js -> ${path.relative(repoRoot, pixiDest)} (${countFiles(pixiDest)} files)`);
