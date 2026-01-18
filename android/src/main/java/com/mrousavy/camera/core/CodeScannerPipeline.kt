package com.mrousavy.camera.core

import android.util.Log
import androidx.camera.core.ImageAnalysis.Analyzer
import androidx.camera.core.ImageProxy
import java.io.Closeable

/**
 * FOSS Version: CodeScannerPipeline stub
 * 
 * This is a placeholder implementation that does nothing.
 * Google ML Kit barcode scanning has been removed for F-Droid compliance.
 * 
 * If you need barcode scanning functionality, consider using a Frame Processor
 * with a FOSS-compatible library like ZXing.
 */
class CodeScannerPipeline(val configuration: CameraConfiguration.CodeScanner, val callback: CameraSession.Callback) :
  Closeable,
  Analyzer {
  companion object {
    private const val TAG = "CodeScannerPipeline"
  }

  init {
    Log.w(TAG, "CodeScanner is disabled in FOSS build - Google ML Kit has been removed for F-Droid compliance")
  }

  override fun analyze(imageProxy: ImageProxy) {
    // FOSS: No-op - ML Kit removed
    // Simply close the image to avoid memory leaks
    imageProxy.close()
  }

  override fun close() {
    // FOSS: No-op - nothing to close
  }
}
