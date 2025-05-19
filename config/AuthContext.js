import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect, createContext } from "react";
import { auth } from "./firebaseConfig";

export const Authcontext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <Authcontext.Provider value={{ user, loading, setUser }}>
      {children}
    </Authcontext.Provider>
  );
}
