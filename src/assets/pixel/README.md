# Taskbar Hero Pixel Asset Pack

This folder contains scalable pixel-art source assets used by the RPG/MMORPG expansion. The artwork is deliberately grid-aligned so the same source can drive browser, Android, and desktop builds.

## Asset families

- heroes: knight, ranger, mage, priest
- enemies: slime, goblin, skeleton, void titan
- bosses: guardian, lich, demon, void titan variants
- npcs: merchant, quest giver, trainer, faction/arcane NPCs
- equipment: swords, axes, bows, staves, armor, shields, rings, relics
- items: weapons, consumables, resources, gems and quest items
- biomes/world: forest, plains, desert, tundra, swamp, volcanic, ocean, arcane and void locations
- dungeons: stone, fire, arcane, ice and raid-room tiles
- props: chests, shrines, gates, portals and interactable world objects
- effects: hit, heal, fire, frost, arcane and nature effects
- UI: currencies, inventory, quest, map, dungeon, raid, PvP, guild, party and chat icons

## Runtime registry

`assetRegistry.js` provides category-to-atlas paths and supported pixel scale presets. Use `getPixelAsset(category)` instead of hard-coding atlas paths in gameplay/UI code.

## Rasterization

SVG files are intentionally pixel-grid based and use `shape-rendering="crispEdges"`. They can be rasterized at 16/24/32/48/64/96/128px without changing the artwork proportions.

## Licensing

These are original project source assets generated for Taskbar Hero and are intended to remain inside this repository unless the project owner explicitly licenses them elsewhere.
