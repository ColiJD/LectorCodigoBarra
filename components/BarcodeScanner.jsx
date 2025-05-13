import React from "react";
import { CameraView } from "expo-camera";
import { StyleSheet } from "react-native";

export default function BarcodeScanner({ onScanned, scanned }) {
  return (
    <CameraView
      onBarcodeScanned={scanned ? undefined : onScanned}
      barcodeScannerSettings={{
        barcodeTypes: [
          "qr",
          "pdf417",
          "ean13",
          "code128",
          "code39",
          "datamatrix",
          "upc_a",
        ],
      }}
      style={StyleSheet.absoluteFillObject}
    />
  );
}
