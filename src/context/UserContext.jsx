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
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Si persistes profile en Firestore, cárgalo aquí
    });
    return () => unsubscribe();
  }, []);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const logOut = () => signOut(auth);

  const updateProfile = (data) => {
    setProfile((prev) => ({ ...prev, ...data }));
    // Si guardas profile en Firestore, hazlo aquí
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        updateProfile,
        logOut,
        isAdmin,
        register,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
