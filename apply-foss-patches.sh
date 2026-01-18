#!/bin/bash
set -e

cd /home/lulu/Documents/code/react-native-vision-camera-foss/package/android/src/main/java/com/mrousavy/camera

echo "🔧 Patching CodeType.kt..."
# Remplace toute la fonction toBarcodeType
sed -i '/fun toBarcodeType/,/}/c\  \/\/ FOSS: Returns ordinal instead of ML Kit constants\n  fun toBarcodeType(): Int = ordinal' core/types/CodeType.kt

# Remplace toute la fonction fromBarcodeType  
sed -i '/fun fromBarcodeType/,/}/c\    \/\/ FOSS: Returns UNKNOWN since scanning is disabled\n    fun fromBarcodeType(barcodeType: Int): CodeType = UNKNOWN' core/types/CodeType.kt

echo "🔧 Patching CameraSession.kt..."
# Change List<Barcode> en List<Any>
sed -i 's/codes: List<Barcode>/codes: List<Any>/g' core/CameraSession.kt

echo "🔧 Patching CameraView+Events.kt..."
# Supprime import CodeType
sed -i '/import com\.mrousavy\.camera\.core\.types\.CodeType/d' react/CameraView+Events.kt
# Change signature
sed -i 's/barcodes: List<Barcode>/barcodes: List<Any>/g' react/CameraView+Events.kt
# Remplace toute la logique de forEach par un commentaire
sed -i '/barcodes\.forEach.*{/,/^  }/c\  \/\/ FOSS: barcodes list will always be empty (ML Kit removed)' react/CameraView+Events.kt

echo "🔧 Patching CameraView.kt..."
# Change signature
sed -i 's/codes: List<Barcode>/codes: List<Any>/g' react/CameraView.kt

echo "✅ All patches applied!"
