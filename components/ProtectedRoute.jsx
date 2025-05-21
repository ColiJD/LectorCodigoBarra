// components/ProtectedRoute.js
import { useRouter } from "expo-router";
import { useAuth } from "../config/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Screen } from "./Screen";
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/Login");
    }
  }, [user, loading]);

  if (loading || (!user && !loading)) {
    return (
      <Screen>
        <View>
          <ActivityIndicator size="large" />
        </View>
      </Screen>
    );
  }

  return children;
}
