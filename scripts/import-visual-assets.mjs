#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archive = process.argv[2] || path.join(root, 'assets', 'import', 'mo-rpg-hero-generated-assets-v1.zip');
const destination = path.join(root, 'src', 'assets', 'visual');

if (!fs.existsSync(archive)) {
  console.log(`visual assets: no import archive at ${path.relative(root, archive)}; keeping SVG fallback assets`);
  process.exit(0);
}

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(destination, { recursive: true });
execFileSync('unzip', ['-q', archive, '-d', destination], { stdio: 'inherit' });
console.log(`visual assets: imported PNG pack into ${path.relative(root, destination)}`);
