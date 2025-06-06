// src/pages/WeekView.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import { rutinaSemanal } from "../data/rutinaSemanal";

export default function WeekView() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const diasOrden = [
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
    "domingo",
  ];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Rutina semanal" : "Weekly Routine"}
      </h1>

      {diasOrden.map((dia) => {
        const ejerciciosDelDia = rutinaSemanal[dia] || [];
        return (
          <div key={dia}>
            <h2 className="text-2xl font-semibold capitalize mb-4">{dia}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ejerciciosDelDia.map((ej, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <video
                    src={ej.video}
                    controls
                    className="w-full h-40 object-cover bg-black"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{ej.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {lang === "es"
                        ? `Series: ${ej.series} × ${Math.round(
                            ej.duracionSerie / 60
                          )} min`
                        : `Sets: ${ej.series} × ${Math.round(
                            ej.duracionSerie / 60
                          )} min`}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {lang === "es"
                        ? `Descanso: ${ej.descanso} s`
                        : `Rest: ${ej.descanso} s`}
                    </p>

                    <SeriesTimer
                      series={ej.series}
                      duracionSerie={ej.duracionSerie}
                      descanso={ej.descanso}
                      nombreEjercicio={ej.nombre}
                      caloriasBase={ej.caloriasBase}
                      diaClave={dia}
                      nivel={profile.nivel}
                      onFinish={() =>
                        alert(
                          lang === "es"
                            ? `${ej.nombre} completado y registrado automáticamente.`
                            : `${ej.nombre} completed and logged automatically.`
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
