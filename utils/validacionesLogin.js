import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import Toast from "react-native-toast-message";
// utils/validations.js
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password) => {
  // Mínimo 8 caracteres, al menos una mayúscula
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
};

export const validateBlank = (fields) => {
  const emptyFields = Object.entries(fields)
    .filter(([key, value]) => !value.trim()) // campos vacíos o solo espacios
    .map(([key]) => key);

  if (emptyFields.length > 0) {
    showError("Campos incompletos", `Campos vacios: ${emptyFields.join(", ")}`);
    return false;
  }
  return true;
};

export const handleRegister = async ({
  email,
  password,
  confirmPassword,
  auth,
  db,
  router,
}) => {
  // Validar campos vacíos dinámicamente
  if (!validateBlank({ email, password, confirmPassword })) return;
  if (!isValidEmail(email)) {
    showError("Correo inválido", "Ingresa un correo electrónico válido.");
    return;
  }
  if (!isValidPassword(password)) {
    showError(
      "Contraseña insegura",
      "Debe tener al menos 8 caracteres y una mayúscula."
    );
    return;
  }

  if (password !== confirmPassword) {
    showError(
      "Contraseñas no coinciden",
      "Verifica que ambas contraseñas sean iguales."
    );
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const uid = userCredential.user.uid;

    await setDoc(doc(db, "users", uid), {
      email,
      activo: false,
      creado: new Date(),
    });

    Toast.show({
      type: "success",
      text1: "Registro exitoso",
      text2: "Tu cuenta fue creada. Espera aprobación.",
    });
    router.replace("/");
  } catch (err) {
    console.error(err);
    showError("Error al crear la cuenta", "¿Ya estás registrado?");
  }
};

export const showError = (title, message) => {
  Toast.show({ type: "error", text1: title, text2: message });
};
