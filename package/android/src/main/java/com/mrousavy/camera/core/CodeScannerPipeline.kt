package com.mrousavy.camera.core
import android.media.Image
import android.util.Log

class CodeScannerPipeline {
    companion object { private const val TAG = "CodeScannerPipeline" }
    fun analyze(image: Image, rotation: Int) {
        Log.w(TAG, "FOSS: Code scanning disabled")
        image.close()
    }
}
