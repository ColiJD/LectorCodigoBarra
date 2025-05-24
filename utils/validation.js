// utils/validation.js
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

