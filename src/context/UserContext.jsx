// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  const logOut = () => signOut(auth);

  // tu email de admin real aquí:
  const ADMIN_EMAIL = "jotayegroupllc@gmail.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <UserContext.Provider value={{ user, isAdmin, logOut }}>
      {children}
    </UserContext.Provider>
  );
}
