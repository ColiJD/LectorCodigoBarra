import { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import {
  View,
  Text,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router"; // Hook de navegación
import { styledScanner } from "../styles/styles";
import Toast from "react-native-toast-message";

import BarcodeScanner from "../components/BarcodeScanner"; // Componente para el escáner de códigos
import ScannedForm from "../components/ScannedForm"; // Componente para el formulario de escaneo
import CustomButton from "../components/Button"; // Componente de botón personalizado
import { Screen } from "../components/Screen"; // Comp../components/Screen
import ProtectedRoute from "../components/ProtectedRoute";
import { useScannerAnimation } from "../hooks/useScannerAnimation";
import { useCameraPermission } from "../hooks/useCameraPermission";
import {
  saveProduct,
  updateProduct,
  deleteProduct,
} from "../config/productServices";
import { confirmDelete } from "../utils/alertHelpers";
import { useBarcodeHandler } from "../hooks/barcodeHandlers";
import { useKeyboardVisible } from "../hooks/useScannerAnimation";

export default function ScannerScreen() {
  const [scanned, setScanned] = useState(false); // Control de escaneo
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const user = auth.currentUser;

  const router = useRouter(); // Para volver a la pantalla anterior
  const translateY = useScannerAnimation(); // Hook para la animación del escáner
  const hasPermission = useCameraPermission();
  const keyboardVisible = useKeyboardVisible(); // Hook para detectar si el teclado está visible
  useEffect(() => {
    if (user == null) {
      router.replace("/Login");
    }
  }, [user]);

  if (user == null) {
    return null; // ⏳ o muestra un loading si prefieres
  }
  const handleBarcodeScanned = useBarcodeHandler({
    uid: user.uid,
    setCode,
    setName,
    setPrice,
    setScanned,
    onSuccess: (message) => {
      Toast.show({
        type: "success",
        text1: "Éxito",
        text2: message,
      });
    },
    onError: (message) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: message,
      });
    },
  });

  // Función para guardar el producto en la base de datos
  const handleSaveProduct = async () => {
    try {
      await saveProduct({ code, name, price, uid: user.uid });
      Toast.show({
        type: "success",
        text1: "Producto guardado",
        text2: "El producto fue almacenado exitosamente.",
      });
      resetForm();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al guardar",
        text2: error.message,
      });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      await updateProduct({ code, name, price, uid: user.uid });
      Toast.show({
        type: "success",
        text1: "Producto actualizado",
        text2: "El producto fue actualizado exitosamente.",
      });
      resetForm();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al actualizar",
        text2: error.message,
      });
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct(code, user.uid);
      Toast.show({
        type: "success",
        text1: "Producto eliminado",
        text2: "El producto fue eliminado exitosamente.",
      });
      resetForm();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error al eliminar",
        text2: error.message,
      });
    }
  };

  const resetForm = () => {
    setScanned(false);
    setCode("");
    setName("");
    setPrice("");
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

  return (
    <ProtectedRoute>
      <Screen>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1, width: "100%" }}
        >
          <View style={styledScanner.container}>
            <View style={styledScanner.scanner}>
              <BarcodeScanner
                scanned={scanned}
                onScanned={handleBarcodeScanned}
              />
              <Animated.View
                style={[
                  styledScanner.scannerLine,
                  { transform: [{ translateY }] },
                ]}
              />
            </View>

            {scanned && (
              <Text style={styledScanner.center}>Código escaneado</Text>
            )}

            <ScannedForm
              code={code}
              setCode={setCode}
              name={name}
              setName={setName}
              price={price}
              setPrice={setPrice}
            />

            {!keyboardVisible && (
              <View style={styledScanner.buttonGroup}>
                {(scanned || code.length > 0) && (
                  <>
                    <CustomButton
                      title="Guardar producto"
                      icon="save"
                      onPress={handleSaveProduct}
                      color="#4CAF50"
                    />
                    <CustomButton
                      title="Actualizar producto"
                      icon="edit"
                      onPress={handleUpdateProduct}
                      color="#2196F3"
                    />
                    <CustomButton
                      title="Eliminar producto"
                      icon="delete"
                      onPress={() => confirmDelete(handleDeleteProduct)}
                      color="#F44336"
                    />
                    <CustomButton
                      title="Escanear de nuevo"
                      icon="camera-alt"
                      onPress={resetForm}
                      color="#FF9800"
                    />
                  </>
                )}
                <CustomButton
                  title="Volver al inicio"
                  icon="arrow-back"
                  onPress={() => router.push("/")}
                  color="#9E9E9E"
                />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Screen>
    </ProtectedRoute>
  );
}
