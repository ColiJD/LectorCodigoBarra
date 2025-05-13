// Página principal del app, muestra un botón para ir al escáner
import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router"; // Hook para navegación
import styles from "../styles/styles";

export default function HomeScreen() {
  const router = useRouter(); // Accede a funciones de navegación

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Lector de Códigos</Text>
      {/* Navega a la pantalla del escáner */}
      <Button
        title="Iniciar escáner"
        onPress={() => router.push("/ScannerScreen")}
      />
      <Button
        title="Carrito"
        onPress={() => router.push("/CartScreen")}
        style={{ margin: 10 }}
      />
    </View>
  );
}
