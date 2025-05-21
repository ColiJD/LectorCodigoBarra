import { Stack } from "expo-router";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Footer from "../components/Footer"; // Importa tu footer aquí

export default function RootLayout() {
  return (
    <>
 
      {/* Contenedor principal */}
      <View style={styles.container}>
        <Stack
          screenOptions={{
            header: () => <HeaderWithRightPanel />,
          }}
        />
      </View>
      <Footer />
      <Toast />
    </>
  );
}

// Importa tu header personalizado aquí
import HeaderWithRightPanel from "../components/Header";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
