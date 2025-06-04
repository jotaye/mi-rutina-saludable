// src/pages/Home.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Home() {
  const { lang } = useContext(AppContext);

  const dias = [
    lang === "es" ? "domingo" : "Sunday",
    lang === "es" ? "lunes" : "Monday",
    lang === "es" ? "martes" : "Tuesday",
    lang === "es" ? "miércoles" : "Wednesday",
    lang === "es" ? "jueves" : "Thursday",
    lang === "es" ? "viernes" : "Friday",
    lang === "es" ? "sábado" : "Saturday",
  ];
  const hoy = new Date().getDay();
  const diaHoy = dias[hoy];

  // Rutina por defecto del día (solo para Home, sin timer)
  const rutina = {
    lunes: ["Jumping jacks - 2 min", "Flexiones - 4x10", "Sentadillas con mancuerna - 3x10"],
    martes: ["Flexiones inclinadas - 4x12", "Press con pesas - 3x10"],
    miercoles: ["Sentadillas sin peso - 4x15", "Zancadas - 3x12 por pierna"],
    jueves: ["Dominadas asistidas - 3x8", "Curl con pesas - 3x12"],
    viernes: ["20 burpees", "15 sentadillas con salto", "10 flexiones explosivas"],
    sabado: ["Yoga / Movilidad 20 min"],
    domingo: ["Descanso activo"],
  };

  const ejercicios = rutina[diaHoy] || ["Descanso"];

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-gray-100">
        {lang === "es"
          ? `Mi rutina de hoy (${diaHoy})`
          : `My routine for today (${diaHoy})`}
      </h1>
      <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300">
        {ejercicios.map((ej, idx) => (
          <li key={idx}>{ej}</li>
        ))}
      </ul>
      <a
        href="/semana"
        className="text-blue-500 underline mt-4 inline-block"
      >
        {lang === "es" ? "Ver toda la semana" : "See full week"}
      </a>
    </div>
  );
}
