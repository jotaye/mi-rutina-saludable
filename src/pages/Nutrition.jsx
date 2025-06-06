// src/pages/Nutrition.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Nutrition() {
  const { lang } = useContext(AppContext);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-10 font-serif">
      <h1 className="text-3xl font-bold text-center">
        Nutrición Saludable para Diabéticos
      </h1>
      <div className="flex justify-center">
        <img
          src="/assets/nutrition/avocado-bowl.jpg"
          alt="Nutrición Diabéticos"
          className="w-full max-w-md rounded-lg shadow-md"
        />
      </div>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Introducción</h2>
        <p className="font-sans text-gray-700 leading-relaxed">
          En personas con diabetes tipo 1 o tipo 2, la alimentación juega un papel fundamental para controlar los niveles de glucosa...
        </p>
      </section>
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Principios Básicos</h2>
        <ul className="list-disc list-inside font-sans text-gray-700 space-y-2">
          <li><strong>Control de carbohidratos:</strong> Elige carbohidratos de índice glucémico bajo...</li>
          <li><strong>Proteínas magras:</strong> Incluye fuentes como pechuga de pollo, pavo, pescado...</li>
          <li><strong>Grasas saludables:</strong> Opta por aguacate, aceite de oliva...</li>
          <li><strong>Fibra:</strong> Consume verduras, frutas enteras...</li>
        </ul>
      </section>
      {/* ... resto de secciones igual que antes, con clases font-sans para párrafos */}
    </div>
  );
}
