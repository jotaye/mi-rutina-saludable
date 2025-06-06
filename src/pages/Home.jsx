// src/pages/Home.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import { rutinaSemanal } from "../data/rutinaSemanal";

// Aquí definimos un plan alimenticio “carnívoro con ayuno intermitente” para cada día.
// Cada entrada incluye: nombre de la comida, texto descriptivo y la ruta a la imagen correspondiente.
const mealPlans = {
  lunes: [
    {
      nombre: "Desayuno",
      texto: "3 huevos revueltos con aguacate y un toque de sal marina.",
      img: "/assets/nutrition/eggs-avocado.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Filete de res a la parrilla con ensalada verde (rúcula, espinaca) aderezada con aceite de oliva.",
      img: "/assets/nutrition/steak-salad.jpg",
    },
    {
      nombre: "Cena",
      texto: "Pescado al horno con espárragos y un chorrito de limón. Un vaso grande de agua.",
      img: "/assets/nutrition/fish-asparagus.jpg",
    },
  ],
  martes: [
    {
      nombre: "Desayuno",
      texto: "2 huevos fritos en mantequilla clarificada con tocino de cerdo sin aditivos.",
      img: "/assets/nutrition/eggs-bacon.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Chuletas de cerdo al horno con verduras al vapor (brócoli, calabacín).",
      img: "/assets/nutrition/pork-veggies.jpg",
    },
    {
      nombre: "Cena",
      texto: "Camaron al ajillo con aguacate y hojas verdes. Un vaso de agua con hielo.",
      img: "/assets/nutrition/shrimp-avocado.jpg",
    },
  ],
  miércoles: [
    {
      nombre: "Desayuno",
      texto: "Restos de carne asada del día anterior acompañados de un huevo pochado.",
      img: "/assets/nutrition/leftovers-meat.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Omelette de 3 huevos con aguacate y espinacas salteadas en aceite de oliva.",
      img: "/assets/nutrition/omlette-avocado.jpg",
    },
    {
      nombre: "Cena",
      texto: "Filete de res a la plancha con mantequilla y champiñones salteados.",
      img: "/assets/nutrition/steak-eggs.jpg",
    },
  ],
  jueves: [
    {
      nombre: "Desayuno",
      texto: "Camarones salteados en aceite de coco con aguacate en láminas.",
      img: "/assets/nutrition/shrimp-salad.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Media manzana con 10 almendras (snack bajo en carbohidratos).",
      img: "/assets/nutrition/fruit-nuts.jpg",
    },
    {
      nombre: "Cena",
      texto: "Sopa de caldo de huesos con trozos de pollo y un chorrito de limón.",
      img: "/assets/nutrition/meat-broth.jpg",
    },
  ],
  viernes: [
    {
      nombre: "Desayuno",
      texto: "Restos de costilla de cerdo asada acompañada de pepino en rodajas.",
      img: "/assets/nutrition/leftovers-pork.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Pechuga de pollo asada con verduras al horno (pimiento, berenjena).",
      img: "/assets/nutrition/chicken-veg.jpg",
    },
    {
      nombre: "Cena",
      texto: "Filete de res con espárragos al vapor y aceite de oliva de primera prensada.",
      img: "/assets/nutrition/beef-veg.jpg",
    },
  ],
  sábado: [
    {
      nombre: "Desayuno",
      texto: "Pescado al vapor con un chorrito de limón y aguacate en cubos.",
      img: "/assets/nutrition/fish-veg.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Huevos revueltos con salmón ahumado y queso crema (sin azúcares añadidos).",
      img: "/assets/nutrition/eggs-avocado.jpg",
    },
    {
      nombre: "Cena",
      texto: "Steak de res con mantequilla de hierbas y ensalada de hojas verdes.",
      img: "/assets/nutrition/steak-salad.jpg",
    },
  ],
  domingo: [
    {
      nombre: "Desayuno",
      texto: "Medio aguacate acompañado de jamón serrano y un huevo cocido.",
      img: "/assets/nutrition/eggs-bacon.jpg",
    },
    {
      nombre: "Almuerzo",
      texto: "Costillas de cerdo en salsa ligera de tomate natural + espinacas salteadas.",
      img: "/assets/nutrition/pork-veggies.jpg",
    },
    {
      nombre: "Cena",
      texto: "Salmón a la plancha con calabacín asado y un vaso grande de agua.",
      img: "/assets/nutrition/shrimp-avocado.jpg",
    },
  ],
};

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
  const menuHoy = mealPlans[diaHoy] || [];

  return (
    <div className="p-6 space-y-10">
      {/* 1. Título y Ejercicios */}
      <div>
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

                {/* Descripción (si existe) */}
                {ej.descripcion && (
                  <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
                    {ej.descripcion.map((paso, i) => (
                      <li key={i}>{paso}</li>
                    ))}
                  </ol>
                )}

                {/* Información de series */}
                <div className="mb-4 text-gray-700">
                  <p>
                    <strong>
                      {lang === "es" ? "Series:" : "Sets:"}{" "}
                    </strong>
                    {ej.series}{" "}
                    {lang === "es" ? "×" : "×"}{" "}
                    {Math.round(ej.duracionSerie / 60)}{" "}
                    {lang === "es"
                      ? "min cada serie"
                      : "min per set"}
                  </p>
                  <p>
                    <strong>
                      {lang === "es" ? "Descanso:" : "Rest:"}{" "}
                    </strong>
                    {ej.descanso}{" "}
                    {lang === "es" ? "s" : "s"}
                  </p>
                </div>

                {/* Temporizador de series */}
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
      </div>

      {/* 2. Plan alimenticio para hoy */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          {lang === "es"
            ? "Plan alimenticio para hoy"
            : "Today's Meal Plan"}
        </h2>

        {menuHoy.length === 0 ? (
          <p className="text-gray-500">
            {lang === "es"
              ? "No hay plan alimenticio para hoy."
              : "No meal plan for today."}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuHoy.map((comida, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={comida.img}
                  alt={comida.nombre}
                  className="w-full h-48 object-cover rounded-b-none rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">
                    {comida.nombre}
                  </h3>
                  <p className="text-gray-700">
                    {comida.texto}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Remitir al usuario a “Semana” y “Nutrición” si no completó perfil */}
      <div className="mt-8">
        <a
          href="/semana"
          className="text-blue-600 hover:underline mr-6"
        >
          {lang === "es" ? "Ver toda la semana" : "See full week"}
        </a>
        <a
          href="/nutricion"
          className="text-blue-600 hover:underline"
        >
          {lang === "es" ? "Ir a Nutrición" : "Go to Nutrition"}
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
