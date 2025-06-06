// src/pages/Nutrition.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-12 font-serif">
      <h1 className="text-3xl font-bold text-center">
        {lang === "es" ? "Nutrición Saludable para Diabéticos" : "Healthy Nutrition for Diabetics"}
      </h1>

      {/* Imagen de encabezado */}
      <div className="flex justify-center">
        <img
          src="/assets/nutrition/avocado-bowl.jpg"
          alt="Nutrición Diabéticos"
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>

      {/* 1. Introducción */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. {lang === "es" ? "Introducción" : "Introduction"}</h2>
        <p className="font-sans text-gray-700 leading-relaxed">
          {lang === "es"
            ? "En personas con diabetes tipo 1 o tipo 2, la alimentación juega un papel fundamental para controlar los niveles de glucosa y prevenir complicaciones a largo plazo. Aquí encontrarás pautas, tips y ejemplos de menús que combinan el ejercicio con una dieta adecuada para mantener un metabolismo estable."
            : "For individuals with type 1 or type 2 diabetes, nutrition is crucial to keep blood glucose levels stable and avoid long-term complications. Below you’ll find guidelines, tips, and sample meal plans that combine exercise with an appropriate diet for stable metabolism."}
        </p>
      </section>

      {/* 2. Principios Básicos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. {lang === "es" ? "Principios Básicos" : "Basic Principles"}</h2>
        <ul className="list-disc list-inside font-sans text-gray-700 space-y-2">
          <li>
            <strong>{lang === "es" ? "Control de carbohidratos:" : "Carbohydrate control:"}</strong>{" "}
            {lang === "es"
              ? "Elige carbohidratos de índice glucémico bajo o moderado (verduras de hoja verde, avena integral, legumbres). Evita pan blanco, arroz blanco y azúcares refinados."
              : "Choose low or moderate glycemic-index carbs (leafy greens, steel-cut oats, legumes). Avoid white bread, white rice, and refined sugars."}
          </li>
          <li>
            <strong>{lang === "es" ? "Proteínas magras:" : "Lean proteins:"}</strong>{" "}
            {lang === "es"
              ? "Incluye fuentes como pechuga de pollo, pavo, pescado, huevos y cortes magros de res. Ayuda a mantener saciedad y preservar masa muscular."
              : "Include options like chicken breast, turkey, fish, eggs, and lean cuts of beef. Helps with satiety and muscle preservation."}
          </li>
          <li>
            <strong>{lang === "es" ? "Grasas saludables:" : "Healthy fats:"}</strong>{" "}
            {lang === "es"
              ? "Opta por aguacate, aceite de oliva extra virgen, frutos secos en porciones moderadas y semillas (chía, linaza). Regulan la absorción de carbohidratos."
              : "Opt for avocado, extra-virgin olive oil, nuts (in moderation), and seeds (chia, flax). They help regulate carbohydrate absorption."}
          </li>
          <li>
            <strong>{lang === "es" ? "Fibra:" : "Fiber:"}</strong>{" "}
            {lang === "es"
              ? "Consume verduras, frutas enteras (no en jugo) y legumbres. La fibra mejora la sensibilidad a la insulina y retrasa el pico de glucosa."
              : "Eat vegetables, whole fruits (not juiced), and legumes. Fiber improves insulin sensitivity and delays glucose spikes."}
          </li>
        </ul>
      </section>

      {/* 3. Ejemplo de Plan de Comidas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. {lang === "es" ? "Ejemplo de Plan de Comidas" : "Sample Meal Plan"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Desayuno */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/assets/nutrition/eggs-avocado.jpg"
              alt="Desayuno"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{lang === "es" ? "Desayuno" : "Breakfast"}</h3>
              <ul className="list-disc list-inside font-sans text-gray-700 space-y-1">
                <li>
                  {lang === "es"
                    ? "Avena integral con leche descremada, trozos de almendra y bayas frescas."
                    : "Steel-cut oats with skim milk, chopped almonds, and fresh berries."}
                </li>
                <li>
                  {lang === "es"
                    ? "Omelette de claras con espinaca, tomate y champiñones + una rebanada de pan integral."
                    : "Egg-white omelette with spinach, tomato, and mushrooms, plus one slice of whole-grain toast."}
                </li>
              </ul>
            </div>
          </div>
          {/* Media mañana */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/assets/nutrition/yogurt-chia.jpg"
              alt="Media mañana"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{lang === "es" ? "Media mañana" : "Mid-Morning Snack"}</h3>
              <p className="font-sans text-gray-700">
                {lang === "es"
                  ? "Yogur griego descremado sin azúcar + una cucharada de semillas de chía."
                  : "Nonfat Greek yogurt (unsweetened) + one tablespoon of chia seeds."}
              </p>
            </div>
          </div>
          {/* Almuerzo */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/assets/nutrition/steak-salad.jpg"
              alt="Almuerzo"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{lang === "es" ? "Almuerzo" : "Lunch"}</h3>
              <ul className="list-disc list-inside font-sans text-gray-700 space-y-1">
                <li>
                  {lang === "es"
                    ? "Pechuga de pollo a la plancha + ensalada mixta (lechuga, pepino, pepinillo) con aceite de oliva y limón."
                    : "Grilled chicken breast + mixed salad (lettuce, cucumber, pickles) with olive oil & lemon dressing."}
                </li>
                <li>
                  {lang === "es"
                    ? "Alternativa vegetariana: Ensalada de garbanzos con pimientos, cebolla, tomate y perejil + vinagreta ligera."
                    : "Vegetarian alternative: Chickpea salad with bell peppers, onion, tomato, and parsley + light vinaigrette."}
                </li>
              </ul>
            </div>
          </div>
          {/* Merienda */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/assets/nutrition/fruit-nuts.jpg"
              alt="Merienda"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{lang === "es" ? "Merienda" : "Afternoon Snack"}</h3>
              <p className="font-sans text-gray-700">
                {lang === "es"
                  ? "Una pieza de fruta de bajo índice glucémico (manzana o pera) + 10 almendras."
                  : "One low-GI fruit (apple or pear) + 10 almonds."}
              </p>
            </div>
          </div>
          {/* Cena */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src="/assets/nutrition/fish-asparagus.jpg"
              alt="Cena"
              className="w-full h-32 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{lang === "es" ? "Cena" : "Dinner"}</h3>
              <ul className="list-disc list-inside font-sans text-gray-700 space-y-1">
                <li>
                  {lang === "es"
                    ? "Filete de salmón al horno + brócoli al vapor + batata al horno (porción moderada)."
                    : "Baked salmon fillet + steamed broccoli + roasted sweet potato (moderate portion)."}
                </li>
                <li>
                  {lang === "es"
                    ? "Alternativa carnívora: Pechuga de pollo asada con especias + ensalada verde sin aderezo pesado."
                    : "Carnivore alternative: Roast chicken breast with spices + green salad without heavy dressing."}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Ayuno Intermitente */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. {lang === "es" ? "Ayuno Intermitente" : "Intermittent Fasting"}</h2>
        <p className="font-sans text-gray-700 leading-relaxed">
          {lang === "es"
            ? "El ayuno intermitente (16/8) puede beneficiar a pacientes diabéticos siempre y cuando se controle rigurosamente la ingesta de carbohidratos en la ventana alimentaria."
            : "Intermittent fasting (16/8) can benefit diabetic patients as long as carbohydrate intake is strictly controlled during the eating window."}
        </p>
        <ul className="list-decimal list-inside font-sans text-gray-700 space-y-2">
          <li>{lang === "es" ? "Periodo de ayuno: 16 horas..." : "Fasting period: 16 hours..."}</li>
          <li>{lang === "es" ? "Ventana de alimentación: 8 horas..." : "Eating window: 8 hours..."}</li>
          <li>{lang === "es" ? "Durante el ayuno, vigila tus niveles..." : "During the fast, monitor your glucose..."}</li>
        </ul>
      </section>

      {/* 5. Dieta Carnívora */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. {lang === "es" ? "Dieta Carnívora (Con Moderación)" : "Carnivore Diet (In Moderation)"}</h2>
        <p className="font-sans text-gray-700 leading-relaxed">
          {lang === "es"
            ? "La dieta carnívora, basada principalmente en proteínas animales, puede reducir niveles de glucosa rápidamente, pero debe hacerse con cautela en diabéticos."
            : "A carnivore diet, mainly animal proteins, can drop glucose levels quickly but must be undertaken with caution in diabetics."}
        </p>
        <ul className="list-disc list-inside font-sans text-gray-700 space-y-2">
          <li>{lang === "es" ? "Incluye cortes magros de carne roja..." : "Include lean cuts of red meat..."}</li>
          <li>{lang === "es" ? "Consume hígado u órganos una vez..." : "Eat organ meats (liver) once a week..."}</li>
          <li>{lang === "es" ? "Acompaña con suficiente agua..." : "Stay well-hydrated and replenish electrolytes..."}</li>
        </ul>
      </section>

      {/* 6. Suplementos Recomendados */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. {lang === "es" ? "Suplementos Recomendados" : "Recommended Supplements"}</h2>
        <ul className="list-disc list-inside font-sans text-gray-700 space-y-2">
          <li><strong>Vitamina D:</strong> {lang === "es" ? "1.000–2.000 UI/día." : "1,000–2,000 IU/day."}</li>
          <li><strong>Magnesio:</strong> {lang === "es" ? "200–300 mg/día." : "200–300 mg/day."}</li>
          <li><strong>Omega-3 (EPA/DHA):</strong> {lang === "es" ? "1–2 g al día." : "1–2 g/day."}</li>
        </ul>
      </section>

      {/* 7. Conclusión */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. {lang === "es" ? "Conclusión" : "Conclusion"}</h2>
        <p className="font-sans text-gray-700 leading-relaxed">
          {lang === "es"
            ? "Combinar ejercicio diario con un plan de alimentación adecuado es la clave para el manejo de la diabetes. Ajusta siempre las porciones según tu nivel de actividad, monitoriza tu glucosa y consulta a tu médico o nutricionista si decides adoptar un régimen de ayuno o una dieta carnívora a largo plazo."
            : "Combining daily exercise with an appropriate meal plan is key to managing diabetes. Always adjust portions according to your activity level, monitor your glucose, and consult your doctor or nutritionist if you plan to adopt long-term fasting or a carnivore diet."}
        </p>
      </section>
    </div>
  );
}
