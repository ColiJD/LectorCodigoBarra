// HomeScreen.js
import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { Screen } from "../components/Screen";
import CustomButton from "../components/Button";
import { styledprincipal } from "../styles/styles";
import { MaterialIcons } from "@expo/vector-icons";
export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <View style={styledprincipal.container}>
        <CustomButton
          title="Escanear Producto"
          icon="qr-code-scanner"
          onPress={() => router.push("/ScannerScreen")}
        />
        <CustomButton
          title="Realizar Venta"
          icon="shopping-cart"
          color="#28a745"
          onPress={() => router.push("/CartScreen")}
        />
        <CustomButton
          title="Login"
          icon="add"
          color="#ccc"
          onPress={() => router.push("/Login")}
        />
      </View>
      <View style={styledprincipal.containerLogo}>
        <View style={styledprincipal.containerBox}>
          <MaterialIcons name="qr-code-scanner" size={150} color="white" />
        </View>
      </View>
    </Screen>
  );
}
