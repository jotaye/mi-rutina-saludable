// src/pages/Progress.jsx
import React, { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { AppContext } from "../App";

export default function Progress() {
  const { progress, reiniciarDia } = useContext(ProgressContext);
  const { lang } = useContext(AppContext);

  const diasSemana = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  const formatearFecha = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString(); // ej. "5/6/2025 14:32:10"
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Progreso" : "Progress"}
      </h1>

      {diasSemana.map((dia) => {
        const infoDia = progress[dia];

        // Si existen registros, calculamos totales:
        let totalSeries = 0;
        let totalMinutos = 0;
        let totalCalorias = 0;
        if (infoDia) {
          infoDia.registros.forEach((r) => {
            totalSeries += r.seriesCompletas;
            totalMinutos += r.duracionMin;
            totalCalorias += r.calorias;
          });
        }

        return (
          <div
            key={dia}
            className="mb-6 bg-white rounded-md shadow-md overflow-hidden"
          >
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
                {/* Resumen diario */}
                <div className="mb-4 bg-gray-100 p-3 rounded-md">
                  <p className="text-lg">
                    <strong>
                      {lang === "es" ? "Series totales:" : "Total sets:"}{" "}
                    </strong>
                    {totalSeries}
                  </p>
                  <p className="text-lg">
                    <strong>
                      {lang === "es" ? "Minutos totales:" : "Total minutes:"}{" "}
                    </strong>
                    {totalMinutos} {lang === "es" ? "min" : "min"}
                  </p>
                  <p className="text-lg">
                    <strong>
                      {lang === "es" ? "Calorías totales:" : "Total calories:"}{" "}
                    </strong>
                    {totalCalorias} kcal
                  </p>
                </div>

                {/* Listado de registros individuales */}
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
                      <strong>{lang === "es" ? "Series:" : "Sets:"}</strong>{" "}
                      {r.seriesCompletas}
                    </p>
                    <p>
                      <strong>
                        {lang === "es" ? "Duración total:" : "Total time:"}
                      </strong>{" "}
                      {r.duracionMin} {lang === "es" ? "min" : "min"}
                    </p>
                    <p>
                      <strong>
                        {lang === "es" ? "Calorías totales:" : "Total calories:"}
                      </strong>{" "}
                      {r.calorias} kcal
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
