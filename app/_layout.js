import { Stack } from "expo-router";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import HeaderWithRightPanel from "../components/Header";
import Footer from "../components/Footer"; // Asegúrate de que la ruta sea correcta
export default function RootLayout() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithRightPanel />

      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false, // ya mostraste el header personalizado
          }}
        />
      </View>
      <Footer />
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // ocupa todo el espacio disponible entre header y footer
  },
});
