// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Estructura de datos del perfil
  const initialProfile = {
    nombre: "",
    edad: "",
    peso: "",
    altura: "",
    tipoDiabetes: "1", // "1" para Tipo 1, "2" para Tipo 2
  };

  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    const stored = localStorage.getItem("miRutinaPerfil");
    if (stored) {
      try {
        setProfile(JSON.parse(stored));
      } catch {
        setProfile(initialProfile);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("miRutinaPerfil", JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (nuevosDatos) => {
    setProfile((prev) => ({ ...prev, ...nuevosDatos }));
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile }}>
      {children}
    </UserContext.Provider>
  );
}
