import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { auth, db } from "../config/firebaseConfig";
import { router } from "expo-router";
import { styledForm } from "../styles/styles";
import colors from "../styles/colors";
import CustomButton from "../components/Button";
import { Screen } from "../components/Screen";
import { handleRegister } from "../utils/validacionesLogin.js";

export default function RegistroScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
          placeholderTextColor={colors.placeholder}
        />

        <View style={{ marginTop: 16 }}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Contraseña"
            style={[styledForm.inputLabel, { color: "#000" }]}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor={colors.placeholder}
          />
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ position: "absolute", right: 25, top: 12 }}
          >
            <Text>{showPassword ? "🙈" : "👁️"}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16 }}>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirmar Contraseña"
            style={[styledForm.inputLabel, { color: "#000" }]}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            placeholderTextColor={colors.placeholder}
          />
        </View>
      </View>

      <View style={{ width: "50%", marginTop: 24 }}>
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
