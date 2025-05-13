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
