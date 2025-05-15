import { View, StyleSheet } from "react-native";

export function Screen({ children }) {
  // Componente de pantalla que envuelve el contenido en un contenedor
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1F4765",
    alignItems: "center",
    width: "100%",
  },
});
