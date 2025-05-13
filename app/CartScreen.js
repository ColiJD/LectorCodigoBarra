import React, { useState } from "react";
import { View, Text, Animated } from "react-native";

// Componentes y hooks personalizados
import BarcodeScanner from "../components/BarcodeScanner";
import CartList from "../components/CartList";
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
import styles from "../styles/styles";

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
      <View style={styles.center}>
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
    <View style={styles.container}>
      <Text style={styles.title}>Escáner de Códigos de Barras</Text>
      <View style={styles.scanner}>
        <BarcodeScanner onScanned={handleBarcodeScanned} scanned={scanned} />
        <Animated.View
          style={[styles.scannerLine, { transform: [{ translateY }] }]}
        />
      </View>

      <View style={styles.cartContainer}>
        {cart.length > 0 && (
          <>
            <Text style={styles.totalText}>Total: L.{total.toFixed(2)}</Text>
            <Text onPress={() => clearCart(setCart)} style={styles.clearButton}>
              Vaciar Carrito 🗑️
            </Text>
          </>
        )}

        <Text style={styles.title}>Carrito:</Text>
        <CartList
          cart={cart}
          increaseQuantity={(code) => increaseQuantity(code, setCart)}
          decreaseQuantity={(code) => decreaseQuantity(code, setCart)}
        />
      </View>
    </View>
  );
}
