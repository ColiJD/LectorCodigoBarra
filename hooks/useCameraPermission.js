import { useState, useEffect } from "react";
import { Camera } from "expo-camera";

export function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const checkPermissions = async () => {
      const { status: existingStatus } =
        await Camera.getCameraPermissionsAsync();

      if (existingStatus === "granted") {
        setHasPermission(true);
      } else {
        const { status: newStatus } =
          await Camera.requestCameraPermissionsAsync();
        setHasPermission(newStatus === "granted");
      }
    };

    checkPermissions();
  }, []);

  return hasPermission;
}
//
