import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { Screen } from "../components/Screen";
import { styledForm } from "../styles/styles";
import colors from "../styles/colors.js";
import CustomButton from "../components/Button";
import {
  validateBlank,
  isValidEmail,
  isValidPassword,
  showError,
} from "../utils/validacionesLogin.js";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Validaciones básicas
    if (!validateBlank({ email, password })) return;

    if (!isValidEmail(email)) {
      showError("Correo inválido", "Ingresa un correo electrónico válido.");
      return;
    }

    if (!isValidPassword(password)) {
      showError(
        "Contraseña insegura",
        "Debe tener al menos 8 caracteres y una mayúscula."
      );
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Verificar si el usuario está activo en Firestore
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists() || !userDoc.data()?.activo) {
        await signOut(auth);
        showError("Cuenta deshabilitada", "Contacta con soporte técnico.");
        return;
      }

      // Redirigir si todo está correcto
      router.replace("/");
    } catch (err) {
      console.error("Login error:", err);
      showError("Error al iniciar sesión", "Correo o contraseña incorrectos.");
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  const handleGoToRegister = () => {
    router.push("/RegistroScreen");
  };

  return (
    <Screen>
      <View style={[styledForm.container, { position: "relative" }]}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="correo@example.com"
          style={styledForm.inputLabel}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor={colors.placeholder}
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Contraseña"
          style={styledForm.inputLabel}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          placeholderTextColor={colors.placeholder}
        />

        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={{ position: "absolute", right: 25, bottom: 25 }}
        >
          <Text style={{ color: "#000" }}>{showPassword ? "🙈" : "👁️"}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "50%" }}>
        <CustomButton
          title="Iniciar sesión"
          icon="person"
          onPress={handleLogin}
          color={colors.access}
        />
        <CustomButton
          title="Regístrate"
          icon="person-add"
          onPress={handleGoToRegister}
          color={colors.blue}
        />
        <CustomButton
          title="Regresar"
          icon="arrow-back"
          onPress={handleBack}
          color={colors.blue}
        />
      </View>
    </Screen>
  );
}
