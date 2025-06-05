// src/pages/Home.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import Timer from "../components/Timer";

// Rutina semanal con datos “base” (duraciónBase en segundos, caloríasBase en kcal)
const rutinaSemanal = {
  lunes: [
    {
      nombre: "Sentadillas sin peso",
      video: "/assets/squat.mov",
      descripcion: [
        "Colócate de pie, pies al ancho de hombros.",
        "Baja las caderas flexionando rodillas como si te sentaras.",
        "Mantén espalda recta y mira al frente.",
        "Sube empujando con talones.",
      ],
      duracionBase: 60,    // 60 segundos por set “base”
      caloriasBase: 40,    // 40 kcal por ese set base
    },
    {
      nombre: "Caminadora (en casa)",
      video: "/assets/treadmill.mov",
      descripcion: [
        "Coloca la caminadora en piso firme.",
        "Empieza a paso lento (3-4 km/h) por 5 minutos de calentamiento.",
        "Aumenta a 5-6 km/h para ritmo moderado.",
        "Mantén 10 min y baja la velocidad para enfriar.",
      ],
      duracionBase: 600,   // 600 segundos = 10 min base
      caloriasBase: 100,   // 100 kcal por esos 10 min
    },
  ],
  martes: [
    {
      nombre: "Flexiones estándar",
      video: "/assets/pushup.mov",
      descripcion: [
        "Manos al suelo, ancho de hombros, cuerpo recto.",
        "Baja el pecho sin tocar el suelo manteniendo el core rígido.",
        "Empuja hasta extender brazos.",
        "Respira rítmicamente.",
      ],
      duracionBase: 45,    // 45 segundos base
      caloriasBase: 50,
    },
    {
      nombre: "Bicicleta estática (Gym Bike)",
      video: "/assets/bike.mov",
      descripcion: [
        "Ajusta altura de asiento, pedalea a ritmo moderado.",
        "Calienta 3-5 min, luego 10 min a intensidad media.",
        "Enfriar 2-3 min.",
      ],
      duracionBase: 600,   // 600 s = 10 minutos
      caloriasBase: 80,
    },
  ],
  miércoles: [
    {
      nombre: "Dominadas asistidas",
      video: "/assets/assisted-pullup.mov",
      descripcion: [
        "Coloca rodillas en banda elástica o máquina asistida.",
        "Agarra con las palmas hacia adelante, manos al ancho de hombros.",
        "Tira con la espalda hasta que la barbilla sobrepase la barra.",
        "Baja despacio hasta brazos extendidos.",
      ],
      duracionBase: 45,
      caloriasBase: 60,
    },
    {
      nombre: "Curl de bíceps con mancuernas",
      video: "/assets/bicep-curl.mov",
      descripcion: [
        "De pie, pies al ancho de hombros, mancuernas a los lados.",
        "Flexiona codos manteniendo bíceps contraídos y muñecas rectas.",
        "Sube hasta el hombro y baja lentamente.",
      ],
      duracionBase: 60,
      caloriasBase: 30,
    },
  ],
  jueves: [
    {
      nombre: "Zancadas (Lunge)",
      video: "/assets/lunge.mov",
      descripcion: [
        "Coloca un pie adelante y otro atrás en separación media.",
        "Baja rodilla trasera casi al suelo, mantén torso erguido.",
        "Empuja con la pierna delantera para regresar.",
        "Alterna con la otra pierna.",
      ],
      duracionBase: 60,
      caloriasBase: 45,
    },
    {
      nombre: "Curl con banda elástica",
      video: "/assets/elastic-curl.mov",
      descripcion: [
        "Pisa la banda, agarre con las palmas hacia arriba.",
        "Flexiona codos subiendo la banda hasta el hombro.",
        "Baja controladamente.",
      ],
      duracionBase: 45,
      caloriasBase: 25,
    },
  ],
  viernes: [
    {
      nombre: "Burpees",
      video: "/assets/burpee.mov",
      descripcion: [
        "De pie, baja a posición de cuclillas y manos al suelo.",
        "Patea pies atrás para posición de plancha.",
        "Realiza una flexión de brazos.",
        "Regresa pies a cuclillas y salta con brazos arriba.",
      ],
      duracionBase: 60,
      caloriasBase: 70,
    },
    {
      nombre: "Saltos con cuerda",
      video: "/assets/jumping-rope.mov",
      descripcion: [
        "Agarra las asas, cuerdas detrás de los pies.",
        "Salta con ambos pies a la vez, rodillas ligeramente flexionadas.",
        "Mantén ritmo constante por 1 min.",
      ],
      duracionBase: 60,
      caloriasBase: 60,
    },
  ],
  sábado: [
    {
      nombre: "Yoga (movilidad)",
      video: "/assets/yoga.mov",
      descripcion: [
        "Realiza saludos al sol: postura de montaña, perro hacia abajo, cobra.",
        "Mantén cada postura 20-30 seg.",
        "Focaliza en respiración profunda.",
      ],
      duracionBase: 600,   // 10 min
      caloriasBase: 20,
    },
  ],
  domingo: [
    {
      nombre: "Descanso activo",
      video: "/assets/rest.mov",
      descripcion: [
        "Camina 15–20 minutos a paso suave.",
        "Realiza estiramientos dinámicos ligeros (piernas, espalda).",
      ],
      duracionBase: 900,   // 15 min
      caloriasBase: 15,
    },
  ],
};

// Función para obtener factor de duración según nivel
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
// Función para obtener factor de calorías según nivel
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

export default function Home() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const todayIndex = new Date().getDay(); // 0 = domingo, 1 = lunes...
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const diaHoy = dias[todayIndex];
  const ejerciciosHoy = rutinaSemanal[diaHoy] || [];

  // Sacamos los factores de tiempo/calorías basados en profile.nivel
  const fDur = factorDuracion(profile.nivel);
  const fCal = factorCalorias(profile.nivel);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">
        {lang === "es"
          ? `Mi rutina de hoy (${diaHoy})`
          : `My routine for (${diaHoy})`}
      </h1>

      <div className="space-y-6">
        {ejerciciosHoy.length === 0 ? (
          <p className="text-gray-500">
            {lang === "es" ? "Descanso" : "Rest day"}
          </p>
        ) : (
          ejerciciosHoy.map((ej, idx) => {
            // Calculamos los valores ajustados
            const duracionAjustada = Math.round(ej.duracionBase * fDur); // segundos
            const caloriasAjustadas = Math.round(ej.caloriasBase * fCal);

            return (
              <div
                key={idx}
                className="border rounded-md p-4 shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-2xl font-semibold mb-2">{ej.nombre}</h2>
                {/* Video */}
                <video
                  src={ej.video}
                  controls
                  className="w-full rounded-md mb-2 bg-black"
                >
                  {lang === "es"
                    ? "Tu navegador no puede reproducir este video."
                    : "Your browser cannot play this video."}
                </video>
                {/* Descripción paso a paso */}
                <ol className="list-decimal list-inside text-gray-700 mb-3">
                  {ej.descripcion.map((paso, i) => (
                    <li key={i}>{paso}</li>
                  ))}
                </ol>
                {/* Temporizador automático usando duracionAjustada */}
                <div className="flex items-center space-x-4">
                  <Timer
                    durationSeconds={duracionAjustada}
                    nombreEjercicio={ej.nombre}
                    caloriasEstimadas={caloriasAjustadas}
                    diaClave={diaHoy}
                    onFinish={() =>
                      alert(
                        lang === "es"
                          ? `${ej.nombre} completado y registrado automáticamente.`
                          : `${ej.nombre} completed and logged automatically.`
                      )
                    }
                  />
                  <div>
                    <p className="text-sm text-gray-500">
                      {lang === "es"
                        ? `Duración: ${Math.round(duracionAjustada / 60)} min`
                        : `Duration: ${Math.round(duracionAjustada / 60)} min`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {lang === "es"
                        ? `Est. Calorías: ${caloriasAjustadas} kcal`
                        : `Est. Calories: ${caloriasAjustadas} kcal`}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="mt-6">
        <a href="/semana" className="text-blue-600 hover:underline">
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
          <a href="/perfil" className="text-yellow-800 font-semibold hover:underline">
            {lang === "es" ? "Ir a Perfil" : "Go to Profile"}
          </a>
        </div>
      )}
    </div>
  );
}
