// src/context/ProgressContext.jsx

import React, { createContext, useState, useEffect } from "react";

const STORAGE_KEY = "ws_progress";

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progressData, setProgressData] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProgressData(JSON.parse(stored));
      } catch (e) {
        console.error("Error parseando progreso desde localStorage:", e);
        setProgressData({});
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progressData));
  }, [progressData]);

  const addProgress = (dateStr, ejercicio, segundos, calorias) => {
    setProgressData((prev) => {
      const dayData = prev[dateStr] ? { ...prev[dateStr] } : {};
      const prevEj = dayData[ejercicio] || {
        segundosAcumulados: 0,
        caloríasAcumuladas: 0,
      };
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

  const getDayProgress = (dateStr) => {
    return progressData[dateStr] || {};
  };

  const getAllProgress = () => progressData;

  return (
    <ProgressContext.Provider
      value={{ progressData, addProgress, getDayProgress, getAllProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
