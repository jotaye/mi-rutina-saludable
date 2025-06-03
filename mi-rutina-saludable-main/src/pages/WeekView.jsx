import React, { useContext } from "react";
import { AppContext } from "../App";

export default function WeekView() {
  const { lang } = useContext(AppContext);

  const daysNames = [
    lang === "es" ? "domingo" : "Sunday",
    lang === "es" ? "lunes" : "Monday",
    lang === "es" ? "martes" : "Tuesday",
    lang === "es" ? "miércoles" : "Wednesday",
    lang === "es" ? "jueves" : "Thursday",
    lang === "es" ? "viernes" : "Friday",
    lang === "es" ? "sábado" : "Saturday"
  ];

  const rutina = {
    lunes: [
      { name: lang === "es" ? "Jumping jacks" : "Jumping jacks", video: "/assets/jumping-jacks.mov" },
      { name: lang === "es" ? "Flexiones" : "Push-ups", video: "/assets/pushup.mov" },
      { name: lang === "es" ? "Sentadillas" : "Squats", video: "/assets/squat.mov" }
    ],
    martes: [
      { name: lang === "es" ? "Flexiones inclinadas" : "Incline push-ups", video: "/assets/incline-pushup.mov" },
      { name: lang === "es" ? "Press con pesas" : "Bench press", video: "/assets/bench-press.mov" }
    ],
    miércoles: [
      { name: lang === "es" ? "Sentadillas profundas" : "Deep squats", video: "/assets/deep-squat.mov" },
      { name: lang === "es" ? "Zancadas" : "Lunges", video: "/assets/lunge.mov" }
    ],
    jueves: [
      { name: lang === "es" ? "Dominadas asistidas" : "Assisted pull-ups", video: "/assets/assisted-pullup.mov" },
      { name: lang === "es" ? "Curl con pesas" : "Bicep curls", video: "/assets/bicep-curl.mov" }
    ],
    viernes: [
      { name: lang === "es" ? "Burpees" : "Burpees", video: "/assets/burpee.mov" },
      { name: lang === "es" ? "Sentadillas" : "Squats", video: "/assets/squat.mov" },
      { name: lang === "es" ? "Flexiones" : "Push-ups", video: "/assets/pushup.mov" }
    ],
    sábado: [
      { name: lang === "es" ? "Yoga o movilidad" : "Yoga or mobility", video: "/assets/yoga.mov" }
    ],
    domingo: [
      { name: lang === "es" ? "Descanso activo" : "Active rest", video: "/assets/rest.mov" }
    ]
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {lang === "es" ? "Rutina semanal" : "Weekly routine"}
      </h1>
      {Object.entries(rutina).map(([day, exercises], idx) => (
        <div key={idx} className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 capitalize text-gray-800 dark:text-gray-100">
            {daysNames[idx]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercises.map((ej, i) => (
              <div key={i} className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center">
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
