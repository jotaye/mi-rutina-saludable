// src/pages/WeekView.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import useCollection from "../hooks/useCollection";

export default function WeekView() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  // Carga rutinas desde Firestore
  const rutinas = useCollection("rutinas");
  const rutinaSemanal = Object.fromEntries(rutinas.map((d) => [d.id, d.ejercicios]));

  const diasOrden = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-serif font-bold mb-4">Rutina semanal</h1>
      {diasOrden.map((dia) => (
        <div key={dia}>
          <h2 className="text-2xl font-serif font-semibold mb-4 capitalize">{dia}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(rutinaSemanal[dia] || []).map((ej, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <video src={ej.video} controls className="w-full h-40 object-cover bg-black" />
                <div className="p-4">
                  <h3 className="text-lg font-serif font-semibold">{ej.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Series: {ej.series} × {Math.round(ej.duracionSerie / 60)} min
                  </p>
                  <p className="text-sm text-gray-600 mb-4">Descanso: {ej.descanso} s</p>
                  <SeriesTimer
                    series={ej.series}
                    duracionSerie={ej.duracionSerie}
                    descanso={ej.descanso}
                    nombreEjercicio={ej.nombre}
                    caloriasBase={ej.caloriasBase}
                    diaClave={dia}
                    nivel={profile.nivel}
                    onFinish={() => alert(`${ej.nombre} completado y registrado automáticamente.`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
);
}
