import React, { useState } from "react";
import { View, Text, Animated, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

// Componentes y hooks personalizados
import BarcodeScanner from "../components/BarcodeScanner";
import CartList from "../components/CartList";
import { Screen } from "../components/Screem";
import { useScannerAnimation } from "../hooks/useScannerAnimation";
import { useCameraPermission } from "../hooks/useCameraPermission";
import { playScanSound } from "../utils/soundService";

// Funciones reutilizables para el manejo del carrito
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToCart,
} from "../utils/cartUtils";
import { styledScanner, styledCart } from "../styles/styles";

export default function CartScreen() {
  // Evita múltiples escaneos
  const [scanned, setScanned] = useState(false);
  // Lista de productos en el carrito
  const [cart, setCart] = useState([]);

  const translateY = useScannerAnimation();
  const hasPermission = useCameraPermission();

  // Lógica para manejar escaneo de código de barras
  const handleBarcodeScanned = ({ data }) => {
    playScanSound(); // Reproduce sonido al escanear
    if (!scanned) {
      setScanned(true);
      addToCart(data, cart, setCart); // Agrega producto al carrito
      setTimeout(() => setScanned(false), 2000); // Evita escaneos rápidos
    }
  };
  // Si no se ha autorizado la cámara, muestra un mensaje
  if (hasPermission !== true) {
    return (
      <View style={styledScanner.center}>
        <Text>
          {hasPermission === null
            ? "Solicitando permiso de cámara..."
            : "Acceso a cámara denegado."}
        </Text>
      </View>
    );
  }
  // Calcula el total a pagar
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Screen style={styledScanner.container}>
      <View style={styledScanner.scanner}>
        <BarcodeScanner onScanned={handleBarcodeScanned} scanned={scanned} />
        <Animated.View
          style={[styledScanner.scannerLine, { transform: [{ translateY }] }]}
        />
      </View>

      <View style={styledScanner.container}>
        {cart.length > 0 && (
          <>
            <Text style={styledCart.totalText}>
              Total: L.{total.toFixed(2)}
            </Text>
            <TouchableOpacity
              onPress={() => clearCart(setCart)}
              style={styledCart.clearButton}
            >
              <MaterialIcons name="delete" size={30} color="white" />
            </TouchableOpacity>
          </>
        )}

        <CartList
          cart={cart}
          increaseQuantity={(code) => increaseQuantity(code, setCart)}
          decreaseQuantity={(code) => decreaseQuantity(code, setCart)}
        />
      </View>
    </Screen>
  );
}
