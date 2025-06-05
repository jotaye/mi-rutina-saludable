// src/pages/WeekView.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import Timer from "../components/Timer";

// Reutilizamos la misma definición de rutinaSemanal que en Home.jsx
const rutinaSemanal = {
  lunes: [
    {
      nombre: "Sentadillas sin peso",
      video: "/assets/squat.mov",
      duracionBase: 60,
      caloriasBase: 40,
    },
    {
      nombre: "Caminadora (en casa)",
      video: "/assets/treadmill.mov",
      duracionBase: 600,
      caloriasBase: 100,
    },
  ],
  martes: [
    {
      nombre: "Flexiones estándar",
      video: "/assets/pushup.mov",
      duracionBase: 45,
      caloriasBase: 50,
    },
    {
      nombre: "Bicicleta estática (Gym Bike)",
      video: "/assets/bike.mov",
      duracionBase: 600,
      caloriasBase: 80,
    },
  ],
  miércoles: [
    {
      nombre: "Dominadas asistidas",
      video: "/assets/assisted-pullup.mov",
      duracionBase: 45,
      caloriasBase: 60,
    },
    {
      nombre: "Curl de bíceps con mancuernas",
      video: "/assets/bicep-curl.mov",
      duracionBase: 60,
      caloriasBase: 30,
    },
  ],
  jueves: [
    {
      nombre: "Zancadas (Lunge)",
      video: "/assets/lunge.mov",
      duracionBase: 60,
      caloriasBase: 45,
    },
    {
      nombre: "Curl con banda elástica",
      video: "/assets/elastic-curl.mov",
      duracionBase: 45,
      caloriasBase: 25,
    },
  ],
  viernes: [
    {
      nombre: "Burpees",
      video: "/assets/burpee.mov",
      duracionBase: 60,
      caloriasBase: 70,
    },
    {
      nombre: "Saltos con cuerda",
      video: "/assets/jumping-rope.mov",
      duracionBase: 60,
      caloriasBase: 60,
    },
  ],
  sábado: [
    {
      nombre: "Yoga (movilidad)",
      video: "/assets/yoga.mov",
      duracionBase: 600,
      caloriasBase: 20,
    },
  ],
  domingo: [
    {
      nombre: "Descanso activo",
      video: "/assets/rest.mov",
      duracionBase: 900,
      caloriasBase: 15,
    },
  ],
};

function factorDuracion(nivel) {
  switch (nivel) {
    case "principiante":
      return 1.0;
    case "intermedio":
      return 1.5;
    case "avanzado":
      return 2.0;
    default:
      return 1.0;
  }
}
function factorCalorias(nivel) {
  switch (nivel) {
    case "principiante":
      return 1.0;
    case "intermedio":
      return 1.2;
    case "avanzado":
      return 1.5;
    default:
      return 1.0;
  }
}

export default function WeekView() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const diasOrden = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];
  const fDur = factorDuracion(profile.nivel);
  const fCal = factorCalorias(profile.nivel);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Rutina semanal" : "Weekly Routine"}
      </h1>

      {diasOrden.map((dia) => (
        <div key={dia}>
          <h2 className="text-2xl font-semibold capitalize mb-3">{dia}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(rutinaSemanal[dia] || []).map((ej, idx) => {
              const duracionAjustada = Math.round(ej.duracionBase * fDur);
              const caloriasAjustadas = Math.round(ej.caloriasBase * fCal);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition"
                >
                  <video
                    src={ej.video}
                    controls
                    className="w-full h-40 object-cover bg-black"
                  />
                  <div className="p-3">
                    <h3 className="text-lg font-semibold">{ej.nombre}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {lang === "es"
                        ? `Duración: ${Math.round(duracionAjustada / 60)} min`
                        : `Duration: ${Math.round(duracionAjustada / 60)} min`}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      {lang === "es"
                        ? `Est. Calorías: ${caloriasAjustadas} kcal`
                        : `Est. Calories: ${caloriasAjustadas} kcal`}
                    </p>
                    <Timer
                      durationSeconds={duracionAjustada}
                      nombreEjercicio={ej.nombre}
                      caloriasEstimadas={caloriasAjustadas}
                      diaClave={dia}
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
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
