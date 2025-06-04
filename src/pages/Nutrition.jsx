// src/pages/Nutrition.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  // Ejemplo de tabla muy simple:
  const planNutricional = [
    { dia: "Lunes", calorias: 1800, comida: "Desayuno: avena, Almuerzo: ensalada, Cena: pescado" },
    { dia: "Martes", calorias: 1700, comida: "Desayuno: yogur, Almuerzo: pollo, Cena: verduras" },
    // ... completa para cada día
  ];

  return (
    <div className="min-h-screen p-4 bg-white dark:bg-gray-900">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        {lang === "es" ? "Nutrición" : "Nutrition"}
      </h1>

      <table className="w-full table-auto bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
              {lang === "es" ? "Día" : "Day"}
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
              {lang === "es" ? "Calorías (aprox.)" : "Calories (approx.)"}
            </th>
            <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
              {lang === "es" ? "Plan alimenticio" : "Meal plan"}
            </th>
          </tr>
        </thead>
        <tbody>
          {planNutricional.map((item, idx) => (
            <tr
              key={idx}
              className={
                idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
              }
            >
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{item.dia}</td>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{item.calorias}</td>
              <td className="border px-4 py-2 text-gray-700 dark:text-gray-300">{item.comida}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
