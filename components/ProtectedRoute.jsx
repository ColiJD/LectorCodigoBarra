// components/ProtectedRoute.js
import { useRouter } from "expo-router";
import { useAuth } from "../config/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";
import { Screen } from "./Screen";
import colors from "../styles/colors";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let timeout;

    if (!loading && !user) {
      timeout = setTimeout(() => {
        router.replace("/Login");
      }, 150); // ⏱️ Espera 800 milisegundos antes de redirigir
    }

    return () => clearTimeout(timeout); // Limpieza del timeout
  }, [user, loading]);

  if (loading || (!user && !loading)) {
    return (
      <Screen>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.white} />
          <Text style={styles.loadingText}>Redirigiendo...</Text>
        </View>
      </Screen>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.white, // texto negro
  },
});
