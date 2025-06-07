// src/context/ProgressContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("progress");
    return saved ? JSON.parse(saved) : {};
  });
  const [lastActivity, setLastActivity] = useState(
    () => localStorage.getItem("lastActivity") || null
  );

  // Guardar progreso
  useEffect(() => {
    localStorage.setItem("progress", JSON.stringify(progress));
  }, [progress]);

  // Registrar ejercicio
  const registrarEjercicio = (dia, registro) => {
    setProgress((prev) => {
      const prevDia = prev[dia] || { registros: [] };
      const updatedDia = {
        registros: [
          ...prevDia.registros,
          {
            ...registro,
            fechaExacta: new Date().toISOString(),
            secuencia: prevDia.registros.length + 1,
          },
        ],
      };
      // Actualiza última actividad
      const now = new Date().toISOString();
      setLastActivity(now);
      localStorage.setItem("lastActivity", now);
      return { ...prev, [dia]: updatedDia };
    });
  };

  // Reiniciar día
  const reiniciarDia = (dia) => {
    setProgress((prev) => {
      const updated = { ...prev };
      delete updated[dia];
      return updated;
    });
  };

  // Notificación si pasan 24h sin actividad
  useEffect(() => {
    if (!lastActivity) return;
    const scheduleCheck = () => {
      const then = new Date(lastActivity).getTime();
      const diff = Date.now() - then;
      const ms24h = 24 * 60 * 60 * 1000;
      if (diff >= ms24h && Notification.permission === "granted") {
        new Notification("🔔 ¡Hora de moverte!", {
          body: "No registras ejercicio en más de 24 horas.",
        });
      } else if (diff < ms24h) {
        setTimeout(scheduleCheck, ms24h - diff);
      }
    };
    scheduleCheck();
  }, [lastActivity]);

  return (
    <ProgressContext.Provider
      value={{ progress, registrarEjercicio, reiniciarDia }}
    >
      {children}
    </ProgressContext.Provider>
  );
}
