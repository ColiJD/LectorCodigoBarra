import React from "react";
import { View, Text, Linking } from "react-native";
import CustomButton from "./Button"; // Asegúrate de que la ruta sea correcta
import { styledFooter } from "../styles/styles";
export default function Footer() {
  const handleTerms = () => {
    // Aquí puedes usar Linking si deseas abrir un enlace externo
    console.log("Términos presionado");
  };

  const handlePrivacy = () => {
    console.log("Privacidad presionado");
  };

  return (
    <View style={styledFooter.footer}>
      <Text style={styledFooter.text}>
        © 2025 ColiJD. Todos los derechos reservados.
      </Text>
      {/* <View style={styledFooter.buttons}>
        <CustomButton
          title="Términos"
          onPress={handleTerms}
          icon="description"
          color="#007AFF"
        />
        <CustomButton
          title="Privacidad"
          onPress={handlePrivacy}
          icon="lock"
          color="#007AFF"
        />
      </View> */}
    </View>
  );
}
