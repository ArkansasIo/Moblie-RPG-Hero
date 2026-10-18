import fs from 'node:fs';

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const lock = JSON.parse(fs.readFileSync('package-lock.json', 'utf8'));
const required = {
  name: packageJson.name,
  version: packageJson.version,
  dependencies: packageJson.dependencies ?? {},
  devDependencies: Object.fromEntries(Object.entries(packageJson.devDependencies ?? {}).filter(([name]) => name !== 'electron-builder')),
};
lock.name = required.name;
lock.version = required.version;
lock.packages ??= {};
lock.packages[''] = { ...lock.packages[''], ...required };
fs.writeFileSync('package-lock.json', JSON.stringify(lock, null, 2) + '\n');
