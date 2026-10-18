# Android output

Build artifacts for the Android APK of Taskbar Hero live here.

The Android build is a native Android WebView shell around the existing `src/`
game — there is no separate gameplay implementation. See `docs/ANDROID_BUILD.md`
for the runtime details.

## Build

Requirements: JDK 17, Android SDK with API 35, Gradle 8.10.2, Node.js 20+.

```bash
npm ci
npm run android:assets     # stage src/ + pixi.js into the Android assets dir
cd android
gradle :app:assembleDebug
```

Or the one-shot wrapper that does both steps from the repository root:

```bash
npm run android:apk
```

`npm run android:assets` runs `scripts/stage-android-assets.mjs`, which replaces
the manual `rm -rf` / `mkdir -p` / `cp -R` sequence from `docs/ANDROID_BUILD.md`
so the same staging logic works on Windows, macOS and Linux.

## Artifacts

Gradle writes its results into `android/app/build/outputs/apk/`:

| File | What it is |
|---|---|
| `android/app/build/outputs/apk/debug/app-debug.apk` | installable debug APK |
| `android/app/build/outputs/apk/release/app-release-unsigned.apk` | release build, before signing |

## Copy into this folder

```powershell
Copy-Item "android\app\build\outputs\apk\debug\app-debug.apk" "output\android\"
Copy-Item "android\app\build\outputs\apk\release\app-release-unsigned.apk" "output\android\"
```

## Notes

- `android/app/build/`, `android/.gradle/` and `*.apk` are git-ignored — build
  output is never committed. APKs are produced and distributed as GitHub Actions
  artifacts (`taskbar-hero-android-debug` and
  `taskbar-hero-android-release-unsigned`, see `.github/workflows/android.yml`).
- The staged `android/app/src/main/assets/game/` and
  `.../assets/node_modules/` directories are generated at build time and are
  git-ignored too, so a stale copy can never be committed by accident.
- The release APK is unsigned. Sign it with your own keystore (and keep that
  keystore out of the repository) before distributing it.
