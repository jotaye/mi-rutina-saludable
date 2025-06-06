// src/context/ProgressContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const initialProgress = {};

  const [progress, setProgress] = useState(initialProgress);

  // Carga desde localStorage
  useEffect(() => {
    const stored = localStorage.getItem("miRutinaProgreso");
    if (stored) {
      try {
        setProgress(JSON.parse(stored));
      } catch {
        setProgress(initialProgress);
      }
    }
  }, []);

  // Guarda en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("miRutinaProgreso", JSON.stringify(progress));
  }, [progress]);

  /**
   * Registra un ejercicio COMPLETO (todas las series)
   *
   * @param {string} diaClave  
   * @param {object} registroEjercicio  - {
   *    nombreEjercicio: string,
   *    calorias: number,      // calorías totales
   *    duracionMin: number,   // minutos totales
   *    seriesCompletas: number // número de series
   * }
   */
  function registrarEjercicio(diaClave, registroEjercicio) {
    setProgress((prev) => {
      const copia = { ...prev };
      const fechaExacta = new Date().toISOString();

      if (!copia[diaClave]) {
        copia[diaClave] = { registros: [] };
      }

      const registrosHoy = copia[diaClave].registros;
      const mismasVeces = registrosHoy.filter(
        (r) => r.nombreEjercicio === registroEjercicio.nombreEjercicio
      ).length;
      const secuencia = mismasVeces + 1;

      const nuevoRegistro = {
        fechaExacta,
        nombreEjercicio: registroEjercicio.nombreEjercicio,
        calorias: registroEjercicio.calorias,
        duracionMin: registroEjercicio.duracionMin,
        seriesCompletas: registroEjercicio.seriesCompletas,
        secuencia,
      };

      copia[diaClave].registros = [...registrosHoy, nuevoRegistro];
      return copia;
    });
  }

  function reiniciarDia(diaClave) {
    setProgress((prev) => {
      const copia = { ...prev };
      delete copia[diaClave];
      return copia;
    });
  }

  const value = {
    progress,
    registrarEjercicio,
    reiniciarDia,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
