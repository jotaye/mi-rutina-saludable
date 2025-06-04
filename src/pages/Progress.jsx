// src/pages/Progress.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";
import { ProgressContext } from "../context/ProgressContext";

export default function Progress() {
  const { lang } = useContext(AppContext);
  const { progressData, getDayProgress } = useContext(ProgressContext);

  const todayStr = new Date().toISOString().slice(0, 10);
  const hoyProgress = getDayProgress(todayStr);
  const totalSegHoy = Object.values(hoyProgress).reduce(
    (acc, cur) => acc + cur.segundosAcumulados,
    0
  );
  const totalCalHoy = Object.values(hoyProgress).reduce(
    (acc, cur) => acc + cur.caloríasAcumuladas,
    0
  );

  const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const hoyDate = new Date();
  const historicoSemanal = [];
  for (let i = 6; i >= 0; i--) {
    const fecha = new Date(hoyDate);
    fecha.setDate(hoyDate.getDate() - i);
    const dateStr = fecha.toISOString().slice(0, 10);
    const dayData = progressData[dateStr] || {};
    const totalSeg = Object.values(dayData).reduce(
      (acc, cur) => acc + cur.segundosAcumulados,
      0
    );
    const totalCal = Object.values(dayData).reduce(
      (acc, cur) => acc + cur.caloríasAcumuladas,
      0
    );
    const dayName = diasSemana[fecha.getDay()].slice(0, 3);
    historicoSemanal.push({
      dia: dayName,
      minutos: Math.floor(totalSeg / 60),
      calorias: Math.round(totalCal),
    });
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {lang === "es" ? "Progreso Diario" : "Daily Progress"}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {lang === "es" ? "Tiempo entrenado hoy" : "Time trained today"}
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {Math.floor(totalSegHoy / 60)}{" "}
            <span className="text-base text-gray-600 dark:text-gray-300">
              {lang === "es" ? "min" : "min"}
            </span>
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            {lang === "es" ? "Calorías quemadas hoy" : "Calories burned today"}
          </h2>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {Math.round(totalCalHoy)}{" "}
            <span className="text-base text-gray-600 dark:text-gray-300">kcal</span>
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {lang === "es" ? "Histórico Semanal" : "Weekly History"}
        </h2>
        <table className="w-full table-auto bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">#</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                {lang === "es" ? "Día" : "Day"}
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                {lang === "es" ? "Minutos" : "Minutes"}
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                {lang === "es" ? "Calorías" : "Calories"}
              </th>
            </tr>
          </thead>
          <tbody>
            {historicoSemanal.map((dia, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
              >
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{idx + 1}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">{dia.dia}</td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {dia.minutos}{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">min</span>
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {dia.calorias}{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">kcal</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
