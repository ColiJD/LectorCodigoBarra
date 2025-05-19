import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { router } from "expo-router";
import { styledForm } from "../styles/styles";
import colors from "../styles/colors";
import CustomButton from "../components/Button";
import Toast from "react-native-toast-message";
import { Screen } from "../components/Screen";
import { handleRegister } from "../utils/validation";

export default function RegistroScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleBack = () => {
    router.push("/");
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
        />
        <View>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            style={styledForm.inputLabel}
            placeholderTextColor={colors.placeholder}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ position: "absolute", right: 25, bottom: 12 }}
          >
            <Text>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar Contraseña"
            style={styledForm.inputLabel}
            secureTextEntry={!showPassword}
          />
        </View>
      </View>
      <View style={{ width: "50%" }}>
        <CustomButton
          title="Registrarse"
          onPress={() =>
            handleRegister({
              email,
              password,
              confirmPassword,
              auth,
              db,
              router,
            })
          }
          icon="person-add"
          color={colors.access}
        />
        <CustomButton
          title="Regresar"
          onPress={handleBack}
          icon="arrow-back"
          color={colors.blue}
        />
      </View>
    </Screen>
  );
}
