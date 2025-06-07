// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({
    nombre: "",
    edad: "",
    peso: "",
    altura: "",
    nivel: "principiante",
  });

  // Define aquí tu email de admin
  const ADMIN_EMAIL = "tu-email@dominio.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Si tienes profile guardado en Firestore, cárgalo aquí
    });
    return () => unsub();
  }, []);

  // … funciones login, register, logout, updateProfile …

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        updateProfile,
        logOut,
+       isAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
