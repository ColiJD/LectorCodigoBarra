// Archivo que contiene todos los estilos reutilizables
import { StyleSheet } from "react-native";
import colors from "./colors";

export const styledprincipal = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  containerLogo: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blueDark,
  },
  containerBox: {
    borderColor: colors.white,
    borderWidth: 1,
    width: 250,
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100, // mitad del ancho y alto
    backgroundColor: colors.black, // opcional, para que se vea mejor
    borderWidth: 5,
  },
  texto: {
    fontSize: 100,
    color: colors.white,
    fontWeight: "bold",
    fontStyle: "italic",
  },
});

export const styledFooter = StyleSheet.create({
  footer: {
    width: "100%",
    padding: 16,
    alignItems: "center",
    backgroundColor: colors.blueDark,
  },
  text: {
    color: "#fff",
  },
  buttons: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "80%",
  },
});

export const styledScanner = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.blueDark,
    position: "relative",
  },
  center: {
    color: colors.white,
    alignSelf: "center",
    fontSize: 14,
    padding: 10,
    fontWeight: "bold",
    borderBottomColor: colors.blueDark,
    borderBottomWidth: 1,
  },
  scanner: {
    backgroundColor: "#FFF",
    width: "100%",
    height: 100,
    position: "relative",
  },
  scannerLine: {
    backgroundColor: "green",
    width: "100%",
    height: 5,
    position: "absolute",
    top: 0,
    left: 0,
  },
  buttonGroup: {
    position: "absolute", // Superpuesto
    bottom: 10,
    alignSelf: "center",
    gap: 0.1,
  },
});

export const styledForm = StyleSheet.create({
  container: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
    padding: 10,
    backgroundColor: colors.blueDark,
    gap: 10,
  },
  inputLabel: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: colors.black,
    borderWidth: 1,
    borderColor: colors.white,
  },
});

export const styledCart = StyleSheet.create({
  totalText: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 5,
    padding: 10,
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: colors.white,
  },
  clearButton: {
    position: "absolute",
    bottom: 10,
    left: 30,
  },
  cartItem: {
    margin: 5,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Text: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
  },
});

export const styles = StyleSheet.create({
  container: {},
  center: {
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
  scannerLine: {
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
  cartItem: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 5,
    gap: 10,
  },
  qtyButton: {
    fontSize: 20,
    backgroundColor: "#007AFF",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    textAlign: "center",
    overflow: "hidden",
  },
  totalText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "#FF3B30",
    color: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  cartContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
});
