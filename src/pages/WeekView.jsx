// src/pages/WeekView.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";

export default function WeekView() {
  const { lang } = useContext(AppContext);

  // 1) Definimos los días en orden. Si quisieras inglés, podrías mapear aquí mismo:
  const dias = [
    lang === "es" ? "Domingo" : "Sunday",
    lang === "es" ? "Lunes" : "Monday",
    lang === "es" ? "Martes" : "Tuesday",
    lang === "es" ? "Miércoles" : "Wednesday",
    lang === "es" ? "Jueves" : "Thursday",
    lang === "es" ? "Viernes" : "Friday",
    lang === "es" ? "Sábado" : "Saturday",
  ];

  // 2) Definimos la rutina con nombre y archivo de vídeo (debe corresponder a public/assets/<archivo>.mov)
  const rutinaSemanal = {
    domingo: [
      {
        name_es: "Descanso activo",
        name_en: "Active rest",
        file: "rest.mov"
      }
    ],
    lunes: [
      {
        name_es: "Jumping jacks",
        name_en: "Jumping jacks",
        file: "jumping-jacks.mov"
      },
      {
        name_es: "Flexiones (push-ups)",
        name_en: "Push-ups",
        file: "pushup.mov"
      },
      {
        name_es: "Sentadillas con barra",
        name_en: "Barbell squats",
        file: "bench-press.mov" // Ejemplo, reemplaza por tu video correcto
      }
    ],
    martes: [
      {
        name_es: "Flexiones inclinadas",
        name_en: "Incline push-ups",
        file: "incline-pushup.mov"
      },
      {
        name_es: "Press con pesas",
        name_en: "Dumbbell press",
        file: "bicep-curl.mov" // Ejemplo, reemplaza por tu video correcto
      }
    ],
    miercoles: [
      {
        name_es: "Sentadillas",
        name_en: "Bodyweight squats",
        file: "squat.mov"
      },
      {
        name_es: "Zancadas por pierna",
        name_en: "Lunges (per leg)",
        file: "lunge.mov"
      }
    ],
    jueves: [
      {
        name_es: "Dominadas asistidas",
        name_en: "Assisted pull-ups",
        file: "bench-press.mov" // Ejemplo, reemplaza por tu video correcto
      },
      {
        name_es: "Curl con pesas",
        name_en: "Dumbbell curl",
        file: "bicep-curl.mov"
      }
    ],
    viernes: [
      {
        name_es: "20 Burpees",
        name_en: "20 Burpees",
        file: "burpee.mov"
      },
      {
        name_es: "15 Sentadillas",
        name_en: "15 Squats",
        file: "deep-squat.mov"
      },
      {
        name_es: "10 Flexiones",
        name_en: "10 Push-ups",
        file: "pushup.mov"
      }
    ],
    sabado: [
      {
        name_es: "Yoga / Movilidad (20 min)",
        name_en: "Yoga / Mobility (20 min)",
        file: "yoga.mov"
      }
    ]
  };

  // 3) Renderizamos un bloque por cada día de la semana
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {lang === "es" ? "Rutina semanal" : "Weekly Routine"}
      </h1>
      {dias.map((diaNombre, index) => {
        // Queremos acceder a la rutina en minúsculas
        const clave = diaNombre.toLowerCase();
        const ejercicios = rutinaSemanal[clave] || [];

        return (
          <section key={diaNombre} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              {diaNombre}
            </h2>
            {ejercicios.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                {lang === "es"
                  ? "No hay ejercicios para este día."
                  : "No exercises scheduled for this day."}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {ejercicios.map((ej, idx) => (
                  <div
                    key={idx}
                    className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow"
                  >
                    <video
                      src={`/assets/${ej.file}`}
                      controls
                      className="w-full h-48 object-cover bg-black"
                    >
                      Tu navegador no soporta reproducir este video.
                    </video>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                        {lang === "es" ? ej.name_es : ej.name_en}
                      </h3>
                      {/* Aquí podrías añadir detalles como repeticiones, series o un pequeño texto explicativo */}
                      {lang === "es" ? (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {"4 series de 10 repeticiones"}
                        </p>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {"4 sets of 10 reps"}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
