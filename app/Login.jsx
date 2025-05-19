import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { router } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { Screen } from "../components/Screen";
import { styledForm } from "../styles/styles";
import colors from "../styles/colors";
import CustomButton from "../components/Button";

import {
  validateBlank,
  isValidEmail,
  isValidPassword,
  showError,
} from "../utils/validation";
export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      // Verificar si el usuario está activo en Firestore
      const userDoc = await getDoc(doc(db, "users", uid));
      const userData = userDoc.data();

      if (!userDoc.exists() || !userData?.activo) {
        await signOut(auth);
        showError("Cuenta deshabilitada", "Contacta con soporte tecnico.");
        return;
      }
      router.replace("/");
    } catch (err) {
      console.error(err);
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
        />

        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="••••••••"
          style={styledForm.inputLabel}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          onPress={() => setShowPassword((prev) => !prev)}
          style={{ position: "absolute", right: 25, bottom: 25 }}
        >
          <Text>{showPassword ? "🙈" : "👁️"}</Text>
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
