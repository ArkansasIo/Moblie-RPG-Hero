# Mobile RPG Hero — Android Download

## Latest Android build

The repository builds installable Android APKs through GitHub Actions.

### Download

1. Open the repository's **Actions** page.
2. Select the latest successful **Compile Mo RPG Hero APK** workflow run.
3. Scroll to **Artifacts**.
4. Download **mo-rpg-hero-android-debug**.
5. Extract the ZIP and install `app-debug.apk` on an Android device.

GitHub Actions:
https://github.com/ArkansasIo/Moblie-RPG-Hero/actions/workflows/android.yml

Releases:
https://github.com/ArkansasIo/Moblie-RPG-Hero/releases

## APK types

- **Debug APK** — installable test build intended for development and device testing.
- **Release APK** — compiled release build; signing is required before production distribution unless the workflow is configured with a release signing key.

## Device installation

On Android, download the APK, allow installation from the browser/file manager when Android asks for permission, and open the APK to install it.

For production distribution, use a properly signed release APK or Android App Bundle.

## Build verification

The Android workflow validates the RPG JavaScript source, stages the web game into Android assets, compiles debug and release APKs, and uploads both artifacts.
