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
  setCart((prevCart) =>
    prevCart
      .map((item) =>
        item.code === code
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

export const clearCart = (setCart) => {
  setCart([]);
  Toast.show({
    type: "info",
    text1: "Carrito vacío",
  });
};

export const addToCart = async (barcode, cart, setCart) => {
  try {
    const product = await getProductByBarcode(barcode);
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
