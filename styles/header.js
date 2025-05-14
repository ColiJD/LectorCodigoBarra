import { StyleSheet } from "react-native";
import colors from "./colors";

export const StyledHeader = StyleSheet.create({
  header: {
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blueDark,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  titles: {
    color: colors.white,
    fontSize: 25,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  panel: {
    position: "absolute",
    top: 70,
    right: 0,
    width: 250,
    height: "100%",
    backgroundColor: colors.blueDark,
    paddingTop: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "transparent", // o un hover/color dinámico
    gap: 6, // si tu versión de React Native lo soporta, reemplaza marginLeft
  },

  linkText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
  },
});
