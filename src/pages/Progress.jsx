// src/pages/Progress.jsx
import React, { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { AppContext } from "../App";

export default function Progress() {
  const { progress, reiniciarDia } = useContext(ProgressContext);
  const { lang } = useContext(AppContext);

  // Orden de días para mostrar
  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  // Función auxiliar para formatear fecha ISO a algo legible
  const formatearFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString(); // p.ej. "5/6/2025 14:32:10"
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Progreso" : "Progress"}
      </h1>

      {/* Recorremos cada día */}
      {diasSemana.map((dia) => {
        const infoDia = progress[dia];

        return (
          <div key={dia} className="mb-6 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
              <h2 className="text-2xl font-semibold capitalize">{dia}</h2>
              {infoDia && (
                <button
                  onClick={() => reiniciarDia(dia)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  {lang === "es" ? "Reiniciar día" : "Reset day"}
                </button>
              )}
            </div>
            {infoDia ? (
              <div className="p-4 space-y-4">
                {infoDia.registros.map((r, idx) => (
                  <div
                    key={idx}
                    className="border-b pb-2 last:border-b-0 last:pb-0"
                  >
                    <p className="text-sm text-gray-600">
                      {lang === "es" ? "Fecha:" : "Date:"} {formatearFecha(r.fechaExacta)}
                    </p>
                    <p>
                      <strong>{lang === "es" ? "Ejercicio:" : "Exercise:"}</strong>{" "}
                      {r.nombreEjercicio}
                    </p>
                    <p>
                      <strong>{lang === "es" ? "Calorías:" : "Calories:"}</strong>{" "}
                      {r.calorias} kcal
                    </p>
                    <p>
                      <strong>{lang === "es" ? "Duración:" : "Duration:"}</strong>{" "}
                      {r.duracionMin} {lang === "es" ? "minutos" : "mins"}
                    </p>
                    <p>
                      <strong>{lang === "es" ? "Secuencia:" : "Sequence:"}</strong>{" "}
                      #{r.secuencia}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p-4 text-gray-500">
                {lang === "es" ? "Sin datos registrados" : "No data logged"}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
