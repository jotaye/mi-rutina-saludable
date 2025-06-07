// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();

// Creamos el contexto
export const UserContext = createContext();

// Provider que envuelve la App
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Observamos el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        // Marcamos admin por correo (ajusta a tu lógica real)
        setIsAdmin(u.email === "admin@tudominio.com");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

  // Funciones para registro, login, reset y logout
  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  const logOut = () => signOut(auth);

  const updateProfile = (data) =>
    firebaseUpdateProfile(auth.currentUser, data);

  return (
    <UserContext.Provider
      value={{
        user,
        isAdmin,
        register,
        login,
        resetPassword,
        logOut,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
