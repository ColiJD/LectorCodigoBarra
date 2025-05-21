// services/authService.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

// ✅ Registro
export const registerUser = async (email, password) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);

  // Crear el documento en 'users/{uid}' con activo: true
  await setDoc(doc(db, "users", result.user.uid), {
    email: result.user.email,
    activo: true,
  });

  return result.user;
};

// ✅ Inicio de sesión
export const loginUser = async (email, password) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};
