// Archivo que contiene todos los estilos reutilizables
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff",
    padding: 20,
  },
  scanner: {
    backgroundColor: "blue",
    width: "100%",
    height: "200",
    position: "relative",
  },
  scannerLine:{
    backgroundColor: "green",
    width: "100%",
    height: 5,
    position: "absolute",
    top: 10,
    left: 0,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  buttonGroup: {
    position: "absolute", // Superpuesto
    bottom: 40,
    alignSelf: "center",
    gap: 10, // Espacio entre botones (requiere React Native >= 0.71)
  },
});
