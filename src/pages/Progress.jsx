// src/pages/Progress.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { ProgressContext } from "../context/ProgressContext";

export default function Progress() {
  const { lang } = useContext(AppContext);
  const { progressData, getDayProgress, getAllProgress } = useContext(ProgressContext);

  // Ejemplo: mostrar JSON completo en pantalla
  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {lang === "es" ? "Progreso" : "Progress"}
      </h1>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
        {JSON.stringify(getAllProgress(), null, 2)}
      </pre>
    </div>
  );
}
