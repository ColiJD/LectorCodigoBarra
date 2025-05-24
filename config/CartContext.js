import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Cargar carrito desde AsyncStorage al iniciar
  useEffect(() => {
    const loadCart = async () => {
      try {
        const storedCart = await AsyncStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      }
    };
    loadCart();
  }, []);

  // Guardar carrito cada vez que cambia
  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart)).catch((error) =>
      console.error("Error al guardar carrito:", error)
    );
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
