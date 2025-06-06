// src/pages/Home.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import { rutinaSemanal } from "../data/rutinaSemanal";

export default function Home() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const todayIndex = new Date().getDay(); // 0 = domingo, 1 = lunes...
  const dias = [
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
    "sábado",
  ];
  const diaHoy = dias[todayIndex];
  const ejerciciosHoy = rutinaSemanal[diaHoy] || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {lang === "es"
          ? `Mi rutina de hoy (${diaHoy})`
          : `My routine for (${diaHoy})`}
      </h1>

      <div className="space-y-8">
        {ejerciciosHoy.length === 0 ? (
          <p className="text-gray-500">
            {lang === "es" ? "Descanso" : "Rest day"}
          </p>
        ) : (
          ejerciciosHoy.map((ej, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-6 shadow-md hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold mb-4">{ej.nombre}</h2>

              {/* Video redimensionado */}
              <video
                src={ej.video}
                controls
                className="w-full max-w-lg mx-auto rounded-md mb-4 bg-black"
              >
                {lang === "es"
                  ? "Tu navegador no puede reproducir este video."
                  : "Your browser cannot play this video."}
              </video>

              {/* Descripción paso a paso (si existe) */}
              {ej.descripcion && (
                <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
                  {ej.descripcion.map((paso, i) => (
                    <li key={i}>{paso}</li>
                  ))}
                </ol>
              )}

              {/* Info de series */}
              <div className="mb-4 text-gray-700">
                <p>
                  <strong>{lang === "es" ? "Series:" : "Sets:"} </strong>
                  {ej.series}{" "}
                  {lang === "es" ? "×" : "×"}{" "}
                  {Math.round(ej.duracionSerie / 60)}{" "}
                  {lang === "es" ? "min cada serie" : "min per set"}
                </p>
                <p>
                  <strong>{lang === "es" ? "Descanso:" : "Rest:"} </strong>
                  {ej.descanso} {lang === "es" ? "s" : "s"}
                </p>
              </div>

              {/* SeriesTimer */}
              <div className="flex items-start space-x-4">
                <SeriesTimer
                  series={ej.series}
                  duracionSerie={ej.duracionSerie}
                  descanso={ej.descanso}
                  nombreEjercicio={ej.nombre}
                  caloriasBase={ej.caloriasBase}
                  diaClave={diaHoy}
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
          ))
        )}
      </div>

      <div className="mt-6">
        <a
          href="/semana"
          className="text-blue-600 hover:underline"
        >
          {lang === "es" ? "Ver toda la semana" : "See full week"}
        </a>
      </div>

      {!profile.nombre && (
        <div className="mt-8 bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-500">
          <p className="text-yellow-800">
            {lang === "es"
              ? "Para personalizar tu rutina, completa tu perfil."
              : "To personalize your routine, complete your profile."}
          </p>
          <a
            href="/perfil"
            className="text-yellow-800 font-semibold hover:underline"
          >
            {lang === "es" ? "Ir a Perfil" : "Go to Profile"}
          </a>
        </div>
      )}
    </div>
  );
}
