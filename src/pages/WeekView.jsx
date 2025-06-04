// src/pages/WeekView.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function WeekView() {
  const { lang } = useContext(AppContext);
  return (
    <div className="min-h-screen p-6 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {lang === "es" ? "Rutina semanal" : "Weekly Routine"}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        {lang === "es"
          ? "Aquí verás todos los ejercicios de la semana según tu nivel."
          : "Here you will see all the week’s exercises based on your level."}
      </p>
    </div>
  );
}
