import { useState, useEffect } from "react";
import { Camera } from "expo-camera";

export  function useCameraPermission() {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getPermissions();
  }, []);

  return hasPermission;
}
//
