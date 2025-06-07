// src/pages/Progress.jsx
import React, { useContext, useState, useEffect } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { GoalsContext } from "../context/GoalsContext";
import { AppContext } from "../App";
import ProgressBar from "../components/ProgressBar";

export default function Progress() {
  const { progress, reiniciarDia } = useContext(ProgressContext);
  const {
    weeklyMinutesGoal,
    setWeeklyMinutesGoal,
    weeklyCaloriesGoal,
    setWeeklyCaloriesGoal,
  } = useContext(GoalsContext);
  const { lang } = useContext(AppContext);

  const [inputMin, setInputMin] = useState(weeklyMinutesGoal);
  const [inputCal, setInputCal] = useState(weeklyCaloriesGoal);

  // Calcula totales semanales
  const diasSemana = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];
  let totalMinutosSemana = 0;
  let totalCaloriasSemana = 0;
  diasSemana.forEach((dia) => {
    const info = progress[dia];
    if (info) {
      info.registros.forEach((r) => {
        totalMinutosSemana += r.duracionMin;
        totalCaloriasSemana += r.calorias;
      });
    }
  });

  // Cuando el usuario confirma objetivos
  const saveGoals = (e) => {
    e.preventDefault();
    setWeeklyMinutesGoal(inputMin);
    setWeeklyCaloriesGoal(inputCal);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-serif font-bold mb-4">
        {lang === "es" ? "Progreso" : "Progress"}
      </h1>

      {/* 1. Formulario de Objetivos */}
      <form
        onSubmit={saveGoals}
        className="mb-8 bg-white p-4 rounded-md shadow-md space-y-4"
      >
        <h2 className="text-xl font-serif font-semibold">
          {lang === "es"
            ? "Objetivos semanales"
            : "Weekly Goals"}
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
          <div>
            <label className="block font-sans mb-1">
              {lang === "es" ? "Minutos/semana" : "Minutes/week"}
            </label>
            <input
              type="number"
              value={inputMin}
              onChange={(e) => setInputMin(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
              min={0}
            />
          </div>
          <div>
            <label className="block font-sans mb-1">
              {lang === "es" ? "Calorías/semana" : "Calories/week"}
            </label>
            <input
              type="number"
              value={inputCal}
              onChange={(e) => setInputCal(Number(e.target.value))}
              className="border rounded px-2 py-1 w-full"
              min={0}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-md transition"
        >
          {lang === "es" ? "Guardar objetivos" : "Save goals"}
        </button>
      </form>

      {/* 2. Barras de progreso */}
      <div className="mb-8">
        <ProgressBar
          label={lang === "es" ? "Minutos completados" : "Minutes completed"}
          percentage={(totalMinutosSemana / weeklyMinutesGoal) * 100}
          colorClass="bg-primary-500"
        />
        <ProgressBar
          label={lang === "es" ? "Calorías consumidas" : "Calories burned"}
          percentage={(totalCaloriasSemana / weeklyCaloriesGoal) * 100}
          colorClass="bg-accent-500"
        />
      </div>

      {/* 3. Progreso día a día (igual que antes) */}
      {diasSemana.map((dia) => {
        const infoDia = progress[dia];
        // Totales diarios
        let totalSeries = 0;
        let totalMin = 0;
        let totalCal = 0;
        if (infoDia) {
          infoDia.registros.forEach((r) => {
            totalSeries += r.seriesCompletas;
            totalMin += r.duracionMin;
            totalCal += r.calorias;
          });
        }
        return (
          <div
            key={dia}
            className="mb-6 bg-white rounded-md shadow-md overflow-hidden"
          >
            <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
              <h2 className="text-2xl font-serif font-semibold capitalize">
                {dia}
              </h2>
              {infoDia && (
                <button
                  onClick={() => reiniciarDia(dia)}
                  className="text-red-600 hover:text-red-800 text-sm transition"
                >
                  {lang === "es" ? "Reiniciar día" : "Reset day"}
                </button>
              )}
            </div>

            {infoDia ? (
              <div className="p-4 space-y-4">
                {/* Resumen diario */}
                <div className="mb-4 bg-gray-100 p-3 rounded-md">
                  <p className="text-lg font-sans">
                    <strong>
                      {lang === "es" ? "Series totales:" : "Total sets:"}{" "}
                    </strong>
                    {totalSeries}
                  </p>
                  <p className="text-lg font-sans">
                    <strong>
                      {lang === "es" ? "Minutos totales:" : "Total minutes:"}{" "}
                    </strong>
                    {totalMin} {lang === "es" ? "min" : "min"}
                  </p>
                  <p className="text-lg font-sans">
                    <strong>
                      {lang === "es" ? "Calorías totales:" : "Total calories:"}{" "}
                    </strong>
                    {totalCal} kcal
                  </p>
                </div>

                {/* Registros individuales */}
                {infoDia.registros.map((r, idx) => (
                  <div
                    key={idx}
                    className="border-b pb-2 last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm font-sans text-gray-600">
                      {lang === "es" ? "Fecha:" : "Date:"}{" "}
                      {new Date(r.fechaExacta).toLocaleString()}
                    </p>
                    <p className="font-sans">
                      <strong>
                        {lang === "es" ? "Ejercicio:" : "Exercise:"}
                      </strong>{" "}
                      {r.nombreEjercicio}
                    </p>
                    <p className="font-sans">
                      <strong>
                        {lang === "es" ? "Series:" : "Sets:"}
                      </strong>{" "}
                      {r.seriesCompletas}
                    </p>
                    <p className="font-sans">
                      <strong>
                        {lang === "es" ? "Duración:" : "Duration:"}
                      </strong>{" "}
                      {r.duracionMin} {lang === "es" ? "min" : "min"}
                    </p>
                    <p className="font-sans">
                      <strong>
                        {lang === "es" ? "Calorías:" : "Calories:"}
                      </strong>{" "}
                      {r.calorias} kcal
                    </p>
                    <p className="font-sans">
                      <strong>
                        {lang === "es" ? "Secuencia:" : "Sequence:"}
                      </strong>{" "}
                      #{r.secuencia}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 font-sans text-gray-500">
                {lang === "es" ? "Sin datos registrados" : "No data logged"}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
