// src/context/UserContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Ahora incluimos "nivel" como parte del perfil
  const initialProfile = {
    nombre: "",
    edad: "",
    peso: "",
    altura: "",
    tipoDiabetes: "1",      // "1" o "2"
    nivel: "principiante",  // "principiante" | "intermedio" | "avanzado"
  };

  const [profile, setProfile] = useState(initialProfile);

  // Carga desde localStorage
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

  // Guarda en localStorage siempre que cambie
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
