// src/context/ProgressContext.jsx

import React, { createContext, useState, useEffect } from "react";

// Nombre de la llave en localStorage
const STORAGE_KEY = "ws_progress";

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progressData, setProgressData] = useState({});

  // 1) Cargar desde localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setProgressData(parsed);
      } catch (e) {
        console.error("Error parseando progreso desde localStorage:", e);
        setProgressData({});
      }
    }
  }, []);

  // 2) Guardar en localStorage cada vez que progressData cambie
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
  }, [progressData]);

  // 3) Función para añadir progreso:
  //    dateStr = “YYYY-MM-DD”
  //    ejercicio = nombre legible del ejercicio
  //    segundos = segundos completados
  //    calorias = calorías quemadas en esos segundos
  const addProgress = (dateStr, ejercicio, segundos, calorias) => {
    setProgressData((prev) => {
      const dayData = prev[dateStr] ? { ...prev[dateStr] } : {};
      const prevEj = dayData[ejercicio] || { segundosAcumulados: 0, caloríasAcumuladas: 0 };
      const updatedEj = {
        segundosAcumulados: prevEj.segundosAcumulados + segundos,
        caloríasAcumuladas: prevEj.caloríasAcumuladas + calorias,
      };
      return {
        ...prev,
        [dateStr]: {
          ...dayData,
          [ejercicio]: updatedEj,
        },
      };
    });
  };

  // 4) Obtener progreso de un día específico
  const getDayProgress = (dateStr) => {
    return progressData[dateStr] || {};
  };

  // 5) Obtener todo el objeto de progreso
  const getAllProgress = () => progressData;

  return (
    <ProgressContext.Provider
      value={{ progressData, addProgress, getDayProgress, getAllProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
