import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  const tablaAlimentos = [
    {
      alimento: lang === "es" ? "Avena integral" : "Steel-cut oats",
      porcion: "1 taza",
      calorias: 150,
      carb: "27g"
    },
    {
      alimento: lang === "es" ? "Pechuga de pollo" : "Chicken breast",
      porcion: "100 g",
      calorias: 165,
      carb: "0g"
    },
    {
      alimento: lang === "es" ? "Espinacas" : "Spinach",
      porcion: "1 taza",
      calorias: 7,
      carb: "1g"
    },
    {
      alimento: lang === "es" ? "Jarabe de arce (sin azúcar)" : "Sugar-free maple syrup",
      porcion: "1 cda",
      calorias: 10,
      carb: "0g"
    },
    {
      alimento: lang === "es" ? "Salmón" : "Salmon",
      porcion: "100 g",
      calorias: 206,
      carb: "0g"
    },
    {
      alimento: lang === "es" ? "Brócoli al vapor" : "Steamed broccoli",
      porcion: "1 taza",
      calorias: 55,
      carb: "11g"
    },
    {
      alimento: lang === "es" ? "Yogur griego sin grasa" : "Non-fat Greek yogurt",
      porcion: "1 taza",
      calorias: 100,
      carb: "6g"
    },
    {
      alimento: lang === "es" ? "Almendras" : "Almonds",
      porcion: "10 unidades",
      calorias: 70,
      carb: "2.5g"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {lang === "es" ? "Nutrición Saludable" : "Healthy Nutrition"}
      </h1>

      <p className="mb-4 text-gray-700 dark:text-gray-300">
        {lang === "es"
          ? "A continuación, una tabla de alimentos recomendados para controlar calorías y glucemia. Enfocado en prevención de Diabetes Tipo 1 y 2."
          : "Below is a table of recommended foods to manage calories and blood sugar. Focused on Type 1 & Type 2 Diabetes prevention."}
      </p>

      {/* ───────────────────────────── Tabla nutricional ───────────────────────────── */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                {lang === "es" ? "Alimento" : "Food"}
              </th>
              <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                {lang === "es" ? "Porción" : "Portion"}
              </th>
              <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                {lang === "es" ? "Calorías" : "Calories"}
              </th>
              <th className="border border-gray-300 dark:border-gray-700 p-2 text-left">
                {lang === "es" ? "Carbohidratos" : "Carbs"}
              </th>
            </tr>
          </thead>
          <tbody>
            {tablaAlimentos.map((item, idx) => (
              <tr
                key={idx}
                className={idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}
              >
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-gray-800 dark:text-gray-200">
                  {item.alimento}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-gray-800 dark:text-gray-200">
                  {item.porcion}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-gray-800 dark:text-gray-200">
                  {item.calorias}
                </td>
                <td className="border border-gray-300 dark:border-gray-700 p-2 text-gray-800 dark:text-gray-200">
                  {item.carb}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ───────────────────────── Pautas de ayuno intermitente ───────────────────────── */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {lang === "es" ? "Ayuno Intermitente" : "Intermittent Fasting"}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {lang === "es"
            ? "El ayuno 16:8 consiste en 16 horas de ayuno y 8 horas de ventana para comer. Ejemplo: comer solo entre 12:00 y 20:00."
            : "The 16:8 fasting protocol means 16 hours fasting and an 8-hour eating window. Example: eat only between 12:00 and 20:00."}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          {lang === "es"
            ? "Beneficios potenciales para Diabetes: mejora de sensibilidad a insulina, control de glucemia y pérdida de peso."
            : "Potential benefits for Diabetes: improved insulin sensitivity, better blood sugar control, and weight loss."}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          {lang === "es"
            ? "Nota: Consulta con tu médico antes de cambiar patrones de alimentación, especialmente si eres paciente con Diabetes."
            : "Note: Consult your doctor before changing eating patterns, especially if you have Diabetes."}
        </p>
      </div>
    </div>
  );
}
