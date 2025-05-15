import { Stack } from "expo-router";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import HeaderWithRightPanel from "../components/Header";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      {/* Contenedor general con color de fondo y padding seguro para Android */}
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#1e3a5f"
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
    backgroundColor: "#1e3a5f", // fondo igual al del header
  },
  inner: {
    flex: 1,
    backgroundColor: "#ffffff", // fondo principal de la app
  },
  content: {
    flex: 1,
  },
});
