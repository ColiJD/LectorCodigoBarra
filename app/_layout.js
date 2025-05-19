import { Slot  } from "expo-router";
import { View, StyleSheet, StatusBar, Platform } from "react-native";
import Toast from "react-native-toast-message";
import Footer from "../components/Footer"; // Importa tu footer aquí

export default function RootLayout() {
  return (
   <>
      <View style={styles.container}>
        <HeaderWithRightPanel />
        <Slot /> 
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
