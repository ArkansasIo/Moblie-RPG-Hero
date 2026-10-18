# Taskbar Hero Android

The Android build packages the existing PixiJS game in a native Android WebView.

## Requirements

- Node.js 20+
- JDK 17
- Android SDK (API 35)
- Gradle 8.10.2

## Build locally

From the repository root:

```bash
npm ci --omit=dev
npm run android:assets
cd android
gradle --no-daemon :app:assembleDebug
gradle --no-daemon :app:assembleRelease
```

Installable debug APK:
`android/app/build/outputs/apk/debug/app-debug.apk`

Unsigned release APK:
`android/app/build/outputs/apk/release/app-release-unsigned.apk`

The 169-PNG visual pack is optional. When the import archive is absent, the build validates and packages the SVG and pixel-art assets already in `src/`. The debug APK is intended for testing and sideloading. A release APK requires a persistent signing key before trusted public distribution.

## GitHub Actions

Open [Build Android APK](https://github.com/ArkansasIo/Moblie-RPG-Hero/actions/workflows/android.yml). Each successful run uploads these artifacts for 30 days:

- `mo-rpg-hero-android-debug-<version>`: installable debug APK
- `mo-rpg-hero-android-ci-release-<version>`: installable CI-signed APK for testing; it uses a unique package ID and is not a production-signing key
- `mo-rpg-hero-build-<version>`: APKs, build metadata, and the web update package

Run the workflow manually from the Actions tab, or push changes in `src/`, `android/`, `package.json`, or `package-lock.json`.

## Runtime details

- Game source is staged from `src/` using `scripts/stage-android-assets.mjs`.
- PixiJS is copied from the installed `node_modules/pixi.js` package into Android assets.
- `WebViewAssetLoader` serves local app assets over the `https://appassets.androidplatform.net` origin.
- Game saves use origin-scoped WebView `localStorage`; clearing app data clears local saves.
- Android package identifier: `io.arkansasio.taskbarhero`.
- Minimum SDK: 23 (Android 6.0).
- Current activity is landscape-oriented to match the game's compact battle layout.
- This workflow compiles the APK; it does not yet perform automated device/UI runtime testing or sign a production release.
