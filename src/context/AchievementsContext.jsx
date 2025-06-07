// src/context/AchievementsContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import { ProgressContext } from "./ProgressContext";

export const AchievementsContext = createContext();

export function AchievementsProvider({ children }) {
  const { progress } = useContext(ProgressContext);

  // Leer logros actuales de localStorage
  const [unlocked, setUnlocked] = useState(() => {
    const saved = localStorage.getItem("achievements");
    return saved ? JSON.parse(saved) : {};
  });

  // Definición de logros
  const definitions = {
    streak7: {
      name: "Racha 7 días",
      desc: "Completa ejercicio 7 días seguidos",
    },
    series100: {
      name: "100 series",
      desc: "Completa 100 series totales",
    },
  };

  // Calcula totales en progreso
  const calculateSeriesTotal = () =>
    Object.values(progress).reduce((sum, day) => {
      if (!day) return sum;
      return sum + day.registros.reduce((s, r) => s + r.seriesCompletas, 0);
    }, 0);

  // Detecta racha de días consecutivos
  const hasStreak = () => {
    const days = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
    const todayIndex = new Date().getDay();
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const idx = (todayIndex - i + 7) % 7;
      const dayName = days[idx];
      if (progress[dayName] && progress[dayName].registros.length > 0) {
        count++;
      } else break;
    }
    return count >= 7;
  };

  // Chequea y desbloquea
  useEffect(() => {
    const newUnlocked = { ...unlocked };
    // Streak 7 días
    if (!newUnlocked.streak7 && hasStreak()) {
      newUnlocked.streak7 = true;
      new Notification("🎉 ¡Logro desbloqueado!", {
        body: definitions.streak7.name,
      });
    }
    // 100 series totales
    const totalSeries = calculateSeriesTotal();
    if (!newUnlocked.series100 && totalSeries >= 100) {
      newUnlocked.series100 = true;
      new Notification("🎉 ¡Logro desbloqueado!", {
        body: definitions.series100.name,
      });
    }
    setUnlocked(newUnlocked);
    localStorage.setItem("achievements", JSON.stringify(newUnlocked));
  }, [progress]);

  return (
    <AchievementsContext.Provider value={{ unlocked, definitions }}>
      {children}
    </AchievementsContext.Provider>
  );
}
