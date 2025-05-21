// app.config.js
import "dotenv/config";

export default {
  expo: {
    name: "lector-codigos",
    slug: "lector-codigos",
    scheme: "lectorcodigos",
    version: "2.0.1",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/icon.png",
      resizeMode: "contain",
      backgroundColor: "#F4F6F8",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icon.png",
        backgroundColor: "#F4F6F8",
      },
      edgeToEdgeEnabled: true,
      permissions: ["android.permission.CAMERA"],
      package: "com.colijd.lectorcodigos",
    },
    androidStatusBar: {
      barStyle: "light-content",
      backgroundColor: "#001F3F",
    },

    web: {
      favicon: "./assets/icon.png",
    },
    plugins: ["expo-router"],
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
      eas: {
        projectId: "5f663ca8-e9f0-49ce-9607-272b76f3881b",
      },
    },
  },
};
