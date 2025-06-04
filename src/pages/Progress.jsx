// src/pages/Progress.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Progress() {
  const { lang } = useContext(AppContext);

  // 1) Datos simulados de progreso (puedes reemplazar con datos reales o consumir de un backend)
  //    - tiempoEntrenamiento: minutos totales esta semana
  //    - caloriasQuemadas: calorías aproximadas quemadas
  //    - diasCompletados: cuántos días de la rutina completaste (0–7)
  const progresoSemana = {
    tiempoEntrenamiento: 220, // minutos totales
    caloriasQuemadas: 1800,   // calorías totales
    diasCompletados: 5,       // de 7
    historicoSemanal: [
      { dia: "Lun", calorias: 320, minutos: 40 },
      { dia: "Mar", calorias: 310, minutos: 45 },
      { dia: "Mié", calorias: 250, minutos: 30 },
      { dia: "Jue", calorias: 300, minutos: 40 },
      { dia: "Vie", calorias: 350, minutos: 50 },
      { dia: "Sáb", calorias: 0, minutos: 20 },  // yoga suave
      { dia: "Dom", calorias: 0, minutos: 0 }    // descanso
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {lang === "es" ? "Progreso Semanal" : "Weekly Progress"}
      </h1>

      {/* ──────────────────────────────────────────────────────────────────
           1) Resumen general: tiempo, calorías y días completados
         ────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Tiempo total de entrenamiento */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {lang === "es" ? "Tiempo total" : "Total Time"}
          </h2>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {progresoSemana.tiempoEntrenamiento}{" "}
            <span className="text-base text-gray-600 dark:text-gray-300">
              {lang === "es" ? "minutos" : "min"}
            </span>
          </p>
        </div>

        {/* Calorías quemadas */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {lang === "es" ? "Calorías quemadas" : "Calories Burned"}
          </h2>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
            {progresoSemana.caloriasQuemadas}{" "}
            <span className="text-base text-gray-600 dark:text-gray-300">
              kcal
            </span>
          </p>
        </div>

        {/* Días completados de la rutina */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            {lang === "es" ? "Días completados" : "Days Completed"}
          </h2>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {progresoSemana.diasCompletados}{" "}
            <span className="text-base text-gray-600 dark:text-gray-300">
              / 7
            </span>
          </p>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────────────
           2) Histórico semanal: tabla con calorías y minutos por día
         ────────────────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {lang === "es" ? "Histórico Diario" : "Daily History"}
        </h2>
        <table className="w-full table-auto bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700">
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">#</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                {lang === "es" ? "Día" : "Day"}
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                {lang === "es" ? "Calorías" : "Calories"}
              </th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                {lang === "es" ? "Minutos" : "Minutes"}
              </th>
            </tr>
          </thead>
          <tbody>
            {progresoSemana.historicoSemanal.map((dia, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
                }
              >
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {idx + 1}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {dia.dia}
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {dia.calorias} kcal
                </td>
                <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {dia.minutos}{" "}
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    {lang === "es" ? "min" : "min"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
