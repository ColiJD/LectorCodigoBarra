import { db } from "../config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

// Verifica si un código ya existe en la colección "productos"
export const isBarcodeRegistered = async (codigo) => {
  const productosRef = collection(db, "productos");
  const q = query(productosRef, where("codigo", "==", codigo));

  const snapshot = await getDocs(q);
  return !snapshot.empty;
};
