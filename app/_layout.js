import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Footer from "../components/Footer";
import HeaderWithRightPanel from "../components/Header";
import { AuthProvider } from "../config/AuthContext";

function RootLayoutContent() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          header: () => <HeaderWithRightPanel />,
        }}
      />
      <Footer />
      <Toast />
    </View>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <RootLayoutContent />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
