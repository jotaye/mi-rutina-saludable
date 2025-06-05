// src/pages/WeekView.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import Timer from "../components/Timer";

// Reutilizamos el mismo objeto de rutinaSemanal de Home.jsx
const rutinaSemanal = {
  lunes: [
    {
      nombre: "Sentadillas sin peso",
      video: "/assets/squat.mov",
      descripcion: [],
    },
    {
      nombre: "Caminadora (en casa)",
      video: "/assets/treadmill.mov",
      descripcion: [],
    },
  ],
  martes: [
    {
      nombre: "Flexiones estándar",
      video: "/assets/pushup.mov",
      descripcion: [],
    },
    {
      nombre: "Bicicleta estática (Gym Bike)",
      video: "/assets/bike.mov",
      descripcion: [],
    },
  ],
  miércoles: [
    {
      nombre: "Dominadas asistidas",
      video: "/assets/assisted-pullup.mov",
      descripcion: [],
    },
    {
      nombre: "Curl de bíceps con mancuernas",
      video: "/assets/bicep-curl.mov",
      descripcion: [],
    },
  ],
  jueves: [
    {
      nombre: "Zancadas (Lunge)",
      video: "/assets/lunge.mov",
      descripcion: [],
    },
    {
      nombre: "Curl con banda elástica",
      video: "/assets/elastic-curl.mov",
      descripcion: [],
    },
  ],
  viernes: [
    {
      nombre: "Burpees",
      video: "/assets/burpee.mov",
      descripcion: [],
    },
    {
      nombre: "Saltos con cuerda",
      video: "/assets/jumping-rope.mov",
      descripcion: [],
    },
  ],
  sábado: [
    {
      nombre: "Yoga (movilidad)",
      video: "/assets/yoga.mov",
      descripcion: [],
    },
  ],
  domingo: [
    {
      nombre: "Descanso activo",
      video: "/assets/rest.mov",
      descripcion: [],
    },
  ],
};

export default function WeekView() {
  const { lang } = useContext(AppContext);
  const dias = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"];

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Rutina semanal" : "Weekly Routine"}
      </h1>
      {dias.map((dia) => (
        <div key={dia}>
          <h2 className="text-2xl font-semibold capitalize mb-3">{dia}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rutinaSemanal[dia].map((ej, idx) => (
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
                  {ej.descripcion.length > 0 && (
                    <ul className="list-disc list-inside text-gray-600 text-sm mt-2">
                      {ej.descripcion.map((paso, i) => (
                        <li key={i}>{paso}</li>
                      ))}
                    </ul>
                  )}
                  <div className="mt-3">
                    <Timer
                      durationSeconds={60}
                      onFinish={() => alert(`${ej.nombre} complete!`)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
