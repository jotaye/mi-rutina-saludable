// src/pages/Nutrition.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">
        {lang === "es" ? "Nutrición Saludable para Diabéticos" : "Healthy Nutrition for Diabetics"}
      </h1>

      {/* 1. Introducción */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "1. Introducción" : "1. Introduction"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {lang === "es"
            ? "En personas con diabetes tipo 1 o tipo 2, la alimentación juega un papel fundamental para controlar los niveles de glucosa y prevenir complicaciones a largo plazo. Aquí encontrarás pautas, tips y ejemplos de menús que combinan el ejercicio con una dieta adecuada para mantener un metabolismo estable."
            : "For individuals with type 1 or type 2 diabetes, nutrition is crucial to keep blood glucose levels stable and avoid long-term complications. Below you’ll find guidelines, tips, and sample meal plans that combine exercise with an appropriate diet for stable metabolism."}
        </p>
      </section>

      {/* 2. Principios Básicos para Diabéticos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "2. Principios Básicos" : "2. Basic Principles"}
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
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

      {/* 3. Ejemplo de Plan de Comidas (Diario) */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "3. Ejemplo de Plan de Comidas" : "3. Sample Meal Plan"}
        </h2>

        <h3 className="text-xl font-medium">
          {lang === "es" ? "Desayuno" : "Breakfast"}
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            {lang === "es"
              ? "Opción 1: Avena integral con leche descremada, trozos de almendra y bayas frescas."
              : "Option 1: Steel-cut oats with skim milk, chopped almonds, and fresh berries."}
          </li>
          <li>
            {lang === "es"
              ? "Opción 2: Omelette de claras con espinaca, tomate y champiñones + una rebanada de pan integral."
              : "Option 2: Egg-white omelette with spinach, tomato, and mushrooms, plus one slice of whole-grain toast."}
          </li>
        </ul>

        <h3 className="text-xl font-medium">
          {lang === "es" ? "Media mañana" : "Mid-Morning Snack"}
        </h3>
        <p className="text-gray-700">
          {lang === "es"
            ? "Yogur griego descremado sin azúcar + una cucharada de semillas de chía."
            : "Nonfat Greek yogurt (unsweetened) + one tablespoon of chia seeds."}
        </p>

        <h3 className="text-xl font-medium">
          {lang === "es" ? "Almuerzo" : "Lunch"}
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            {lang === "es"
              ? "Pechuga de pollo a la plancha + ensalada mixta (lechuga, pepino, pepinillo, aderezo de aceite de oliva y limón) + porción de quinoa."
              : "Grilled chicken breast + mixed salad (lettuce, cucumber, pickles, olive oil & lemon dressing) + a portion of quinoa."}
          </li>
          <li>
            {lang === "es"
              ? "Alternativa vegetariana: Ensalada de garbanzos con pimientos, cebolla, tomate y perejil + vinagreta ligera."
              : "Vegetarian alternative: Chickpea salad with bell peppers, onion, tomato, and parsley + light vinaigrette."}
          </li>
        </ul>

        <h3 className="text-xl font-medium">
          {lang === "es" ? "Merienda" : "Afternoon Snack"}
        </h3>
        <p className="text-gray-700">
          {lang === "es"
            ? "Una pieza de fruta de bajo índice glucémico (manzana o pera) + 10 almendras."
            : "One low-GI fruit (apple or pear) + 10 almonds."}
        </p>

        <h3 className="text-xl font-medium">
          {lang === "es" ? "Cena" : "Dinner"}
        </h3>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            {lang === "es"
              ? "Filete de salmón al horno + brócoli al vapor + batata al horno (cantidad moderada)."
              : "Baked salmon fillet + steamed broccoli + roasted sweet potato (moderate portion)."}
          </li>
          <li>
            {lang === "es"
              ? "Alternativa carnívora: Pechuga de pollo asada con especias + ensalada verde sin aderezo pesado."
              : "Carnivore alternative: Roast chicken breast with spices + green salad without heavy dressing."}
          </li>
        </ul>
      </section>

      {/* 4. Tips de Ayuno Intermitente */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "4. Ayuno Intermitente" : "4. Intermittent Fasting"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {lang === "es"
            ? "El ayuno intermitente (16/8) puede beneficiar a pacientes diabéticos siempre y cuando se controle rigurosamente la ingesta de carbohidratos en la ventana alimentaria."
            : "Intermittent fasting (16/8) can benefit diabetic patients as long as carbohydrate intake is strictly controlled during the eating window."}
        </p>
        <ul className="list-decimal list-inside text-gray-700 space-y-2">
          <li>
            {lang === "es"
              ? "Periodo de ayuno: 16 horas (por ejemplo, desde las 20:00 h hasta las 12:00 del día siguiente). Sólo se ingieren líquidos sin calorías (agua, té o café negro)."
              : "Fasting period: 16 hours (e.g., 8 pm to 12 pm next day). Only noncaloric liquids (water, tea, black coffee)."}
          </li>
          <li>
            {lang === "es"
              ? "Ventana de alimentación: 8 horas (por ejemplo, de 12:00 a 20:00 h). Distribuye comidas ligeras y equilibradas en este período."
              : "Eating window: 8 hours (e.g., 12 pm to 8 pm). Distribute light, balanced meals over this time."}
          </li>
          <li>
            {lang === "es"
              ? "Durante el ayuno, vigila tus niveles de glucosa. Si bajas demasiado, interrumpe el ayuno y consume carbohidratos de absorción rápida (p. ej. una cucharada de miel o jugo de naranja)."
              : "During the fast, monitor blood glucose closely. If it drops too low, break the fast with quick-acting carbs (e.g., a spoonful of honey or orange juice)."}
          </li>
        </ul>
      </section>

      {/* 5. Dieta Carnívora y Moderación de Proteínas */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "5. Dieta Carnívora (Con Moderación)" : "5. Carnivore Diet (In Moderation)"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {lang === "es"
            ? "La dieta carnívora, basada principalmente en proteínas animales, puede reducir niveles de glucosa rápidamente, pero debe hacerse con cautela en diabéticos."
            : "A carnivore diet, mainly animal proteins, can drop glucose levels quickly but must be undertaken with caution in diabetics."}
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            {lang === "es"
              ? "Incluye cortes magros de carne roja, pollo y pescado. Evita embutidos procesados (salchichas, tocino comercial)."
              : "Include lean cuts of red meat, chicken, and fish. Avoid processed meats (store-bought sausages, bacon)."}
          </li>
          <li>
            {lang === "es"
              ? "Consume hígado u órganos una vez por semana para asegurar micronutrientes (vitamina A, hierro, zinc)."
              : "Eat organ meats (liver) once a week to ensure micronutrient intake (vitamin A, iron, zinc)."}
          </li>
          <li>
            {lang === "es"
              ? "Acompaña con suficiente agua y electrolitos (sal, potasio). Los cambios bruscos pueden causar desequilibrios."
              : "Stay well-hydrated and replenish electrolytes (salt, potassium). Rapid changes can cause imbalances."}
          </li>
        </ul>
      </section>

      {/* 6. Suplementos Recomendados */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "6. Suplementos Recomendados" : "6. Recommended Supplements"}
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            <strong>Vitamina D:</strong>{" "}
            {lang === "es"
              ? "Ayuda en la sensibilidad a la insulina. Toma 1.000–2.000 UI/día si tu nivel está bajo."
              : "Helps with insulin sensitivity. Take 1,000–2,000 IU/day if levels are low."}
          </li>
          <li>
            <strong>Magnesio:</strong>{" "}
            {lang === "es"
              ? "Insuficiencia común en diabéticos. 200–300 mg/día mejora la función muscular y nerviosa."
              : "Common deficiency in diabetics. 200–300 mg/day improves muscle and nerve function."}
          </li>
          <li>
            <strong>Omega-3 (EPA/DHA):</strong>{" "}
            {lang === "es"
              ? "Anti-inflamatorio y cardioprotector. 1–2 g al día."
              : "Anti-inflammatory and cardioprotective. 1–2 g/day."}
          </li>
        </ul>
      </section>

      {/* 7. Conclusión */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">
          {lang === "es" ? "7. Conclusión" : "7. Conclusion"}
        </h2>
        <p className="text-gray-700 leading-relaxed">
          {lang === "es"
            ? "Combinar ejercicio diario con un plan de alimentación adecuado es la clave para el manejo de la diabetes. Ajusta siempre las porciones según tu nivel de actividad, monitoriza tu glucosa y consulta a tu médico o nutricionista si decides adoptar un régimen de ayuno o una dieta carnívora a largo plazo."
            : "Combining daily exercise with an appropriate meal plan is key to managing diabetes. Always adjust portions according to your activity level, monitor your glucose, and consult your doctor or nutritionist if you plan to adopt long-term fasting or a carnivore diet."}
        </p>
      </section>
    </div>
  );
}
