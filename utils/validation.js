// utils/validation.js
import {isBarcodeRegistered} from "./firebaseHelpers";
export const validateFields = ({ code, name, price }) => {
  if (!code || !name || !price) {
    throw new Error("Por favor, completa todos los campos.");
  }
};

export const validatePrice = (price) => {
  if (isNaN(price) || parseFloat(price) <= 0) {
    throw new Error("Por favor, ingresa un precio válido.");
  }
};

export const validateBarcode = async (code) => {
  const exists = await isBarcodeRegistered(code);
  if (exists) {
    throw new Error("El código de barras ya existe en la base de datos.");
  }
};

export const validateConnection = () => {
  if (!navigator.onLine) {
    throw new Error("No hay conexión a internet.");
  }
};
