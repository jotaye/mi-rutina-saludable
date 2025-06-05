// src/pages/Progress.jsx
import React, { useContext, useState } from "react";
import { ProgressContext } from "../context/ProgressContext";

export default function Progress() {
  const { progress, registrarEjercicio, reiniciarDia } = useContext(ProgressContext);
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [nombreEj, setNombreEj] = useState("");
  const [calorias, setCalorias] = useState("");
  const [duracion, setDuracion] = useState("");

  // Array de todos los días en orden:
  const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!diaSeleccionado || !nombreEj || !calorias || !duracion) return;

    registrarEjercicio(diaSeleccionado, {
      nombreEjercicio: nombreEj,
      calorias: parseInt(calorias),
      duracionMin: parseInt(duracion),
    });

    // Limpiar inputs
    setNombreEj("");
    setCalorias("");
    setDuracion("");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Progreso</h1>

      {/* Formulario para agregar un ejercicio completado */}
      <div className="mb-6 border rounded-md p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Registrar nuevo ejercicio</h2>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-gray-700">Día</label>
            <select
              value={diaSeleccionado}
              onChange={(e) => setDiaSeleccionado(e.target.value)}
              className="w-full border px-3 py-2 rounded-md"
            >
              <option value="">-- Selecciona un día --</option>
              {diasSemana.map((d) => (
                <option key={d} value={d}>
                  {d.charAt(0).toUpperCase() + d.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700">Nombre del ejercicio</label>
            <input
              type="text"
              value={nombreEj}
              onChange={(e) => setNombreEj(e.target.value)}
              placeholder="p. ej. Flexiones"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Calorías aprox. quemadas</label>
            <input
              type="number"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
              placeholder="p. ej. 50"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700">Duración (minutos)</label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(e.target.value)}
              placeholder="p. ej. 10"
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Agregar progreso
          </button>
        </form>
      </div>

      {/* Visualización del progreso por día */}
      <div className="space-y-4">
        {diasSemana.map((dia) => {
          const datosDia = progress[dia];
          return (
            <div key={dia} className="border rounded-md p-4">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold capitalize">{dia}</h3>
                {datosDia && (
                  <button
                    onClick={() => reiniciarDia(dia)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Reiniciar día
                  </button>
                )}
              </div>
              {datosDia ? (
                <div className="mt-2 space-y-1">
                  <p>
                    <strong>Ejercicios completados:</strong>{" "}
                    {datosDia.ejerciciosCompletados.join(", ")}
                  </p>
                  <p>
                    <strong>Calorías quemadas:</strong> {datosDia.caloriasQuemadas} kcal
                  </p>
                  <p>
                    <strong>Tiempo de ejercicio:</strong> {datosDia.minutosEjercicio} minutos
                  </p>
                </div>
              ) : (
                <p className="mt-2 text-gray-500">Sin datos registrados</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
