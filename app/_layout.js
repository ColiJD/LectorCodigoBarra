import { Stack } from "expo-router";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Footer from "../components/Footer";
import HeaderWithRightPanel from "../components/Header";
import { AuthProvider } from "../config/AuthContext"; // Asegúrate de que la ruta es correcta
import { CartProvider } from "../config/CartContext";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <SafeAreaView style={styles.container}>
            <Stack
              screenOptions={{
                header: () => <HeaderWithRightPanel />,
              }}
            />
            <Footer />
            <Toast />
          </SafeAreaView>
          <StatusBar />
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
