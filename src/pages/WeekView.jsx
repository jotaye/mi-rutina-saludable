// src/pages/WeekView.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";

export default function WeekView() {
  const { lang } = useContext(AppContext);

  // 1) Días de la semana adaptados a idioma
  const dias = [
    lang === "es" ? "Domingo" : "Sunday",
    lang === "es" ? "Lunes" : "Monday",
    lang === "es" ? "Martes" : "Tuesday",
    lang === "es" ? "Miércoles" : "Wednesday",
    lang === "es" ? "Jueves" : "Thursday",
    lang === "es" ? "Viernes" : "Friday",
    lang === "es" ? "Sábado" : "Saturday",
  ];

  // 2) Rutina semanal (calistenia + mancuernas)
  const rutinaSemanal = {
    domingo: [
      {
        name_es: "Descanso activo",
        name_en: "Active rest",
        file: "rest.mov",
      },
    ],
    lunes: [
      {
        name_es: "Jumping jacks",
        name_en: "Jumping jacks",
        file: "jumping-jacks.mov",
      },
      {
        name_es: "Flexiones (push-ups)",
        name_en: "Push-ups",
        file: "pushup.mov",
      },
      {
        name_es: "Sentadilla con mancuerna (goblet squat)",
        name_en: "Goblet squat",
        file: "goblet-squat.mov",
      },
    ],
    martes: [
      {
        name_es: "Flexiones inclinadas",
        name_en: "Incline push-ups",
        file: "incline-pushup.mov",
      },
      {
        name_es: "Press con mancuerna en suelo (floor press)",
        name_en: "Dumbbell floor press",
        file: "dumbbell-floor-press.mov",
      },
    ],
    miercoles: [
      {
        name_es: "Sentadillas sin peso (bodyweight squat)",
        name_en: "Bodyweight squats",
        file: "bodyweight-squat.mov",
      },
      {
        name_es: "Zancadas alternas (lunges)",
        name_en: "Lunges",
        file: "lunge.mov",
      },
    ],
    jueves: [
      {
        name_es: "Dominadas asistidas",
        name_en: "Assisted pull-ups",
        file: "assisted-pullup.mov",
      },
      {
        name_es: "Curl de bíceps con mancuerna",
        name_en: "Dumbbell curl",
        file: "dumbbell-curl.mov",
      },
    ],
    viernes: [
      {
        name_es: "20 Burpees",
        name_en: "20 Burpees",
        file: "burpee.mov",
      },
      {
        name_es: "15 Sentadillas con salto",
        name_en: "15 Jump Squats",
        file: "jump-squat.mov",
      },
      {
        name_es: "10 Flexiones explosivas",
        name_en: "10 Plyo Push-ups",
        file: "plyo-pushup.mov",
      },
    ],
    sabado: [
      {
        name_es: "Yoga / Movilidad (20 min)",
        name_en: "Yoga / Mobility (20 min)",
        file: "yoga.mov",
      },
    ],
  };

  // 3) Plan de cardio semanal con tiempos de ejercicio y descanso
  //    Cada día: array de objetos { ejercicio, duracion, descanso }
  const cardioSemanal = {
    domingo: [
      {
        ejercicio_es: "Descanso activo: Caminar",
        ejercicio_en: "Active rest: Walking",
        duracion: "20 min",
        descanso: "—",
      },
    ],
    lunes: [
      {
        ejercicio_es: "Cuerda de saltar",
        ejercicio_en: "Jump rope",
        duracion: "3 min",
        descanso: "1 min",
      },
      {
        ejercicio_es: "Caminadora (trote suave)",
        ejercicio_en: "Treadmill (light jog)",
        duracion: "15 min",
        descanso: "2 min",
      },
    ],
    martes: [
      {
        ejercicio_es: "Elíptica (resistencia moderada)",
        ejercicio_en: "Elliptical (moderate)",
        duracion: "20 min",
        descanso: "2 min",
      },
      {
        ejercicio_es: "Burpees (intervalos HIIT)",
        ejercicio_en: "Burpees (HIIT intervals)",
        duracion: "30 s on / 30 s off × 8",
        descanso: "1 min después",
      },
    ],
    miercoles: [
      {
        ejercicio_es: "Escaladora / Stepper",
        ejercicio_en: "Stepper",
        duracion: "15 min",
        descanso: "1 min",
      },
      {
        ejercicio_es: "Caminadora (inclinación 5 %)",
        ejercicio_en: "Treadmill (5 % incline)",
        duracion: "10 min",
        descanso: "—",
      },
    ],
    jueves: [
      {
        ejercicio_es: "Cuerda de saltar",
        ejercicio_en: "Jump rope",
        duracion: "5 min",
        descanso: "1 min",
      },
      {
        ejercicio_es: "Elíptica (fartlek)",
        ejercicio_en: "Elliptical (fartlek)",
        duracion: "2 min moderado / 1 min alto × 6",
        descanso: "2 min después",
      },
    ],
    viernes: [
      {
        ejercicio_es: "Caminadora (intervalos de velocidad)",
        ejercicio_en: "Treadmill (speed intervals)",
        duracion: "1 min rápido / 1 min suave × 10",
        descanso: "2 min después",
      },
      {
        ejercicio_es: "Burpees",
        ejercicio_en: "Burpees",
        duracion: "3 min a ritmo constante",
        descanso: "—",
      },
    ],
    sabado: [
      {
        ejercicio_es: "Yoga / Movilidad suave",
        ejercicio_en: "Yoga / Gentle mobility",
        duracion: "20 min",
        descanso: "—",
      },
    ],
  };

  // 4) Equipamiento para cardio en casa (solo descripciones; imágenes se añaden luego)
  const equipamientoCardio = [
    {
      key: "treadmill",
      name_es: "Caminadora (Treadmill)",
      name_en: "Treadmill",
      image: "treadmill.jpg", // placeholder
      desc_es: "Úsala para trote suave, intervalos de inclinación o carrera continua.",
      desc_en: "Use for easy jogs, incline intervals or continuous running.",
    },
    {
      key: "elliptical",
      name_es: "Elíptica (Elliptical)",
      name_en: "Elliptical",
      image: "elliptical.jpg",
      desc_es: "Excelente para cardio de bajo impacto y trabajo de piernas.",
      desc_en: "Great for low-impact cardio and leg work.",
    },
    {
      key: "stepper",
      name_es: "Escaladora / Stepper",
      name_en: "Stepper",
      image: "stepper.jpg",
      desc_es: "Simula subir escaleras: fortalece glúteos y cuádriceps.",
      desc_en: "Simulates stair climbing: strengthens glutes and quads.",
    },
    {
      key: "jump-rope",
      name_es: "Cuerda de saltar",
      name_en: "Jump rope",
      image: "jump-rope.jpg",
      desc_es: "Cardio explosivo: mejora coordinación y quema calorías rápido.",
      desc_en: "Explosive cardio: improves coordination and burns calories fast.",
    },
    {
      key: "dumbbells",
      name_es: "Mancuernas",
      name_en: "Dumbbells",
      image: "dumbbells.jpg",
      desc_es: "Versátiles para press, curl, remo, sentadillas, etc.",
      desc_en: "Versatile for press, curl, row, squats, etc.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      {/* ──────────────────────────────────────────────────────────────────
           1) Título General
         ────────────────────────────────────────────────────────────────── */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {lang === "es" ? "Rutina Semanal" : "Weekly Routine"}
      </h1>

      {/* ──────────────────────────────────────────────────────────────────
           2) Sección: Rutina Diaria con Videos (Calistenia)
         ────────────────────────────────────────────────────────────────── */}
      {dias.map((diaNombre) => {
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
                    {/* Miniatura (placeholder) – más tarde usarás <img src={`/assets/images/${ej.file.replace(".mov", ".jpg")}`} … /> */}
                    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">
                        {lang === "es" ? "Video pronto" : "Video coming soon"}
                      </span>
                    </div>
                    {/* Video */}
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
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {lang === "es"
                          ? "3–4 series de 8–12 repeticiones"
                          : "3–4 sets of 8–12 reps"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* ──────────────────────────────────────────────────────────────────
           3) Sección: Plan de Cardio Semanal (Tiempos de ejercicio y descanso)
         ────────────────────────────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {lang === "es" ? "Plan de Cardio Semanal" : "Weekly Cardio Plan"}
        </h2>
        {dias.map((diaNombre) => {
          const clave = diaNombre.toLowerCase();
          const cardioDias = cardioSemanal[clave] || [];

          return (
            <div key={diaNombre} className="mb-10">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {diaNombre}
              </h3>
              {cardioDias.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">
                  {lang === "es"
                    ? "No hay plan de cardio para este día."
                    : "No cardio plan for this day."}
                </p>
              ) : (
                <table className="w-full table-auto bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-700">
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">#</th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                        {lang === "es" ? "Ejercicio" : "Exercise"}
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                        {lang === "es" ? "Duración" : "Duration"}
                      </th>
                      <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                        {lang === "es" ? "Descanso" : "Rest"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cardioDias.map((c, idx) => (
                      <tr
                        key={idx}
                        className={idx % 2 === 0
                          ? "bg-white dark:bg-gray-900"
                          : "bg-gray-50 dark:bg-gray-800"
                        }
                      >
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                          {lang === "es" ? c.ejercicio_es : c.ejercicio_en}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                          {c.duracion}
                        </td>
                        <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                          {c.descanso}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}
      </section>

      {/* ──────────────────────────────────────────────────────────────────
           4) Sección: Equipamiento / Máquinas para Cardio en Casa (Descripciones)
         ────────────────────────────────────────────────────────────────── */}
      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
          {lang === "es" ? "Equipamiento / Máquinas" : "Equipment / Machines"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipamientoCardio.map((eq) => (
            <div
              key={eq.key}
              className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow"
            >
              {/* Placeholder de imagen */}
              <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400">
                  {lang === "es" ? "Imagen pronto" : "Image coming soon"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                  {lang === "es" ? eq.name_es : eq.name_en}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  {lang === "es" ? eq.desc_es : eq.desc_en}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
