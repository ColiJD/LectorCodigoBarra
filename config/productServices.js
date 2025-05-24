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
} from "../utils/validation";

const coleccion = "Clientes";
const subcoleccion  = "Productos"

export const saveProduct = async ({ uid, code, name, price }) => {
  validateFields({ code, name, price });
  await validateBarcode(code,uid);
  validatePrice(price);

  // Guardar en la subcolección 'productos' dentro de 'usuarios/{uid}'
  await addDoc(collection(db, coleccion, uid, subcoleccion ), {
    codigo: code,
    nombre: name,
    precio: parseFloat(price),
    creadoEn: new Date(),
  });
};

export const updateProduct = async ({ code, name, price,uid }) => {
  validateFields({ code, name, price });
  validatePrice(price);

  const productosRef = collection(db, coleccion, uid, subcoleccion );
  const q = query(productosRef, where("codigo", "==", code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("Producto no encontrado.");

  const docRef = snapshot.docs[0].ref;
  await updateDoc(docRef, {
    nombre: name,
    precio: parseFloat(price),
  });
};

export const deleteProduct = async (code,uid) => {
  if (!code) throw new Error("Código requerido.");

  const productosRef = collection(db, coleccion, uid, subcoleccion );
  const q = query(productosRef, where("codigo", "==", code));
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error("Producto no encontrado.");

  const docRef = snapshot.docs[0].ref;
  await deleteDoc(docRef);
};
// Función para obtener un producto por su código de barras
export const getProductByBarcode = async (code,uid) => {
  const productosRef = collection(db, coleccion, uid, subcoleccion );
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

// Verifica si un código ya existe en la colección "productos"
export const isBarcodeRegistered = async (codigo,uid) => {
  const productosRef = collection(db, coleccion, uid, subcoleccion );
  const q = query(productosRef, where("codigo", "==", codigo));

  const snapshot = await getDocs(q);
  return !snapshot.empty;
};

const validateBarcode = async (code,uid) => {
  const exists = await isBarcodeRegistered(code,uid);
  if (exists) {
    throw new Error("El código de barras ya existe en la base de datos.");
  }
};
