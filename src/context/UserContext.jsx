// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

// Config Firebase (asegúrate de usar tu bloque correcto aquí)
const firebaseConfig = {
  apiKey: "AIzaSyC7jYi0ST5rfYvfZcb8QgeMmvvVcrKDFiU",
  authDomain: "mi-rutina-saludable.firebaseapp.com",
  projectId: "mi-rutina-saludable",
  storageBucket: "mi-rutina-saludable.firebasestorage.app",
  messagingSenderId: "17810301001",
  appId: "1:17810301001:web:a0d9b260b138c81980df98",
  measurementId: "G-W2ZMDYK46E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escucha cambios de auth
    return onAuthStateChanged(auth, async (u) => {
      setLoading(true);
      setUser(u);
      if (u) {
        // Comprueba si existe un doc en "admins" con uid = u.uid
        const adminSnap = await getDoc(doc(db, "admins", u.uid));
        setIsAdmin(adminSnap.exists());
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
  }, []);

  const logIn = (email, pass) => signInWithEmailAndPassword(auth, email, pass);
  const signUp = (email, pass) => createUserWithEmailAndPassword(auth, email, pass);
  const resetPass = (email) => sendPasswordResetEmail(auth, email);
  const logOut = () => signOut(auth);

  return (
    <UserContext.Provider value={{
      user,
      isAdmin,
      loading,
      logIn,
      signUp,
      resetPass,
      logOut
    }}>
      {children}
    </UserContext.Provider>
  );
}
