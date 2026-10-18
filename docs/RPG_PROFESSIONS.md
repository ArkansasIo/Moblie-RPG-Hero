# RPG Profession System

The profession catalog in `src/rpg/professions.js` defines a data-driven starting point for gathering and crafting content.

## Profession catalog

| Category | Professions | Outputs |
|---|---|---|
| Gathering | Mining, Logging, Herbalism, Skinning, Fishing, Archaeology | Ore, timber, herbs, hides, fish, relics |
| Crafting | Blacksmithing, Alchemy, Tailoring, Jewelcrafting, Cooking, Engineering | Weapons and armor, consumables, bags, gems, food buffs, gadgets |

## API

- `PROFESSIONS`: immutable catalog of profession identifiers, categories, gathering dependencies, outputs, and crafting stations.
- `getProfession(id)`: returns a profession or `null`.
- `canCraftAt(id, stationId)`: checks whether a crafting profession uses the supplied station.
- `PROFESSION_XP.requiredForNextLevel(level)`: returns the configured XP requirement for a level from 1 to 99. Level 100 and invalid levels return 0.
- `validateProfessionProgress(progress)`: validates known profession IDs, integer levels from 1–100, and non-negative finite XP.

## Example

```js
import { canCraftAt, getProfession, validateProfessionProgress } from './professions.js';

const blacksmithing = getProfession('blacksmithing');
console.log(blacksmithing.outputs);
console.log(canCraftAt('blacksmithing', 'forge')); // true

const result = validateProfessionProgress({
  mining: { level: 5, xp: 120 }
});
console.log(result.valid); // true
```

## Integration notes

This catalog is intentionally separate from inventory and economy mutation. Crafting recipes, resource-node interaction, profession XP awards, save migrations, and UI screens should call into it rather than embed profession definitions in screen code. The current module does not grant items or persist progress on its own.
