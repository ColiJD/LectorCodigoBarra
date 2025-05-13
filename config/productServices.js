// config/productServices.js

import { db } from "./firebaseConfig";
import {
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  validateFields,
  validatePrice,
  validateBarcode,
  validateConnection,
} from "../utils/validation";

export const saveProduct = async ({ code, name, price }) => {
  validateFields({ code, name, price });
  await validateBarcode(code);
  validatePrice(price);


  await addDoc(collection(db, "productos"), {
    codigo: code,
    nombre: name,
    precio: parseFloat(price),
    creadoEn: new Date(),
  });
};

export const updateProduct = async ({ code, name, price }) => {
  validateFields({ code, name, price });
  validatePrice(price);


  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("codigo", "==", code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("Producto no encontrado.");

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, {
    nombre: name,
    precio: parseFloat(price),
  });
};

export const deleteProduct = async (code) => {
  if (!code) throw new Error("Código requerido.");

  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("codigo", "==", code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("Producto no encontrado.");

  const docRef = snapshot.docs[0].ref;
  await deleteDoc(docRef);
};
// Función para obtener un producto por su código de barras
export const getProductByBarcode = async (code) => {
  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("codigo", "==", code));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    const productDoc = snapshot.docs[0].data();
    return {
      nombre: productDoc.nombre,
      precio: productDoc.precio,
    };
  }

  return null; // Si no se encuentra el producto
};