// src/pages/Progress.jsx
import React, { useContext, useState } from "react";
import { ProgressContext } from "../context/ProgressContext";
import Timer from "../components/Timer";
import { AppContext } from "../App";

export default function Progress() {
  const { progress, registrarEjercicio, reiniciarDia } = useContext(ProgressContext);
  const { lang } = useContext(AppContext);

  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [nombreEj, setNombreEj] = useState("");
  const [calorias, setCalorias] = useState("");
  const [duracion, setDuracion] = useState("");

  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!diaSeleccionado || !nombreEj || !calorias || !duracion) return;
    registrarEjercicio(diaSeleccionado, {
      nombreEjercicio: nombreEj,
      calorias: parseInt(calorias),
      duracionMin: parseInt(duracion),
    });
    setNombreEj("");
    setCalorias("");
    setDuracion("");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Progreso" : "Progress"}
      </h1>

      {/* Formulario con fondo ligeramente coloreado */}
      <div className="mb-6 bg-white shadow-md rounded-md p-6 border-l-4 border-blue-400">
        <h2 className="text-xl font-semibold mb-3">
          {lang === "es" ? "Registrar ejercicio completado" : "Log Completed Exercise"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-gray-700">{lang === "es" ? "Día" : "Day"}</label>
            <select
              value={diaSeleccionado}
              onChange={(e) => setDiaSeleccionado(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">{lang === "es" ? "-- Selecciona un día --" : "-- Select a day --"}</option>
              {diasSemana.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">
              {lang === "es" ? "Nombre del ejercicio" : "Exercise Name"}
            </label>
            <input
              type="text"
              value={nombreEj}
              onChange={(e) => setNombreEj(e.target.value)}
              placeholder={lang === "es" ? "p. ej. Flexiones" : "e.g. Push-ups"}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">
                {lang === "es" ? "Calorías quemadas" : "Calories Burned"}
              </label>
              <input
                type="number"
                value={calorias}
                onChange={(e) => setCalorias(e.target.value)}
                placeholder="p. ej. 50"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {lang === "es" ? "Duración (min)" : "Duration (min)"}
              </label>
              <input
                type="number"
                value={duracion}
                onChange={(e) => setDuracion(e.target.value)}
                placeholder="p. ej. 10"
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            {lang === "es" ? "Agregar" : "Add"}
          </button>
        </form>
      </div>

      {/* Visualización de progreso día a día */}
      <div className="space-y-5">
        {diasSemana.map((dia) => {
          const datosDia = progress[dia];
          return (
            <div
              key={dia}
              className="bg-white p-4 rounded-md shadow hover:shadow-lg transition border"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold capitalize">{dia}</h3>
                {datosDia && (
                  <button
                    onClick={() => reiniciarDia(dia)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    {lang === "es" ? "Reiniciar día" : "Reset day"}
                  </button>
                )}
              </div>
              {datosDia ? (
                <div className="mt-2 space-y-2">
                  <p>
                    <strong>{lang === "es" ? "Ejercicios:" : "Exercises:"}</strong>{" "}
                    {datosDia.ejerciciosCompletados.join(", ")}
                  </p>
                  <p>
                    <strong>{lang === "es" ? "Calorías:" : "Calories:"}</strong>{" "}
                    {datosDia.caloriasQuemadas} kcal
                  </p>
                  <p>
                    <strong>{lang === "es" ? "Tiempo:" : "Time:"}</strong>{" "}
                    {datosDia.minutosEjercicio} {lang === "es" ? "minutos" : "mins"}
                  </p>
                  {/* Inserción de temporizador para repetir el ejercicio */}
                  <div className="mt-2">
                    <Timer
                      durationSeconds={60}
                      onFinish={() =>
                        alert(
                          lang === "es"
                            ? `${datosDia.ejerciciosCompletados.slice(-1)[0]} repetición completada!`
                            : `${datosDia.ejerciciosCompletados.slice(-1)[0]} finished!`
                        )
                      }
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-gray-500">
                  {lang === "es" ? "Sin datos registrados" : "No data logged"}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
