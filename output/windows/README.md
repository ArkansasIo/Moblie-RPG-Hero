# Windows output

Build artifacts for the Windows desktop version of Taskbar Hero live here.

## Build

```bash
npm ci
npm run dist
```

`npm run dist` runs electron-builder and writes its results into `dist/`
(configured by `build.directories.output` in `package.json`). The expected
files are:

| File | What it is |
|---|---|
| `dist/Taskbar-Hero-Setup-<version>.exe` | NSIS installer, 64-bit |
| `dist/win-unpacked/` | Unpacked portable build directory |
| `dist/builder-debug.yml` | electron-builder debug metadata |

## Copy into this folder

This folder is the hand-off location for the Windows artifact. After a build:

```powershell
Copy-Item "dist\Taskbar-Hero-Setup-*.exe" "output\windows\"
```

## Notes

- `dist/` and the installer `.exe` files are git-ignored — build output is
  never committed. This folder itself is tracked so the hand-off location
  exists in the repository. The Windows installer is also produced and
  distributed as a GitHub Actions artifact (`taskbar-hero-windows-installer`,
  see `.github/workflows/ci.yml`).
- Run `npm run dist:dir` for an unpacked build only (no installer), which is
  faster when you just want to launch and check the app.
- The renderer ships as native ES modules; nothing is bundled at build time.
