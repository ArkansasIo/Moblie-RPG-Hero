# Build output

Hand-off folder for compiled Taskbar Hero artifacts. Each platform gets its own
subfolder so installable binaries never get mixed together.

```
output/
  windows/   Electron NSIS installer + unpacked build  (npm run dist)
  android/   debug + release-unsigned APKs             (npm run android:apk)
```

## Why this folder exists

The raw compiler output stays in the tool's own directory (`dist/` for
electron-builder, `android/app/build/outputs/apk/` for Gradle). This folder is
where a finished, ready-to-ship artifact gets copied so there is one predictable
place to find "the build".

## What is tracked by git

Only the READMEs in these folders are committed. The binaries themselves are
git-ignored — see `.gitignore` — because:

- The Windows installer is ~100 MB and the APK is several MB; committing them
  would bloat the repository history permanently.
- GitHub Actions already builds both and publishes them as downloadable
  artifacts (`taskbar-hero-windows-installer`,
  `taskbar-hero-android-debug`, `taskbar-hero-android-release-unsigned`).
- For public distribution, attach the files to a GitHub Release instead of
  committing them. See "Releases" in the root `README.md`.

Per-platform build instructions live in the `README.md` inside each subfolder.
