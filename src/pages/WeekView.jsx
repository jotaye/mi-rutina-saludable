import React, { useContext, useState } from "react";
import { AppContext } from "../App";

export default function WeekView() {
  const { lang } = useContext(AppContext);

  // ╔══╗ Selector de nivel (para ver rutina semanal según el nivel)
  const [level, setLevel] = useState("beginner");

  const daysNames = [
    lang === "es" ? "domingo" : "Sunday",
    lang === "es" ? "lunes" : "Monday",
    lang === "es" ? "martes" : "Tuesday",
    lang === "es" ? "miércoles" : "Wednesday",
    lang === "es" ? "jueves" : "Thursday",
    lang === "es" ? "viernes" : "Friday",
    lang === "es" ? "sábado" : "Saturday"
  ];

  // ╔══╗ Rutina semanal dividida por niveles
  const rutina = {
    beginner: {
      lunes: [
        { name: lang === "es" ? "Jumping jacks" : "Jumping jacks", video: "/assets/jumping-jacks.mov" },
        { name: lang === "es" ? "Flexiones modificadas" : "Modified push-ups", video: "/assets/pushup.mov" },
        { name: lang === "es" ? "Sentadillas con apoyo" : "Supported squats", video: "/assets/squat.mov" }
      ],
      martes: [
        { name: lang === "es" ? "Flexiones inclinadas" : "Incline push-ups", video: "/assets/incline-pushup.mov" },
        { name: lang === "es" ? "Press con mancuernas sentado" : "Seated dumbbell press", video: "/assets/bench-press.mov" }
      ],
      miércoles: [
        { name: lang === "es" ? "Sentadillas profundas guiadas" : "Guided deep squats", video: "/assets/deep-squat.mov" },
        { name: lang === "es" ? "Zancadas asistidas" : "Assisted lunges", video: "/assets/lunge.mov" }
      ],
      jueves: [
        { name: lang === "es" ? "Dominadas asistidas" : "Assisted pull-ups", video: "/assets/assisted-pullup.mov" },
        { name: lang === "es" ? "Curl de bíceps con mancuernas" : "Dumbbell bicep curls", video: "/assets/bicep-curl.mov" }
      ],
      viernes: [
        { name: lang === "es" ? "Burpees simplificados" : "Simplified burpees", video: "/assets/burpee.mov" },
        { name: lang === "es" ? "Sentadillas con apoyo" : "Supported squats", video: "/assets/squat.mov" },
        { name: lang === "es" ? "Flexiones modificadas" : "Modified push-ups", video: "/assets/pushup.mov" }
      ],
      sábado: [
        { name: lang === "es" ? "Yoga suave y movilidad" : "Gentle yoga & mobility", video: "/assets/yoga.mov" }
      ],
      domingo: [
        { name: lang === "es" ? "Descanso activo" : "Active rest", video: "/assets/rest.mov" }
      ]
    },

    intermediate: {
      lunes: [
        { name: lang === "es" ? "Jumping jacks" : "Jumping jacks", video: "/assets/jumping-jacks.mov" },
        { name: lang === "es" ? "Flexiones clásicas" : "Classic push-ups", video: "/assets/pushup.mov" },
        { name: lang === "es" ? "Sentadillas libres" : "Bodyweight squats", video: "/assets/squat.mov" }
      ],
      martes: [
        { name: lang === "es" ? "Flexiones inclinadas" : "Incline push-ups", video: "/assets/incline-pushup.mov" },
        { name: lang === "es" ? "Press con mancuernas" : "Dumbbell press", video: "/assets/bench-press.mov" }
      ],
      miércoles: [
        { name: lang === "es" ? "Sentadillas profundas" : "Deep squats", video: "/assets/deep-squat.mov" },
        { name: lang === "es" ? "Zancadas dinámicas" : "Dynamic lunges", video: "/assets/lunge.mov" }
      ],
      jueves: [
        { name: lang === "es" ? "Dominadas asistidas" : "Assisted pull-ups", video: "/assets/assisted-pullup.mov" },
        { name: lang === "es" ? "Curl de bíceps" : "Bicep curls", video: "/assets/bicep-curl.mov" }
      ],
      viernes: [
        { name: lang === "es" ? "Burpees completos" : "Full burpees", video: "/assets/burpee.mov" },
        { name: lang === "es" ? "Sentadillas libres" : "Bodyweight squats", video: "/assets/squat.mov" },
        { name: lang === "es" ? "Flexiones clásicas" : "Classic push-ups", video: "/assets/pushup.mov" }
      ],
      sábado: [
        { name: lang === "es" ? "Yoga intermedio" : "Intermediate yoga", video: "/assets/yoga.mov" }
      ],
      domingo: [
        { name: lang === "es" ? "Descanso activo" : "Active rest", video: "/assets/rest.mov" }
      ]
    },

    advanced: {
      lunes: [
        { name: lang === "es" ? "Jumping jacks explosivos" : "Explosive jumping jacks", video: "/assets/jumping-jacks.mov" },
        { name: lang === "es" ? "Flexiones avanzadas" : "Advanced push-ups", video: "/assets/pushup.mov" },
        { name: lang === "es" ? "Sentadillas con salto" : "Jump squats", video: "/assets/squat.mov" }
      ],
      martes: [
        { name: lang === "es" ? "Flexiones con elevación de pies" : "Feet-elevated push-ups", video: "/assets/incline-pushup.mov" },
        { name: lang === "es" ? "Press con mancuernas pesada" : "Heavy dumbbell press", video: "/assets/bench-press.mov" }
      ],
      miércoles: [
        { name: lang === "es" ? "Sentadillas profundas con peso" : "Weighted deep squats", video: "/assets/deep-squat.mov" },
        { name: lang === "es" ? "Zancadas explosivas" : "Explosive lunges", video: "/assets/lunge.mov" }
      ],
      jueves: [
        { name: lang === "es" ? "Dominadas asistidas con peso" : "Weighted assisted pull-ups", video: "/assets/assisted-pullup.mov" },
        { name: lang === "es" ? "Curl concentrado" : "Concentration curls", video: "/assets/bicep-curl.mov" }
      ],
      viernes: [
        { name: lang === "es" ? "Burpees avanzados" : "Advanced burpees", video: "/assets/burpee.mov" },
        { name: lang === "es" ? "Sentadillas con salto pesado" : "Weighted jump squats", video: "/assets/squat.mov" },
        { name: lang === "es" ? "Flexiones explosivas" : "Explosive push-ups", video: "/assets/pushup.mov" }
      ],
      sábado: [
        { name: lang === "es" ? "Yoga avanzado" : "Advanced yoga", video: "/assets/yoga.mov" }
      ],
      domingo: [
        { name: lang === "es" ? "Descanso activo completo" : "Full active rest", video: "/assets/rest.mov" }
      ]
    }
  };

  // ╔══╗ Obtenemos la subrutina correspondiente al nivel elegido
  const ejercicios = rutina[level][dias[0]]; // Montaje base, más abajo usaremos el mapa completo
  // Sin embargo, para mostrar toda la semana, iteramos sobre cada día:
  // Object.entries(rutina[level]).map(([dayKey, exercises], idx) => …)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {lang === "es" ? "Rutina semanal" : "Weekly routine"}
      </h1>

      {/* ════════════════════════════════════════ Selector de nivel ═══════════════════════════════════════ */}
      <div className="mb-4">
        <label className="mr-2 text-gray-700 dark:text-gray-200 font-semibold">
          {lang === "es" ? "Nivel:" : "Level:"}
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring"
        >
          <option value="beginner">{lang === "es" ? "Principiante" : "Beginner"}</option>
          <option value="intermediate">{lang === "es" ? "Intermedio" : "Intermediate"}</option>
          <option value="advanced">{lang === "es" ? "Avanzado" : "Advanced"}</option>
        </select>
      </div>

      {/* ════════════════════════════════════════ Cuadrícula de cada día ═══════════════════════════════════════ */}
      {Object.entries(rutina[level]).map(([dayKey, exercises], idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 capitalize text-gray-800 dark:text-gray-100">
            {daysNames[idx]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((ej, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center"
              >
                <video
                  src={ej.video}
                  className="w-full h-32 object-cover rounded mb-2"
                  controls
                  autoPlay
                  loop
                  muted
                >
                  Tu navegador no soporta reproducir este video.
                </video>
                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {ej.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
