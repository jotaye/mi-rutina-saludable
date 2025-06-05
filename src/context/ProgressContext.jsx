// src/context/ProgressContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Estructura inicial: vacío (se sobreescribirá cuando el usuario registre actividad)
const initialProgress = {
  // Ejemplo de cómo podría verse (vacío al principio):
  // lunes: { ejerciciosCompletados: [], caloriasQuemadas: 0, minutosEjercicio: 0 },
  // martes: { ... }
};

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(initialProgress);

  // Opcional: para persistir en localStorage
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

  useEffect(() => {
    localStorage.setItem("miRutinaProgreso", JSON.stringify(progress));
  }, [progress]);

  /**
   * Marca un ejercicio como completado en un día específico
   *
   * @param {string} dia      - "lunes", "martes", ... (en minúsculas)
   * @param {object} data     - { nombreEjercicio: string, calorias: number, duracionMin: number }
   */
  function registrarEjercicio(dia, data) {
    setProgress((prev) => {
      const copia = { ...prev };
      // Si el día no existía, inicializa con valores por defecto
      if (!copia[dia]) {
        copia[dia] = {
          ejerciciosCompletados: [],
          caloriasQuemadas: 0,
          minutosEjercicio: 0,
        };
      }
      // Actualiza la lista de ejercicios
      copia[dia].ejerciciosCompletados.push(data.nombreEjercicio);
      // Suma calorías y minutos
      copia[dia].caloriasQuemadas += data.calorias;
      copia[dia].minutosEjercicio += data.duracionMin;
      return copia;
    });
  }

  /**
   * Reinicia el progreso de un día (quita todo lo registrado)
   */
  function reiniciarDia(dia) {
    setProgress((prev) => {
      const copia = { ...prev };
      delete copia[dia];
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
