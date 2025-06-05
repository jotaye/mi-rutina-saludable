// src/context/ProgressContext.jsx
import React, { createContext, useState, useEffect } from "react";

// Estructura inicial: vacío
// Ahora cada día (clave) es un arreglo de registros:
//   registros: [
//     {
//       fechaExacta: "2025-06-05T14:30:00.000Z",
//       nombreEjercicio: "Flexiones",
//       calorias: 50,
//       duracionMin: 1,       // minutos redondeados, p.ej.
//       secuencia: 1          // si repitió varias veces
//     },
//     { … }
//   ]
const initialProgress = {};

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(initialProgress);

  // Cargar de localStorage al arrancar
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

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem("miRutinaProgreso", JSON.stringify(progress));
  }, [progress]);

  /**
   * Registra automáticamente un ejercicio completado.
   *
   * @param {string} diaClave           - Ej. "lunes", "martes", etc.
   * @param {object} registroEjercicio  - {
   *    nombreEjercicio: string,
   *    calorias: number,
   *    duracionMin: number  // (minutos redondeados)
   * }
   */
  function registrarEjercicio(diaClave, registroEjercicio) {
    setProgress((prev) => {
      const copia = { ...prev };
      const fechaExacta = new Date().toISOString();

      // Si no existe día, lo inicializamos como arreglo
      if (!copia[diaClave]) {
        copia[diaClave] = { registros: [] };
      }

      // Calculamos cuántas veces ya se había completado este mismo ejercicio en el día
      const registrosHoy = copia[diaClave].registros;
      const mismasVeces = registrosHoy.filter(
        (r) => r.nombreEjercicio === registroEjercicio.nombreEjercicio
      ).length;
      const secuencia = mismasVeces + 1;

      // Construimos el objeto completo
      const nuevoRegistro = {
        fechaExacta,                                       // Fecha y hora ISO
        nombreEjercicio: registroEjercicio.nombreEjercicio,
        calorias: registroEjercicio.calorias,
        duracionMin: registroEjercicio.duracionMin,
        secuencia,                                         // 1, 2, 3… en ese día
      };

      // Agregamos al arreglo
      copia[diaClave].registros = [...registrosHoy, nuevoRegistro];
      return copia;
    });
  }

  /**
   * Reinicia todo el progreso de un día (borra los registros).
   */
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
