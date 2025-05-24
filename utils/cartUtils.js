import Toast from "react-native-toast-message";
import { getProductByBarcode } from "../config/productServices";

export const increaseQuantity = (code, setCart) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.code === code ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};
export const decreaseQuantity = (code, setCart) => {
  setCart((prevCart) => {
    let itemRemoved = null;

    const updatedCart = prevCart.map((item) => {
      if (item.code === code) {
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          itemRemoved = item; // Guardar para mostrar en el Toast
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    const finalCart = updatedCart.filter((item) => item.quantity > 0);

    if (itemRemoved) {
      Toast.show({
        type: "info",
        text1: "Producto eliminado",
        text2: `Se eliminó ${itemRemoved.code} del carrito.`,
        position: "bottom",
      });
    }

    return finalCart;
  });
};
export const clearCart = (setCart) => {
  setCart([]);
  Toast.show({
    type: "info",
    text1: "Carrito vacío",
  });
};

export const addToCart = async (barcode, cart, setCart,uid) => {
  try {
    const product = await getProductByBarcode(barcode,uid);
    if (!product) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Producto no encontrado.",
      });
      return;
    }

    const updatedCart = [...cart];
    const existing = updatedCart.find((item) => item.code === barcode);

    if (existing) {
      existing.quantity += 1;
    } else {
      updatedCart.push({
        code: barcode,
        name: product.nombre,
        price: product.precio,
        quantity: 1,
      });
    }

    setCart(updatedCart);

    Toast.show({
      type: "success",
      text1: "Producto agregado",
      text2: `${product.nombre} (${barcode})`,
    });
  } catch (error) {
    Toast.show({
      type: "error",
      text1: "Error",
      text2: error.message,
    });
  }
};
