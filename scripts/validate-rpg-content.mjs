import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const catalogPath = path.join(root, 'src/rpg/data/assetContentCatalog.json');
const progressionPath = path.join(root, 'src/rpg/data/levelProgression720.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const progression = JSON.parse(fs.readFileSync(progressionPath, 'utf8'));

const expected = {
  monsters: 40,
  bosses: 20,
  weapons: 40,
  equipment: 32,
  consumables: 32,
  scenery: 32,
  zones: 8,
  biomes: 8,
  dungeons: 9,
  raids: 8,
  trials: 8
};

for (const [key, count] of Object.entries(expected)) {
  const actual = catalog.content?.[key]?.length ?? 0;
  if (actual !== count) throw new Error(`${key}: expected ${count}, got ${actual}`);
}
if (progression.levelCap !== 720) throw new Error('level cap must be 720');
if (progression.bands.length !== 12) throw new Error('expected 12 level bands');
if (progression.bands[0].min !== 1 || progression.bands.at(-1).max !== 720) throw new Error('level bands do not span 1-720');
if (progression.towerFloors !== 100) throw new Error('tower floor count must be 100');
console.log('RPG content validation passed.');
console.log(JSON.stringify(Object.fromEntries(Object.entries(expected)), null, 2));
