// hooks/useBarcodeHandler.js
import { useCallback } from "react";
import { playScanSound } from "../utils/soundService";
import { getProductByBarcode } from "../config/productServices";

export const useBarcodeHandler = ({
  setCode,
  setName,
  setPrice,
  setScanned,
  onSuccess = () => {}, // Función opcional
  onError = () => {}, // Función opcional
}) => {
  const handleBarcodeScanned = useCallback(
    async ({ type, data }) => {
      setScanned(true);
      setCode(data);
      console.log("Código detectado:", type, data);

      try {
        await playScanSound(); // Reproducir el sonido al escanear
        const existingProduct = await getProductByBarcode(data); // Buscar en DB
        if (existingProduct) {
          setName(existingProduct.nombre);
          setPrice(existingProduct.precio.toString());
          onSuccess("Producto encontrado, los campos se han autocompletado.");
        } else {
          // Si no se encuentra el producto, limpiar los campos
          setName("");
          setPrice("");
          onSuccess("Codigo escaneado, pero no se encontró el producto.");
        }
      } catch (error) {
        onError("Error al obtener el producto: " + error.message);
      }
    },
    [setScanned, setCode, setName, setPrice, onSuccess, onError]
  );

  return handleBarcodeScanned;
};
