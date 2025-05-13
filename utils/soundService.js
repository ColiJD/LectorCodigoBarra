// services/soundService.js
import { Audio } from "expo-av";

// Función para reproducir el sonido de escaneo
export const playScanSound = async () => {
  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/sounds/scannerPI.mp4") // Asegúrate de que el archivo esté en esta ubicación
    );
    await sound.playAsync(); // Reproduce el sonido
  } catch (error) {
    console.error("Error al reproducir el sonido:", error);
  }
};
