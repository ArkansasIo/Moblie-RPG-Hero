# Mo RPG Hero Visual Pack v1

The Android release visual pack is `mo-rpg-hero-generated-assets-v1`.

## Inventory

- Production PNGs: **169**
- Reference/master PNGs: **1**
- Total PNGs: **170**
- Production destination: `src/assets/visual/`
- Master reference: `src/assets/visual/source/asset_sheet_master.png`
- Import archive: `assets/import/mo-rpg-hero-generated-assets-v1.zip`
- Archive SHA-256: `a28b40b3a71d16ce6e37a996c3a820d9cfe0baba61d69de5ec73d41ee72f515b`
- Archive size: `5,845,305` bytes

## Import

Place the generated ZIP at:

```text
assets/import/mo-rpg-hero-generated-assets-v1.zip
```

Then run:

```bash
npm run assets:import
npm run validate:visual
npm run android:assets
```

The Android staging step copies the validated production pack into:

```text
android/app/src/main/assets/game/assets/visual/
```

## APK verification

After building a release APK, verify the embedded pack with:

```bash
node scripts/verify-apk-assets.mjs android/app/build/outputs/apk/release/app-release.apk
```

The verifier requires exactly 169 production PNGs plus the master PNG under `assets/game/assets/visual/`.

## Reproducibility note

The manifest records the expected archive checksum and inventory. The binary ZIP is intentionally not represented as UTF-8 source text; it must be supplied as the import artifact before a source build can reproduce the full 169-PNG pack.
