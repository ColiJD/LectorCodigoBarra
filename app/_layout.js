import { Stack } from "expo-router";
import { View, SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HeaderWithRightPanel from "../components/Header";
import Footer from "../components/Footer"; // Asegúrate de que la ruta sea correcta

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Ajuste para evitar que el contenido quede debajo del StatusBar en Android */}
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content" // o "dark-content" según tu fondo
          backgroundColor="#1e3a5f" // cambia al color de tu header si es otro
          translucent={false}
        />

        <View style={styles.inner}>
          <HeaderWithRightPanel />

          <View style={styles.content}>
            <Stack
              screenOptions={{
                headerShown: false,
              }}
            />
          </View>

          <Footer />
        </View>

        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e3a5f", // mismo fondo que tu header si aplica
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inner: {
    flex: 1,
    backgroundColor: "#ffffff", // o el fondo de tu app debajo del header
  },
  content: {
    flex: 1,
  },
});
