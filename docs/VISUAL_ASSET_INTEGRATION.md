# Mobile RPG Hero Visual Asset Integration

The game now has a complete launcher/loading/menu presentation matching the approved fantasy side-scrolling concept.

## Runtime flow

1. Android native splash uses the gold/blue RPG icon.
2. WebView opens the game and displays the animated loading screen.
3. Loading transitions into the title launcher.
4. PLAY GAME closes the launcher and exposes the side-scrolling combat scene.
5. Character, World Map, Dungeons, Inventory, Settings and Codex buttons route into the existing RPG systems.
6. UPDATE calls the existing GitHub content updater on Android.

## Generated asset pack

The 169-PNG visual pack is maintained as an external import package because binary PNG files are not authored through the normal text-file workflow. Place the supplied `mo-rpg-hero-generated-assets-v1.zip` under `assets/import/` when importing locally. The pack contains app icons, logo, splash/loading art, menu backgrounds, panels, HUD icons, action icons, side-scrolling hero/enemy sprites, NPCs, mounts/pets, environment tiles, maps, dungeon art, quest UI and progress UI.

The source also contains lightweight SVG equivalents for the critical launcher assets under `src/assets/generated/`, so Android builds remain functional even before the full PNG pack is imported.
