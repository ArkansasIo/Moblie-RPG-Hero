# RPG/MMORPG Menu and Screen Architecture

The RPG command center is organized into four layers:

- `MenuDefinitions.js` — hierarchy and page metadata.
- `MenuRouter.js` — navigation/history.
- `RPGMenuController.js` — DOM lifecycle and runtime integration.
- `screens/` — page-specific renderers.
- `ScreenRegistry.js` — maps menu pages to renderers.

## Screen contract

A screen renderer should accept an options object containing at least:

```js
{
  documentRef,
  page,
  state,
  data,
  notify
}
```

It should return a DOM `Element`. A renderer may use `data` from `MenuPageData.js` and live state from the controller.

## Fallback behavior

Pages without a dedicated renderer use the generic menu-page renderer. This keeps the menu complete while individual systems are implemented incrementally.

## Mobile requirements

All screen controls should:

- use semantic buttons/inputs;
- support pointer/touch interaction;
- avoid hover-only actions;
- maintain at least 44px interactive targets;
- work in portrait and landscape layouts;
- respect safe-area insets;
- avoid fixed-width content that forces horizontal scrolling.
