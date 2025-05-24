import React, { useState } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid"; // Asegúrate de instalar esta librería
import { auth } from "../config/firebaseConfig";
// Componentes y hooks personalizados
import BarcodeScanner from "../components/BarcodeScanner";
import CartList from "../components/CartList";
import { Screen } from "../components/Screen";
import { useScannerAnimation } from "../hooks/useScannerAnimation";
import { useCameraPermission } from "../hooks/useCameraPermission";
import { playScanSound } from "../utils/soundService";
import ProtectedRoute from "../components/ProtectedRoute";
import { useCart } from "../config/CartContext";

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
  const { cart, setCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [customPrice, setCustomPrice] = useState("");
  const translateY = useScannerAnimation();
  const hasPermission = useCameraPermission();
  // NUEVO estado
  const [confirmClearModalVisible, setConfirmClearModalVisible] =
    useState(false);
  const user = auth.currentUser;
  const handleAddManualProduct = () => {
    const price = parseFloat(customPrice);
    if (isNaN(price) || price <= 0) return;

    const newItem = {
      code: uuid.v4(), // ID único
      name: "Producto sin código",
      price,
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
    setModalVisible(false);
    setCustomPrice("");
  };

  // Lógica para manejar escaneo de código de barras
  const handleBarcodeScanned = async ({ data }) => {
    playScanSound(); // Reproduce sonido al escanear
    if (!scanned) {
      setScanned(true);
      await addToCart(data, cart, setCart, user.uid); // Agrega producto al carrito
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
    <ProtectedRoute>
      <Screen style={styledScanner.container}>
        <View style={[styledScanner.scanner, { position: "relative" }]}>
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
              {/* Botón para mostrar el modal de confirmación */}
              <TouchableOpacity
                disabled={cart.length < 1}
                onPress={() => setConfirmClearModalVisible(true)}
                style={{
                  position: "absolute",
                  top: 20,
                  left: 10,
                  backgroundColor: "red",
                  padding: 10,
                  borderRadius: 50,
                }}
              >
                <MaterialIcons name="delete" size={15} color="white" />
              </TouchableOpacity>
            </>
          )}
          <ScrollView>
            <CartList
              cart={cart}
              increaseQuantity={(code) => increaseQuantity(code, setCart)}
              decreaseQuantity={(code) => decreaseQuantity(code, setCart)}
            />
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            position: "absolute",
            bottom: 30,
            right: 30,
            backgroundColor: "#2196F3",
            padding: 15,
            borderRadius: 50,
            elevation: 5,
          }}
        >
          <MaterialIcons name="add" size={28} color="#fff" />
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Ingrese el precio:
              </Text>
              <TextInput
                placeholder="Precio"
                placeholderTextColor="grey"
                keyboardType="numeric"
                value={customPrice}
                onChangeText={setCustomPrice}
                style={{
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  padding: 10,
                  marginBottom: 15,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={{
                    flex: 1,
                    backgroundColor: "#ccc",
                    paddingVertical: 10,
                    marginRight: 10,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAddManualProduct}
                  style={{
                    flex: 1,
                    backgroundColor: "#2196F3",
                    paddingVertical: 10,
                    marginLeft: 10,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}
                  >
                    Agregar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        {/* Modal de confirmación para vaciar el carrito */}
        <Modal
          visible={confirmClearModalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setConfirmClearModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                width: "80%",
              }}
            >
              <Text style={{ fontSize: 18, marginBottom: 10 }}>
                ¿Deseas vaciar el carrito?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => setConfirmClearModalVisible(false)}
                  style={{
                    flex: 1,
                    backgroundColor: "#ccc",
                    paddingVertical: 10,
                    marginRight: 10,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    clearCart(setCart);
                    setConfirmClearModalVisible(false);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: "#f44336",
                    paddingVertical: 10,
                    marginLeft: 10,
                    borderRadius: 5,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", color: "white" }}
                  >
                    Vaciar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </Screen>
    </ProtectedRoute>
  );
}
