# Mo RPG Hero — Complete Asset Build

## Runtime content

The project now includes a machine-readable RPG content catalog and a level 1–720 progression model.

### Content groups

- 40 standard monsters
- 20 boss monsters represented by the supplied boss sheet
- 40 weapons
- 32 armor/equipment entries
- 32 items and consumables
- 32 scenery/environment entries
- 8 supplied world-zone samples
- 8 biome variations
- 9 supplied dungeon samples
- 8 supplied raid samples
- 8 supplied trial/tower samples
- 12 progression bands through level 720
- 100 floors per tower

## Source files

- `src/rpg/data/assetContentCatalog.json`
- `src/rpg/data/levelProgression720.json`
- `src/rpg/data/contentManifest.json`
- `src/rpg/AssetContentLoader.js`

## Visual source

The supplied master/reference sheets document the complete visual direction. Individual runtime PNGs should be placed beneath `src/assets/visual` or the documented generated asset paths. Binary PNG upload is separate from the UTF-8 source-file workflow.

## Build flow

1. Validate JavaScript.
2. Validate the visual source pack.
3. Stage `src/` into Android assets.
4. Compile debug and CI-installable release APKs.
5. Verify APK signatures.
6. Verify the expected visual inventory.

The catalog is intentionally data-driven so additional individual PNGs can be added without changing gameplay code.
