// src/context/GoalsContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const GoalsContext = createContext();

export function GoalsProvider({ children }) {
  const [weeklyMinutesGoal, setWeeklyMinutesGoal] = useState(150);
  const [weeklyCaloriesGoal, setWeeklyCaloriesGoal] = useState(2000);

  // Carga desde localStorage
  useEffect(() => {
    const mins = localStorage.getItem("weeklyMinutesGoal");
    const cals = localStorage.getItem("weeklyCaloriesGoal");
    if (mins) setWeeklyMinutesGoal(Number(mins));
    if (cals) setWeeklyCaloriesGoal(Number(cals));
  }, []);

  // Guarda en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("weeklyMinutesGoal", weeklyMinutesGoal);
  }, [weeklyMinutesGoal]);
  useEffect(() => {
    localStorage.setItem("weeklyCaloriesGoal", weeklyCaloriesGoal);
  }, [weeklyCaloriesGoal]);

  return (
    <GoalsContext.Provider
      value={{
        weeklyMinutesGoal,
        setWeeklyMinutesGoal,
        weeklyCaloriesGoal,
        setWeeklyCaloriesGoal,
      }}
    >
      {children}
    </GoalsContext.Provider>
  );
}
