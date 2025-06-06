// src/data/rutinaSemanal.js
export const rutinaSemanal = {
  lunes: [
    {
      nombre: "Sentadillas sin peso",
      video: "/assets/squat.mov",
      series: 4,
      duracionSerie: 60,   // 60 segundos cada serie
      descanso: 30,        // 30 segundos de descanso entre cada serie
      caloriasBase: 40,    // kcal que quema cada serie (sin factor de nivel)
    },
    {
      nombre: "Caminadora (en casa)",
      video: "/assets/treadmill.mov",
      // Para la caminadora, podríamos considerarla como 1 “serie” ininterrumpida de 600 s (10 min)
      series: 1,
      duracionSerie: 600,
      descanso: 0,
      caloriasBase: 100,   // kcal que quema cada 10 min (serie única)
    },
  ],
  martes: [
    {
      nombre: "Flexiones estándar",
      video: "/assets/pushup.mov",
      series: 4,
      duracionSerie: 45,
      descanso: 30,
      caloriasBase: 50,
    },
    {
      nombre: "Bicicleta estática (Gym Bike)",
      video: "/assets/bike.mov",
      series: 1,
      duracionSerie: 600,
      descanso: 0,
      caloriasBase: 80,
    },
  ],
  miércoles: [
    {
      nombre: "Dominadas asistidas",
      video: "/assets/assisted-pullup.mov",
      series: 3,
      duracionSerie: 45,
      descanso: 45,
      caloriasBase: 60,
    },
    {
      nombre: "Curl de bíceps con mancuernas",
      video: "/assets/bicep-curl.mov",
      series: 4,
      duracionSerie: 60,
      descanso: 30,
      caloriasBase: 30,
    },
  ],
  jueves: [
    {
      nombre: "Zancadas (Lunge)",
      video: "/assets/lunge.mov",
      series: 4,
      duracionSerie: 60,
      descanso: 30,
      caloriasBase: 45,
    },
    {
      nombre: "Curl con banda elástica",
      video: "/assets/elastic-curl.mov",
      series: 4,
      duracionSerie: 45,
      descanso: 30,
      caloriasBase: 25,
    },
  ],
  viernes: [
    {
      nombre: "Burpees",
      video: "/assets/burpee.mov",
      series: 4,
      duracionSerie: 60,
      descanso: 30,
      caloriasBase: 70,
    },
    {
      nombre: "Saltos con cuerda",
      video: "/assets/jumping-rope.mov",
      series: 4,
      duracionSerie: 60,
      descanso: 30,
      caloriasBase: 60,
    },
  ],
  sábado: [
    {
      nombre: "Yoga (movilidad)",
      video: "/assets/yoga.mov",
      series: 1,
      duracionSerie: 600,
      descanso: 0,
      caloriasBase: 20,
    },
  ],
  domingo: [
    {
      nombre: "Descanso activo",
      video: "/assets/rest.mov",
      series: 1,
      duracionSerie: 900,
      descanso: 0,
      caloriasBase: 15,
    },
  ],
};
