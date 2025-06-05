// src/pages/Nutrition.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  // Datos estáticos de ejemplo: plan nutricional para cada día de la semana
  const planNutricional = [
    {
      dia: "Lunes",
      calorias: 1800,
      detalle: "Desayuno: avena con frutas · Almuerzo: pechuga de pollo y verduras · Cena: pescado a la plancha con ensalada",
    },
    {
      dia: "Martes",
      calorias: 1700,
      detalle: "Desayuno: yogur y granola · Almuerzo: ensalada de atún · Cena: salteado de verduras con tofu",
    },
    {
      dia: "Miércoles",
      calorias: 1750,
      detalle: "Desayuno: smoothie verde · Almuerzo: wrap de pollo con vegetales · Cena: salmón al horno con brócoli",
    },
    {
      dia: "Jueves",
      calorias: 1800,
      detalle: "Desayuno: huevos revueltos con espinacas · Almuerzo: arroz integral con pollo · Cena: sopa de verduras",
    },
    {
      dia: "Viernes",
      calorias: 1850,
      detalle: "Desayuno: avena y frutos secos · Almuerzo: pechuga de pavo con ensalada · Cena: pasta integral con vegetales",
    },
    {
      dia: "Sábado",
      calorias: 1900,
      detalle: "Desayuno: pan integral con aguacate · Almuerzo: ensalada de quinoa · Cena: pescado al vapor con vegetales",
    },
    {
      dia: "Domingo",
      calorias: 1600,
      detalle: "Desayuno: licuado de frutas · Almuerzo: pollo a la plancha con ensalada · Cena: frutas variadas y yogurt",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        {lang === "es" ? "Nutrición" : "Nutrition"}
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border text-left">Día</th>
              <th className="px-4 py-2 border text-left">
                {lang === "es" ? "Calorías (aprox.)" : "Calories (approx.)"}
              </th>
              <th className="px-4 py-2 border text-left">
                {lang === "es" ? "Plan alimenticio" : "Meal Plan"}
              </th>
            </tr>
          </thead>
          <tbody>
            {planNutricional.map((item) => (
              <tr key={item.dia} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{item.dia}</td>
                <td className="px-4 py-2 border">{item.calorias}</td>
                <td className="px-4 py-2 border">{item.detalle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
