import React from "react";
import { View, Text } from "react-native";

import BarcodeScanner from "../components/BarcodeScanner";

export default function CartScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Carrito de Compras</Text>
    </View>
  );
}
