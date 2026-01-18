# react-native-vision-camera-foss

**FOSS (Free and Open Source Software) fork of [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera) v4.7.3**

This fork removes all proprietary Google dependencies to enable F-Droid compliance while preserving all core functionality including Frame Processors for ML/AI plugins like MediaPipe.

---

## 🎯 What's Changed?

### ✅ Removed
- **Google ML Kit Barcode Scanning** (`com.google.mlkit:barcode-scanning:17.3.0`)
- **Google Play Services ML Kit** (`com.google.android.gms:play-services-mlkit-barcode-scanning:18.3.1`)
- All barcode scanning functionality (disabled, not deleted)

### ✅ Preserved
- **Frame Processors** - Full infrastructure for AI/ML plugins (MediaPipe, TensorFlow Lite, etc.)
- **Photo & Video Recording** - All capture features work perfectly
- **Camera Controls** - Focus, zoom, exposure, flash, torch, HDR, etc.
- **All Android/iOS APIs** - Complete camera functionality except code scanning

---

## 🔧 Technical Details

### Modified Android Files

1. **`build.gradle`** - Removed ML Kit dependencies
2. **`CodeScannerPipeline.kt`** - Stubbed to no-op (just closes images)
3. **`CodeType.kt`** - Removed `Barcode` imports, stubbed conversion methods
4. **`CameraSession.kt`** - Changed callback signature from `List<Barcode>` to `List<Any>`
5. **`CameraView.kt`** - Updated override to use `List<Any>`
6. **`CameraView+Events.kt`** - Stubbed event emission to always return empty array

### What Still Works

✅ **Frame Processors** - Untouched `Frame.java`, `FrameProcessorPlugin.java`, all C++ JNI bindings  
✅ **MediaPipe Integration** - Pose detection, face mesh, hand tracking, etc.  
✅ **Camera Features** - Photo capture, video recording, exposure control, focus, zoom  
✅ **All Formats** - HDR, Night Mode, YUV/RGB pixel formats  
✅ **TypeScript/JavaScript** - Complete API surface preserved

### What Doesn't Work

❌ **QR/Barcode Scanning** - Code scanner functionality disabled  
📝 *Alternative*: Use [react-native-vision-camera-zxing](https://github.com/rodgomesc/vision-camera-zxing) (FOSS ZXing-based plugin)

---

## 📦 Installation

### Via GitHub (F-Droid builds)
```json
{
  "dependencies": {
    "react-native-vision-camera": "github:LuckyTheCookie/react-native-vision-camera-foss#02840681"
  }
}
```

### Build System
This fork maintains the monorepo structure with:
- Root `package.json` pointing to `package/` subdirectories
- Symlinks: `android/`, `ios/`, `src/` → `package/` equivalents
- Pre-built `lib/` folder (TypeScript compiled to JS) for F-Droid compatibility

---

## 🧪 Verification

### Zero Google References
```bash
grep -r "com\.google\." package/android/src/main/java/com/mrousavy/camera/
# Returns empty (exit code 1) - no ML Kit imports found
```

### Frame Processor Files Intact
```bash
ls package/android/src/main/java/com/mrousavy/camera/frameprocessors/
# Frame.java ✅
# FrameProcessorPlugin.java ✅
# VisionCameraProxy.kt ✅
# All C++ bindings preserved ✅
```

---

## 🤝 Contributing

This is a maintenance fork specifically for F-Droid compliance. For features/bugfixes unrelated to Google dependencies, please contribute to the [upstream repository](https://github.com/mrousavy/react-native-vision-camera).

### Updating from Upstream
```bash
# Sync with original repo
git remote add upstream https://github.com/mrousavy/react-native-vision-camera.git
git fetch upstream
git merge upstream/main

# Re-apply FOSS patches
./apply-foss-patches.sh

# Rebuild TypeScript
cd package && bun run build
git add -f lib/
git commit -m "Update from upstream + re-apply FOSS patches"
```

---

## 📄 License

Same as upstream: **MIT License** (see [LICENSE](package/LICENSE))

---

## 🙏 Credits

Original library by [Marc Rousavy](https://github.com/mrousavy) - this fork exists solely to enable F-Droid distribution and respects all upstream licensing and attribution.

**Upstream**: https://github.com/mrousavy/react-native-vision-camera  
**Original Docs**: https://react-native-vision-camera.com/
