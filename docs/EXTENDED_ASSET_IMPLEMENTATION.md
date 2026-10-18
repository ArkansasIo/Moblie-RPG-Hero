# Mo RPG Hero — Extended Asset Implementation

The supplied visual sheets are now represented by a runtime asset catalog in `src/rpg/ExtendedAssetCatalog.js` and exposed through the in-game **ASSET VAULT** command.

## Catalog groups

- 40 standard monsters
- 20 boss monsters shown in the supplied boss sheet
- 40 weapons
- 32 armor/equipment assets shown in the supplied sheet
- 32 items/consumables shown in the supplied sheet
- 32 scenery/environment assets shown in the supplied sheet
- 8 sample world-zone backgrounds
- 9 sample dungeon backgrounds
- 8 sample raid backgrounds
- 8 sample trial/tower backgrounds
- 15 world-map icons
- 12 UI icons
- 9 level-band assets covering the displayed 1–720 progression

The source sheets describe larger design targets such as 72 zones, 72 dungeons, 72 raids and 72 trials. Those are treated as gameplay/content capacity rather than inventing PNGs that were not present in the supplied sheets.

## Runtime path convention

Individual production files are expected at:

`assets/generated/extended/<category>/<slug>.png`

For example:

`assets/generated/extended/monsters/goblin.png`

`assets/generated/extended/weapons/flame-blade.png`

`assets/generated/extended/zones/greenwood-plains.png`

The catalog is deliberately independent of the binary import mechanism. This allows the Android build to fail clearly if a required binary pack is missing instead of silently substituting placeholders.

## In-game integration

`src/rpg/boot.js` imports the extended catalog and creates an **ASSET VAULT** command. The vault provides:

- category filtering
- asset counts
- stable asset IDs
- runtime asset paths
- selection state through `window.taskbarHeroExtendedAssets`
- the complete catalog through `window.taskbarHeroAssetCatalog`

The existing Fantasy Assets browser remains available separately.

## Binary pack

The individual PNGs still need to be supplied through the project's binary asset import path. The repository's existing visual-pack pipeline remains the authoritative mechanism for staging binary assets into the Android APK. The newly supplied master sheets are references and should not replace the individual runtime PNGs.
