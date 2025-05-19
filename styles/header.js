import { StyleSheet, Platform, StatusBar } from "react-native";
import colors from "./colors";

export const StyledHeader = StyleSheet.create({
  safeArea: {
    backgroundColor: colors.blueDark,
  },
  header: {
    
    padding: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blueDark,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    height: 80, // <-- altura fija
    paddingHorizontal: 16,
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
    top: 0, // cambio para que el panel quede pegado al top
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
    backgroundColor: "transparent",
    gap: 6,
  },

  linkText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "500",
  },
});
