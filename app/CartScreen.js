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
import { Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import { auth, db } from "../config/firebaseConfig";
import BarcodeScanner from "../components/BarcodeScanner";
import CartList from "../components/CartList";
import { Screen } from "../components/Screen";
import { useScannerAnimation } from "../hooks/useScannerAnimation";
import { useCameraPermission } from "../hooks/useCameraPermission";
import { playScanSound } from "../utils/soundService";
import ProtectedRoute from "../components/ProtectedRoute";
import { useCart } from "../config/CartContext";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  addToCart,
} from "../utils/cartUtils";
import { styledScanner, styledCart } from "../styles/styles";
import * as Print from "expo-print";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const [scanned, setScanned] = useState(false);
  const { cart, setCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [customPrice, setCustomPrice] = useState("");
  const [salesHistory, setSalesHistory] = useState([]); // <-- historial de ventas
  const [historyModalVisible, setHistoryModalVisible] = useState(false); // modal para ver historial

  const translateY = useScannerAnimation();
  const hasPermission = useCameraPermission();
  const [confirmClearModalVisible, setConfirmClearModalVisible] =
    useState(false);
  const user = auth.currentUser;
  const router = useRouter();

  const handleAddManualProduct = () => {
    const price = parseFloat(customPrice);
    if (isNaN(price) || price <= 0) return;

    const newItem = {
      code: uuid.v4(),
      name: "Producto sin código",
      price,
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
    setModalVisible(false);
    setCustomPrice("");
  };

  const handleBarcodeScanned = async ({ data }) => {
    playScanSound();
    if (!scanned) {
      setScanned(true);
      await addToCart(data, cart, setCart, user.uid);
      setTimeout(() => setScanned(false), 2000);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Función para guardar la venta al realizar la compra
  const handleCompletePurchase = async () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Usuario no autenticado",
        text2: "Inicia sesión para registrar una venta.",
      });
      return;
    }
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    const fechaActual = new Date();
    const newSale = {
      code: uuid.v4(),
      date: Timestamp.fromDate(fechaActual), // mejor formato para Firestore
      userId: user.uid,
      items: cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        code: item.code,
      })),
      total,
    };

    try {
      // GUARDAR EN FIRESTORE
      await addDoc(collection(db, "venta"), newSale);

      Alert.alert(
        "Compra exitosa",
        "¿Desea imprimir la factura?",
        [
          {
            text: "No",
            onPress: () => clearCart(setCart),
            style: "cancel",
          },
          {
            text: "Sí",
            onPress: () => handleExportPDF(),
          },
        ],
        { cancelable: false }
      );
      clearCart(setCart);
    } catch (error) {
      console.error("Error al guardar la venta:", error);
      alert("Ocurrió un error al guardar la venta.");
    }
  };

  const handleExportPDF = async () => {
    if (cart.length === 0) {
      alert("No hay productos en el carrito.");
      return;
    }

    const fechaActual = new Date();
    const fechaFormateada = fechaActual.toLocaleDateString("es-HN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const horaFormateada = fechaActual.toLocaleTimeString("es-HN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1, h2 { text-align: center; margin: 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
            th { background-color: #f2f2f2; }
            tfoot { font-weight: bold; }
            .meta { text-align: center; margin-top: 10px; }
          </style>
        </head>
        <body>
          <h1>Resumen de Venta</h1>
          <div class="meta">
            <h2>Fecha: ${fechaFormateada} &nbsp;&nbsp;&nbsp; Hora: ${horaFormateada}</h2>
          </div>
          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${cart
                .map(
                  (item) => `
                    <tr>
                      <td>${item.name}</td>
                      <td>L.${item.price.toFixed(2)}</td>
                      <td>${item.quantity}</td>
                      <td>L.${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3">Total</td>
                <td>L.${total.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `;

    try {
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

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
        {/* Botón para agregar producto manual */}
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
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Producto Sin Codigo
          </Text>
        </TouchableOpacity>

        {/* NUEVO: Botón para realizar venta */}
        <TouchableOpacity
          onPress={handleCompletePurchase}
          style={{
            position: "absolute",
            bottom: 30,
            left: 30,
            backgroundColor: "#008CBA",
            padding: 15,
            borderRadius: 50,
            elevation: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Realizar venta
          </Text>
        </TouchableOpacity>

        {/* NUEVO: Botón para ver historial de ventas */}
        <TouchableOpacity
          onPress={() => router.push("/Historial")}
          style={{
            position: "absolute",
            bottom: 100,
            left: 30,
            backgroundColor: "#6a1b9a",
            padding: 15,
            borderRadius: 50,
            elevation: 5,
          }}
        >
          <MaterialIcons name="history" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Modal para agregar producto manual */}
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

        {/* Modal para confirmar vaciar carrito */}
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
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: "white",
                    }}
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
