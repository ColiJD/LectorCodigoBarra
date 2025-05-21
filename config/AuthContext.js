import React, { useState, useEffect, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig"; // Asegúrate de que la ruta es correcta
import { View, ActivityIndicator } from "react-native";

// 🔄 Nombre en PascalCase
export const AuthContext = createContext({});

// 🌐 Proveedor de contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ⏳ Mostrar pantalla de carga mientras se verifica el auth
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ user, loading: false, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);
