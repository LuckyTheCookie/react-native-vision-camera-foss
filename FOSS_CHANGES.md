# 🆓 React Native Vision Camera - FOSS Edition

This is a **FOSS (Free and Open Source Software)** fork of [react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera) with all Google proprietary dependencies removed for **F-Droid compliance**.

## 📋 Why This Fork?

The original `react-native-vision-camera` library uses **Google ML Kit** for barcode/QR code scanning functionality. While ML Kit is powerful, it:

1. **Contains proprietary Google code** - Not allowed on F-Droid
2. **Requires Google Play Services** - Not available on degoogled Android devices
3. **Includes tracking/analytics** - Privacy concern for some users
4. **Adds ~2.4MB** to app size for the barcode model

This fork removes all Google dependencies, making the library suitable for:
- **F-Droid** distribution
- **Privacy-focused apps**
- **Degoogled devices** (GrapheneOS, CalyxOS, LineageOS without GApps)

---

## 🔧 What Was Changed

### 1. `package/android/build.gradle`

**Removed:**
```groovy
// BEFORE: Google ML Kit dependencies
if (enableCodeScanner) {
    implementation 'com.google.mlkit:barcode-scanning:17.3.0'
} else {
    implementation "com.google.android.gms:play-services-mlkit-barcode-scanning:18.3.1"
}
```

**Replaced with:**
```groovy
// FOSS: Code scanner functionality removed - Google ML Kit dependencies were removed
// If you need barcode scanning, use a frame processor with a FOSS-compatible library like ZXing
```

### 2. `package/android/src/main/java/com/mrousavy/camera/core/CodeScannerPipeline.kt`

**Before:** Used Google ML Kit's `BarcodeScanner`, `BarcodeScannerOptions`, `BarcodeScanning`, and `InputImage` classes.

**After:** Replaced with a **stub implementation** that:
- Accepts the same parameters for API compatibility
- Does nothing when `analyze()` is called (just closes the image)
- Logs a warning that code scanning is disabled in FOSS builds

### 3. `package/android/src/main/java/com/mrousavy/camera/core/types/CodeType.kt`

**Before:** Used `com.google.mlkit.vision.barcode.common.Barcode` constants like:
- `Barcode.FORMAT_QR_CODE`
- `Barcode.FORMAT_CODE_128`
- etc.

**After:** 
- Removed the Google import
- `toBarcodeType()` returns a simple integer (ordinal) instead of ML Kit constants
- `fromBarcodeType()` always returns `UNKNOWN` since we can't scan

### 4. `package/android/src/main/java/com/mrousavy/camera/core/CameraSession.kt`

**Changes:**
- Removed `import com.google.mlkit.vision.barcode.common.Barcode`
- Changed `Callback.onCodeScanned(codes: List<Barcode>, ...)` → `onCodeScanned(codes: List<Any>, ...)`

### 5. `package/android/src/main/java/com/mrousavy/camera/react/CameraView.kt`

**Changes:**
- Removed `import com.google.mlkit.vision.barcode.common.Barcode`
- Updated `onCodeScanned` override signature to use `List<Any>`

### 6. `package/android/src/main/java/com/mrousavy/camera/react/CameraView+Events.kt`

**Changes:**
- Removed `import com.google.mlkit.vision.barcode.common.Barcode`
- Removed `import com.mrousavy.camera.core.types.CodeType` (unused now)
- `invokeOnCodeScanned` now receives `List<Any>` and emits empty codes array

---

## ⚠️ What's NOT Available

### Code Scanner / QR Scanner

The built-in `codeScanner` prop is **disabled** in this FOSS version. If you try to use it:

```tsx
// This won't work in FOSS build - no barcodes will be detected
<Camera
  codeScanner={{
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      // codes will always be empty in FOSS build
    }
  }}
/>
```

### Alternative: Use a Frame Processor

If you need barcode scanning in a FOSS app, you can use a **Frame Processor** with a FOSS-compatible library like [ZXing](https://github.com/zxing/zxing):

```tsx
import { Camera, useFrameProcessor } from 'react-native-vision-camera';
// Use a frame processor plugin that wraps ZXing instead of ML Kit

const frameProcessor = useFrameProcessor((frame) => {
  'worklet';
  // Process frame with ZXing-based plugin
}, []);

<Camera frameProcessor={frameProcessor} />
```

---

## 📦 Installation

### For F-Droid / FOSS builds only

In your `package.json`:
```json
{
  "dependencies": {
    "react-native-vision-camera": "github:LuckyTheCookie/react-native-vision-camera-foss"
  }
}
```

### For conditional builds (Google Play + F-Droid)

If you need both Google Play (with ML Kit) and F-Droid (FOSS) builds, patch `package.json` in your prebuild script:

```bash
# In your fdroid-prebuild.sh
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.dependencies['react-native-vision-camera'] = 'github:LuckyTheCookie/react-native-vision-camera-foss';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
```

---

## ✅ What Still Works

Everything except code scanning:

- 📸 **Photo capture** - `takePhoto()`
- 🎬 **Video recording** - `startRecording()`, `stopRecording()`
- 🖼️ **Frame Processors** - Full worklets support
- 🔦 **Torch control** - `torch` prop
- 🔍 **Zoom** - `zoom` prop with gesture support
- 📱 **Multiple cameras** - Front/back switching
- 📐 **Format selection** - Resolution, FPS, HDR
- 🎯 **Focus** - `focus()` method
- 📍 **Location metadata** - EXIF GPS data
- 🔄 **Orientation** - Device rotation handling

---

## 🏗️ Building from Source

```bash
# Clone the repository
git clone https://github.com/LuckyTheCookie/react-native-vision-camera-foss.git
cd react-native-vision-camera-foss

# Install dependencies
bun install

# Build the package
cd package
bun run build
```

---

## 📄 License

This fork maintains the same **MIT License** as the original project.

Original project: [mrousavy/react-native-vision-camera](https://github.com/mrousavy/react-native-vision-camera)

---

## 🙏 Credits

- **Marc Rousavy** ([@mrousavy](https://github.com/mrousavy)) - Original VisionCamera creator
- **VisionCamera contributors** - Amazing camera library
- **F-Droid community** - For promoting FOSS software

---

## 📝 Changelog

### v4.7.3-foss (Based on v4.7.3)

- 🔥 Removed `com.google.mlkit:barcode-scanning` dependency
- 🔥 Removed `com.google.android.gms:play-services-mlkit-barcode-scanning` dependency
- ✏️ Stubbed `CodeScannerPipeline.kt` to no-op implementation
- ✏️ Removed Barcode type references from `CodeType.kt`
- ✏️ Updated callback signatures to use `List<Any>` instead of `List<Barcode>`
- 📄 Added FOSS documentation
