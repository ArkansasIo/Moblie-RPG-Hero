# Mo RPG Hero — Patch, Release and Mobile Update Specification

## Purpose

Define how source changes move from GitHub to Android builds, release packages and mobile game updates.

## Version contract

Every release has:

- semantic version: `major.minor.patch`
- integer `versionCode` for Android
- release channel: development, beta, release-candidate or stable
- source commit SHA
- content manifest version
- save/schema migration version
- audio manifest version
- release notes

Current baseline: **0.3.0 / versionCode 3 / release-candidate**.

## GitHub flow

```text
Developer change
      |
      v
GitHub main
      |
      +--> validation/build workflow
      |       |
      |       +--> debug APK artifact
      |       +--> unsigned release APK artifact
      |
      v
Version tag vX.Y.Z
      |
      v
Release workflow
      |
      +--> Android release package
      +--> release notes
      +--> checksums/manifest
      v
GitHub Release
      |
      v
Mobile update catalog
      |
      v
Host Android device
      |
      +--> validate version/integrity
      +--> download package/content
      +--> stage update
      +--> restart/switch atomically
      v
Updated game
```

## Patch classes

### Code patch

Changes JavaScript, Android wrapper, native code or configuration that is part of the application binary. Requires a new APK and incremented Android `versionCode`.

### Content patch

Changes compatible data, balancing, text, quests, item definitions, creature definitions, zones or audio references. Can be delivered through a versioned content bundle when the runtime explicitly supports it.

### Asset patch

Changes images, sprites, sound effects, music or other large resources. Must be content-addressed or checksum-verified and compatible with the installed runtime.

### Database/schema patch

Changes persistent data structures. Must include a forward migration, default values for older saves, rollback strategy where practical, and a schema version bump.

## Mobile update states

`CHECKING → AVAILABLE → DOWNLOADING → VERIFYING → STAGING → READY → APPLYING → COMPLETE`

Failure states return to the last known-good package/content version. Never delete the active version before the replacement has passed integrity checks.

## Integrity

Every published artifact should have SHA-256 metadata. The mobile client verifies:

1. expected product ID;
2. compatible minimum runtime version;
3. versionCode/version;
4. SHA-256 checksum;
5. content manifest signature when a signing service is available;
6. schema migration compatibility.

## Rollback

Keep the previous known-good binary/content manifest available. A failed migration or asset validation must prevent activation. For APK updates, Android's package installer remains the final installation authority.

## Android build baseline

The current project uses Node.js 20, JDK 17, Android SDK API 35 and Gradle 8.10.2. The existing CI compiles both debug and unsigned release APKs.

The debug package is for testing. Production distribution requires a properly signed release APK/AAB.

## Embedded/host server model

For the planned host-device multiplayer mode, the Android host owns the authoritative game session and persistence service. Other devices connect over the local/network transport. The host can advertise the active protocol version and content manifest so clients can reject incompatible builds before joining.

A traditional MySQL server is appropriate for development or a dedicated server deployment. A normal Android APK should use an embedded/mobile database implementation rather than bundling a full MySQL server process.

## Release checklist

- [ ] Update version and versionCode.
- [ ] Update changelog/release notes.
- [ ] Run syntax and unit tests.
- [ ] Build debug APK.
- [ ] Build unsigned release APK.
- [ ] Sign production artifact.
- [ ] Generate SHA-256 checksums.
- [ ] Publish release manifest.
- [ ] Validate upgrade from previous version.
- [ ] Validate save/database migrations.
- [ ] Validate audio/content manifests.
- [ ] Smoke test host and joining Android clients.
- [ ] Publish rollback metadata.
