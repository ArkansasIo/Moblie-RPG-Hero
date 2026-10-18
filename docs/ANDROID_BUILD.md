# Taskbar Hero Android APK

The Android build is a native Android WebView shell around the existing `src/` game. The gameplay source remains JavaScript + PixiJS; Android supplies the installable APK container.

## Compile locally

Requirements:
- JDK 17
- Android SDK with API 35
- Gradle 8.10.2
- Node.js 20+

From the repository root:

```bash
npm ci
rm -rf android/app/src/main/assets
mkdir -p android/app/src/main/assets/node_modules
cp -R src android/app/src/main/assets/game
cp -R node_modules/pixi.js android/app/src/main/assets/node_modules/pixi.js
cd android
gradle :app:assembleDebug
```

Installable output:

`android/app/build/outputs/apk/debug/app-debug.apk`

## GitHub Actions

`.github/workflows/android.yml` compiles both:

- `taskbar-hero-android-debug` — installable debug APK
- `taskbar-hero-android-release-unsigned` — release build before signing

The workflow stages the repository's `src/` files and the exact installed PixiJS package into the APK assets. No separate gameplay implementation is maintained for Android.

## Android runtime

The app uses `WebViewAssetLoader` rather than `file://` URLs and enables DOM storage for the browser-compatible save layer. The Android package loads only bundled application content. The fallback bridge stores the serialized `GameState` in WebView local storage, so the same save model is usable without Electron IPC.

The Android shell is landscape-oriented and provides normal Android back navigation between the game and inventory screens.
