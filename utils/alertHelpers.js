import { Alert } from "react-native";

/**
 * Muestra una alerta de confirmación antes de ejecutar una acción destructiva.
 * @param {Function} onConfirm - Función que se ejecuta si el usuario confirma.
 */
export const confirmDelete = (onConfirm) => {
  Alert.alert(
    "Eliminar producto",
    "¿Estás seguro de que deseas eliminar este producto?",
    [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: onConfirm,
        style: "destructive",
      },
    ],
    { cancelable: false }
  );
};
