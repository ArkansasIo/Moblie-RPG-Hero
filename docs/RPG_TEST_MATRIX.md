# Taskbar Hero — RPG Test Matrix

These checks define expected behavior for the next gameplay expansion. Implement them as automated tests as systems are added.

## Combat formula cases

| Case | Input | Expected |
|---|---|---|
| Zero crit | Base crit 0, no gear | Critical hits never occur |
| Crit cap | Base + gear crit above configured cap | Effective crit chance stays at cap |
| No armor | Armor 0 | No armor mitigation |
| High armor | Very high armor | Mitigation is clamped below 100% |
| Dead target | Target HP 0 | Combat does not apply further damage |
| Invalid damage | Negative raw damage | Applied damage is zero or rejected |
| Cooldown floor | CDR at/above 100% | Effective attack interval remains finite |
| Healing overflow | Heal above missing HP | HP never exceeds max HP |

## Persistence cases

- Load a save created before optional attributes exist.
- Load saved inventory with an unknown or missing optional item property.
- Ensure equipped items survive save/load and contribute stats once, not twice.
- Reject an item if its class restriction is incompatible.
- Keep saved hero HP between zero and current max HP.
- Preserve stage, gold, XP, and inventory after the new data fields are introduced.

## Loot and boss cases

- Normal enemy waves preserve the existing probabilistic drop behavior unless deliberately changed.
- Boss waves award at least one item meeting the chosen boss minimum rarity.
- Bonus random loot remains separate from the guaranteed boss reward.
- Every generated item has a unique stable ID, valid slot, rarity, and stats object.
- Item value never exceeds the defined stat/rarity caps due to multipliers.
- Offline catch-up does not accidentally grant live-only loot unless the design explicitly changes.

## Release smoke test

- `npm ci` completes on the supported Node version.
- `npm run check` passes.
- Renderer and inventory scripts parse as ES modules.
- CI produces the Windows NSIS installer on push or manual workflow dispatch.
- Fresh install starts; taskbar overlay appears; inventory opens; save/load works.
