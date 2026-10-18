# Mo RPG Hero — Source and Asset Manifest

The `src/` tree is the runtime game layer. Existing gameplay modules are preserved; the `src/data/` layer is the canonical expansion catalog for new content.

## Runtime source

- `game.js` — game loop and renderer integration
- `entities/` — Hero and Enemy entities
- `systems/` — combat, abilities, inventory, crafting, progression, quests, dungeons, raids, tower, world bosses, zones, guild/social/PvP and stats
- `rpg/` — RPG engine, menu, AI agent, MMO systems, item systems and world content
- `state/` — game state, save schema and persistence
- `fx/` — particles, hit effects, health bars, projectiles, animation and sound
- `network/` — API contract
- `platform/` — browser/Electron bridge

## Canonical data layer

`src/data/` contains:

- balance and 10 core attributes
- six player classes and specializations
- weapons, armor, accessories and rarity tiers
- enemy and world-boss catalog
- quests
- crafting recipes
- combat skills
- player-state factory
- dungeon/raid encounter rules
- tower floors 1–100
- nine world zones with sub-zones and biomes
- runtime asset registry

## Assets

`src/assets/` contains existing hero/enemy sprite sheets, skeleton animation frames, floor tiles, pixel SVG atlases and SFX. New atlases include `pixel/tower-atlas.svg` and `pixel/world-atlas-v2.svg`.

The asset registry maps gameplay identifiers to runtime files so UI and gameplay systems can reference assets by role rather than hard-coded paths.

## Design targets

- Level cap: 100
- Inventory: 120 slots
- Bank: 240 slots
- World: 9 primary zones with sub-zones/biomes
- Dungeons: normal, heroic and mythic tiers
- Raids: 8–20 player endgame content
- Tower: 100 floors with elite and boss floors
- Classes: Knight, Ranger, Mage, Cleric, Rogue, Paladin
- Crafting/gathering: 12 professions
- Equipment: weapon, armor and accessory slots
- Data-driven content suitable for Android and Electron builds
