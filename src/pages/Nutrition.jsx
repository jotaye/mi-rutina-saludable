// src/pages/Nutrition.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  // 1) Plan nutricional diario (Diabetes Tipo 1/2)
  const planNutricional = {
    lunes: {
      desayuno: {
        comida_es: "Avena con arándanos y almendras",
        comida_en: "Oatmeal with blueberries & almonds",
        calorias: 300,
      },
      snack_manana: {
        comida_es: "Yogur griego natural (sin azúcar)",
        comida_en: "Plain Greek yogurt (no added sugar)",
        calorias: 100,
      },
      almuerzo: {
        comida_es: "Ensalada de pollo, espinacas, tomate y aguacate",
        comida_en: "Chicken salad with spinach, tomato & avocado",
        calorias: 450,
      },
      snack_tarde: {
        comida_es: "Zanahorias baby con hummus",
        comida_en: "Baby carrots with hummus",
        calorias: 150,
      },
      cena: {
        comida_es: "Salmón al horno con brócoli al vapor",
        comida_en: "Baked salmon with steamed broccoli",
        calorias: 400,
      },
      total_calorias: 1400,
    },
    martes: {
      desayuno: {
        comida_es: "Batido de proteína con espinacas y fresas",
        comida_en: "Protein smoothie with spinach & strawberries",
        calorias: 320,
      },
      snack_manana: {
        comida_es: "Manzana verde",
        comida_en: "Green apple",
        calorias: 80,
      },
      almuerzo: {
        comida_es: "Pechuga de pavo con quinoa y verduras asadas",
        comida_en: "Turkey breast with quinoa & roasted veggies",
        calorias: 480,
      },
      snack_tarde: {
        comida_es: "Puñado de nueces mixtas",
        comida_en: "Handful of mixed nuts",
        calorias: 180,
      },
      cena: {
        comida_es: "Tortilla de claras con espinacas y champiñones",
        comida_en: "Egg white omelette with spinach & mushrooms",
        calorias: 350,
      },
      total_calorias: 1410,
    },
    miercoles: {
      desayuno: {
        comida_es: "Yogur griego con granola sin azúcar",
        comida_en: "Greek yogurt with sugar-free granola",
        calorias: 300,
      },
      snack_manana: {
        comida_es: "Pepino en rodajas",
        comida_en: "Cucumber slices",
        calorias: 50,
      },
      almuerzo: {
        comida_es: "Filete de tilapia con ensalada verde",
        comida_en: "Tilapia fillet with green salad",
        calorias: 420,
      },
      snack_tarde: {
        comida_es: "Batido verde (espinacas, pepino, limón)",
        comida_en: "Green smoothie (spinach, cucumber, lemon)",
        calorias: 120,
      },
      cena: {
        comida_es: "Sopa de verduras con lentejas",
        comida_en: "Vegetable and lentil soup",
        calorias: 380,
      },
      total_calorias: 1270,
    },
    jueves: {
      desayuno: {
        comida_es: "Tostada integral con aguacate y huevo poché",
        comida_en: "Whole-wheat toast with avocado & poached egg",
        calorias: 350,
      },
      snack_manana: {
        comida_es: "Naranja",
        comida_en: "Orange",
        calorias: 70,
      },
      almuerzo: {
        comida_es: "Pechuga de pollo a la plancha con ensalada de kale",
        comida_en: "Grilled chicken breast with kale salad",
        calorias: 430,
      },
      snack_tarde: {
        comida_es: "Palitos de apio con mantequilla de almendra",
        comida_en: "Celery sticks with almond butter",
        calorias: 150,
      },
      cena: {
        comida_es: "Tacos de lechuga con carne magra y pico de gallo",
        comida_en: "Lettuce tacos with lean meat & pico de gallo",
        calorias: 360,
      },
      total_calorias: 1360,
    },
    viernes: {
      desayuno: {
        comida_es: "Batido de proteína con espinacas y banana",
        comida_en: "Protein smoothie with spinach & banana",
        calorias: 330,
      },
      snack_manana: {
        comida_es: "Yogur griego con miel (una cucharadita)",
        comida_en: "Greek yogurt with honey (1 tsp)",
        calorias: 120,
      },
      almuerzo: {
        comida_es: "Ensalada de atún con garbanzos y verduras",
        comida_en: "Tuna salad with chickpeas & veggies",
        calorias: 450,
      },
      snack_tarde: {
        comida_es: "Puñado de almendras",
        comida_en: "Handful of almonds",
        calorias: 170,
      },
      cena: {
        comida_es: "Sopa de calabaza y zanahoria",
        comida_en: "Pumpkin & carrot soup",
        calorias: 300,
      },
      total_calorias: 1370,
    },
    sabado: {
      desayuno: {
        comida_es: "Huevos revueltos con espinacas",
        comida_en: "Scrambled eggs with spinach",
        calorias: 320,
      },
      snack_manana: {
        comida_es: "Frutos rojos",
        comida_en: "Mixed berries",
        calorias: 90,
      },
      almuerzo: {
        comida_es: "Salmón a la plancha con ensalada de pepino",
        comida_en: "Grilled salmon with cucumber salad",
        calorias: 460,
      },
      snack_tarde: {
        comida_es: "Smoothie de pepino y piña",
        comida_en: "Cucumber & pineapple smoothie",
        calorias: 130,
      },
      cena: {
        comida_es: "Pechuga de pavo con espárragos al vapor",
        comida_en: "Turkey breast with steamed asparagus",
        calorias: 380,
      },
      total_calorias: 1380,
    },
    domingo: {
      desayuno: {
        comida_es: "Avena integral con canela y manzana",
        comida_en: "Oats with cinnamon & apple",
        calorias: 310,
      },
      snack_manana: {
        comida_es: "Yogur griego con frutos rojos",
        comida_en: "Greek yogurt with berries",
        calorias: 110,
      },
      almuerzo: {
        comida_es: "Ensalada de garbanzos con verduras mixtas",
        comida_en: "Chickpea salad with mixed veggies",
        calorias: 420,
      },
      snack_tarde: {
        comida_es: "Palitos de zanahoria",
        comida_en: "Carrot sticks",
        calorias: 60,
      },
      cena: {
        comida_es: "Sopa minestrone light",
        comida_en: "Light minestrone soup",
        calorias: 350,
      },
      total_calorias: 1250,
    },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        {lang === "es" ? "Plan Nutricional" : "Nutrition Plan"}
      </h1>

      {Object.entries(planNutricional).map(([diaClave, info]) => {
        const diaNombre = diaClave.charAt(0).toUpperCase() + diaClave.slice(1);
        const diaEn = {
          lunes: "Monday",
          martes: "Tuesday",
          miercoles: "Wednesday",
          jueves: "Thursday",
          viernes: "Friday",
          sabado: "Saturday",
          domingo: "Sunday",
        }[diaClave];
        const tituloDia = lang === "es" ? diaNombre : diaEn;

        return (
          <section key={diaClave} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
              {tituloDia}
            </h2>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-700">
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Comida" : "Meal"}
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Descripción" : "Description"}
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Calorías" : "Calories"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Desayuno */}
                  <tr className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Desayuno" : "Breakfast"}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es"
                        ? info.desayuno.comida_es
                        : info.desayuno.comida_en}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {info.desayuno.calorias}
                    </td>
                  </tr>
                  {/* Snack mañana */}
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Snack mañana" : "Morning snack"}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es"
                        ? info.snack_manana.comida_es
                        : info.snack_manana.comida_en}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {info.snack_manana.calorias}
                    </td>
                  </tr>
                  {/* Almuerzo */}
                  <tr className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Almuerzo" : "Lunch"}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es"
                        ? info.almuerzo.comida_es
                        : info.almuerzo.comida_en}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {info.almuerzo.calorias}
                    </td>
                  </tr>
                  {/* Snack tarde */}
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Snack tarde" : "Afternoon snack"}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es"
                        ? info.snack_tarde.comida_es
                        : info.snack_tarde.comida_en}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {info.snack_tarde.calorias}
                    </td>
                  </tr>
                  {/* Cena */}
                  <tr className="bg-white dark:bg-gray-900">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Cena" : "Dinner"}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? info.cena.comida_es : info.cena.comida_en}
                    </td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {info.cena.calorias}
                    </td>
                  </tr>
                  {/* Total Calorías */}
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">
                      {lang === "es" ? "Total calorías" : "Total calories"}
                    </td>
                    <td className="px-4 py-2" />
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200 font-semibold">
                      {info.total_calorias}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </div>
  );
}
