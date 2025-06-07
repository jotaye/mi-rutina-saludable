// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile as firebaseUpdateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";  // <–– importamos el auth inicializado

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
        setIsAdmin(u.email === "admin@tudominio.com");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return unsubscribe;
  }, []);

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
