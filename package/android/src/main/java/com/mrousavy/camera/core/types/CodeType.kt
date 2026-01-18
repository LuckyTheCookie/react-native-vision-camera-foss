package com.mrousavy.camera.core.types

// FOSS: Removed ML Kit import
import com.mrousavy.camera.core.CodeTypeNotSupportedError
import com.mrousavy.camera.core.InvalidTypeScriptUnionError

enum class CodeType(override val unionValue: String) : JSUnionValue {
  CODE_128("code-128"),
  CODE_39("code-39"),
  CODE_93("code-93"),
  CODABAR("codabar"),
  EAN_13("ean-13"),
  EAN_8("ean-8"),
  ITF("itf"),
  UPC_E("upc-e"),
  UPC_A("upc-a"),
  QR("qr"),
  PDF_417("pdf-417"),
  AZTEC("aztec"),
  DATA_MATRIX("data-matrix"),
  UNKNOWN("unknown");

  // FOSS: Returns ordinal instead of ML Kit constants
  fun toBarcodeType(): Int = ordinal

  companion object : JSUnionValue.Companion<CodeType> {
    // FOSS: Returns UNKNOWN since scanning is disabled
    fun fromBarcodeType(barcodeType: Int): CodeType = UNKNOWN

    override fun fromUnionValue(unionValue: String?): CodeType =
      when (unionValue) {
        "code-128" -> CODE_128
        "code-39" -> CODE_39
        "code-93" -> CODE_93
        "codabar" -> CODABAR
        "ean-13" -> EAN_13
        "ean-8" -> EAN_8
        "itf" -> ITF
        "upc-e" -> UPC_E
        "upc-a" -> UPC_A
        "qr" -> QR
        "pdf-417" -> PDF_417
        "aztec" -> AZTEC
        "data-matrix" -> DATA_MATRIX
        else -> throw InvalidTypeScriptUnionError("codeType", unionValue ?: "(null)")
      }
  }
}
