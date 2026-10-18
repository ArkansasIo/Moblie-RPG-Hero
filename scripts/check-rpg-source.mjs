import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve('src');
const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes:true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.js')) files.push(full);
  }
}
walk(root);
let failed = 0;
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', '--input-type=module'], { input:fs.readFileSync(file, 'utf8'), encoding:'utf8' });
  if (result.status !== 0) { failed++; console.error(`FAIL ${file}\n${result.stderr}`); }
}
console.log(`Checked ${files.length} JavaScript source files.`);
if (failed) process.exit(1);
