# Extended fantasy content import

The expanded catalog is wired into the game as an importable visual expansion pack.

- 40 standard monsters/enemies
- 20 boss monsters
- 40 weapons
- 32 armor/equipment pieces
- 32 consumables/items
- 40 scenery/environment assets
- 72 zones
- 72 dungeons
- 72 raids
- 72 trials
- 72 towers, each supporting 100 floors
- 12 level bands covering levels 1–720

PNG paths are defined by `src/rpg/ExtendedAssetCatalog.js` under `assets/generated/extended/<category>/`.

The generated PNG atlas is the visual source/reference for these assets. The connected GitHub repository-file API available to this session accepts UTF-8 repository files but does not provide a binary upload operation for arbitrary PNGs. Therefore the exact PNG files are retained as the generated asset package, while the game now contains the catalog, content model, import paths, and `ASSETS+` browser. Copying the PNGs into the documented paths makes them immediately available to the browser/runtime.
