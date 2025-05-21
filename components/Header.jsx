import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter, usePathname } from "expo-router";
import { StyledHeader } from "../styles/header";

const HeaderWithRightPanel = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path) => {
    setVisible(false);
    router.replace(path);
  };

  const getTitle = () => {
    switch (pathname) {
      case "/":
        return "Inicio";
      case "/ScannerScreen":
        return "Escanear Producto";
      case "/CartScreen":
        return "Realizar Venta";
      default:
        return "Scanner App";
    }
  };

  return (
    <>
      <View style={StyledHeader.header}>
        <Text style={StyledHeader.titles}>{getTitle()}</Text>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <MaterialIcons name="menu" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={StyledHeader.overlay}
          onPress={() => setVisible(false)}
        />
        <View style={StyledHeader.panel}>
          <Pressable style={StyledHeader.link} onPress={() => navigateTo("/")}>
            <MaterialIcons name="home" size={24} color="#FFF" />
            <Text style={StyledHeader.linkText}>Inicio</Text>
          </Pressable>

          <Pressable
            style={StyledHeader.link}
            onPress={() => navigateTo("/ScannerScreen")}
          >
            <MaterialIcons name="qr-code-scanner" size={24} color="#FFF" />
            <Text style={StyledHeader.linkText}>Escanear Producto</Text>
          </Pressable>

          <Pressable
            style={StyledHeader.link}
            onPress={() => navigateTo("/CartScreen")}
          >
            <MaterialIcons name="point-of-sale" size={24} color="#FFF" />
            <Text style={StyledHeader.linkText}>Realizar Venta</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
};

export default HeaderWithRightPanel;
