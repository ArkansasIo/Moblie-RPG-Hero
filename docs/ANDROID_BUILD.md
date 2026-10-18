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
npm install
npm run android:assets
cd android
gradle --no-daemon :app:assembleDebug
gradle --no-daemon :app:assembleRelease
```

Installable debug APK:
`android/app/build/outputs/apk/debug/app-debug.apk`

Unsigned release APK:
`android/app/build/outputs/apk/release/app-release-unsigned.apk`

The debug APK is intended for testing and sideloading. The release APK produced by this workflow is unsigned, so sign it with your own release key before distribution via stores or as a trusted production release.

## GitHub Actions

Open [Build Android APK](https://github.com/ArkansasIo/taskbar-hero/actions/workflows/android.yml). Each successful run uploads these artifacts for 30 days:

- `taskbar-hero-android-debug`: installable debug APK ZIP
- `taskbar-hero-android-release-unsigned`: unsigned release APK ZIP

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
