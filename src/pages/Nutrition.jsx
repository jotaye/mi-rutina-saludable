// src/pages/Nutrition.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";

export default function Nutrition() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  // Plan nutricional enfocado a diabéticos, con ayuno intermitente y dieta carnívora
  const planNutricional = [
    {
      dia: "Lunes",
      calorias: 1800,
      detalle:
        "07:00 – Desayuno (Carnívoro): 2 huevos revueltos con tocino. 12:00 – Ayuno. 16:00 – Almuerzo (Carnívoro): Filete de res a la plancha, ensalada verde con aceite de oliva. 20:00 – Cena (Ligera): Yogur natural sin azúcar con nueces.",
      tips:
        "Bebe 2–3 L de agua. Si tomas café, sin azúcar. Controla tu nivel de glucosa antes de comer.",
      ayuno: "12:00–16:00",
    },
    {
      dia: "Martes",
      calorias: 1700,
      detalle:
        "07:00 – Desayuno (Ligeramente Carnívoro): Yogur griego sin azúcar con arándanos. 12:00 – Ayuno. 16:00 – Almuerzo (Mixto): Pechuga de pollo asada con espinacas. 20:00 – Cena (Carnívoro): Salmón al horno con mantequilla.",
      tips:
        "Incluye 30 min de caminata rápida antes de la primera comida. Controla porciones de carbohidratos.",
      ayuno: "12:00–16:00",
    },
    {
      dia: "Miércoles",
      calorias: 1750,
      detalle:
        "07:00 – Desayuno: 2 huevos duros y 1 aguacate. 12:00 – Ayuno. 16:00 – Almuerzo (Carnívoro): Costillas de cerdo al grill + brócoli al vapor. 20:00 – Cena: Sopa de hueso (bone broth).",
      tips:
        "Evita pan, arroz o pasta. Mantén niveles de sodio controlados si estás en dieta cetogénica.",
      ayuno: "12:00–16:00",
    },
    {
      dia: "Jueves",
      calorias: 1800,
      detalle:
        "07:00 – Desayuno: Omelette con espinacas y queso. 12:00 – Ayuno. 16:00 – Almuerzo: Ensalada César sin crutones + pollo a la plancha. 20:00 – Cena: Chuletas de cordero con ensalada de pepino.",
      tips:
        "Revisa tu glucemia antes y 2 horas después de las comidas. Ajusta la insulina según lo necesites.",
      ayuno: "12:00–16:00",
    },
    {
      dia: "Viernes",
      calorias: 1850,
      detalle:
        "07:00 – Desayuno: Batido proteico sin azúcar (proteína en polvo, leche de almendra). 12:00 – Ayuno. 16:00 – Almuerzo: Albóndigas de res con ensalada verde. 20:00 – Cena: Pechuga de pavo al horno con espárragos.",
      tips:
        "Incorpora 15 min de HIIT ligero antes del breakfast para mejorar sensibilidad a la insulina.",
      ayuno: "12:00–16:00",
    },
    {
      dia: "Sábado",
      calorias: 1900,
      detalle:
        "08:00 – Desayuno: Jamón serrano con queso Manchego. 13:00 – Almuerzo (interrumpir ayuno): Hamburguesa de carne sin pan, con lechuga y tomate. 20:00 – Cena: Pescado blanco con coles de Bruselas asadas.",
      tips:
        "Si sientes hipoglucemia, rompe ayuno con media manzana y una cucharada de mantequilla de maní.",
      ayuno: "08:00–13:00",
    },
    {
      dia: "Domingo",
      calorias: 1600,
      detalle:
        "08:00 – Desayuno: 2 huevos estrellados con salchicha de pavo. 13:00 – Almuerzo: Sopa de verduras con pollo. 19:00 – Cena: Yogur griego con semillas de chía y un puñado de nueces.",
      tips:
        "Chequea tus niveles de glucosa cada 2 horas después de las principales comidas.",
      ayuno: "19:00–08:00",
    },
  ];

  // Si el perfil no está completo, avisar que primero debe configurar datos
  if (!profile.nombre) {
    return (
      <div className="p-6 bg-yellow-50 rounded-md border-l-4 border-yellow-400 mx-4">
        <p className="text-yellow-800">
          {lang === "es"
            ? "Para ver planes nutricionales personalizados, completa tu perfil."
            : "To see personalized meal plans, please complete your profile."}
        </p>
        <a
          href="/perfil"
          className="text-yellow-800 font-semibold hover:underline"
        >
          {lang === "es" ? "Ir a Perfil" : "Go to Profile"}
        </a>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Nutrición para diabetes" : "Diabetes Nutrition"}
      </h1>
      <p className="mb-4 text-gray-700">
        {lang === "es"
          ? "Estas recomendaciones están diseñadas para personas con Diabetes Tipo 1 o 2, usando ayuno intermitente y enfoque carnívoro/mixto."
          : "These recommendations are tailored for Type 1 or Type 2 diabetics, using intermittent fasting and carnivore/mixed diet."}
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border text-left">Día</th>
              <th className="px-4 py-2 border text-left">
                {lang === "es" ? "Calorías (aprox.)" : "Calories (approx.)"}
              </th>
              <th className="px-4 py-2 border text-left">
                {lang === "es" ? "Plan alimenticio" : "Meal Plan"}
              </th>
              <th className="px-4 py-2 border text-left">
                {lang === "es" ? "Tips para diabéticos" : "Diabetes Tips"}
              </th>
              <th className="px-4 py-2 border text-left">
                {lang === "es" ? "Horario de ayuno" : "Fasting Window"}
              </th>
            </tr>
          </thead>
          <tbody>
            {planNutricional.map((item) => (
              <tr key={item.dia} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{item.dia}</td>
                <td className="px-4 py-2 border">{item.calorias}</td>
                <td className="px-4 py-2 border whitespace-pre-line">{item.detalle}</td>
                <td className="px-4 py-2 border">{item.tips}</td>
                <td className="px-4 py-2 border">{item.ayuno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
