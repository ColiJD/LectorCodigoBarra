// screens/LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { registerUser,loginUser} from "../config/authService";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      const user = await registerUser(email, password);
      setMessage(`Registrado como: ${user.email}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const user = await loginUser(email, password);
      setMessage(`Bienvenido: ${user.email}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput placeholder="Contraseña" secureTextEntry onChangeText={setPassword} value={password} />

      <Button title="Iniciar sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={handleRegister} />

      <Text>{message}</Text>
    </View>
  );
}
