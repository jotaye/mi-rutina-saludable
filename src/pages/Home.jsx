// src/pages/Home.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import useCollection from "../hooks/useCollection";

// Import estático como respaldo
import { rutinaSemanal as rutinaLocal } from "../data/rutinaSemanal";
import mealPlans as mealLocal from "../data/mealPlans";

export default function Home() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const hoy = dias[new Date().getDay()];

  // Firestore
  const rutinasFS = useCollection("rutinas");
  const planesFS = useCollection("mealPlans");

  // Si Firestore no trae datos, usar local
  const rutinaSem = 
    rutinasFS.length > 0
      ? Object.fromEntries(rutinasFS.map(d => [d.id, d.ejercicios]))
      : rutinaLocal;

  const mealPlans = 
    planesFS.length > 0
      ? Object.fromEntries(planesFS.map(d => [d.id, d.comidas]))
      : mealLocal;

  const ejerciciosHoy = rutinaSem[hoy] || [];
  const menuHoy = mealPlans[hoy] || [];

  return (
    <div className="p-6 space-y-10">
      {/* Rutina de hoy */}
      <div>
        <h1 className="text-3xl font-serif font-bold mb-4 capitalize">
          {`Mi rutina de hoy (${hoy})`}
        </h1>
        <div className="space-y-8">
          {ejerciciosHoy.length === 0 ? (
            <p className="font-sans text-gray-500">Descanso</p>
          ) : (
            ejerciciosHoy.map((ej, idx) => (
              <div key={idx} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-serif font-semibold mb-4">{ej.nombre}</h2>
                <video src={ej.video} controls className="w-full max-w-lg mx-auto rounded-md mb-4 bg-black" />
                {ej.descripcion && (
                  <ol className="list-decimal list-inside text-gray-700 mb-4">
                    {ej.descripcion.map((paso, i) => (
                      <li key={i}>{paso}</li>
                    ))}
                  </ol>
                )}
                <div className="mb-4 text-gray-700">
                  <p><strong>Series:</strong> {ej.series} × {Math.round(ej.duracionSerie / 60)} min</p>
                  <p><strong>Descanso:</strong> {ej.descanso}s</p>
                </div>
                <SeriesTimer
                  series={ej.series}
                  duracionSerie={ej.duracionSerie}
                  descanso={ej.descanso}
                  nombreEjercicio={ej.nombre}
                  caloriasBase={ej.caloriasBase}
                  diaClave={hoy}
                  nivel={profile.nivel}
                  onFinish={() => alert(`${ej.nombre} completado y registrado automáticamente.`)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Plan alimenticio de hoy */}
      <div>
        <h2 className="text-2xl font-serif font-bold mb-6">Plan alimenticio para hoy</h2>
        {menuHoy.length === 0 ? (
          <p className="font-sans text-gray-500">No hay plan alimenticio para hoy.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuHoy.map((c, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <img src={c.img} alt={c.nombre} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-xl font-serif font-semibold mb-2">{c.nombre}</h3>
                  <p className="font-sans text-gray-700">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navegación */}
      <div className="mt-8">
        <a href="/semana" className="text-primary-500 hover:underline mr-6 transition">
          Ver toda la semana
        </a>
        <a href="/nutricion" className="text-primary-500 hover:underline transition">
          Ir a Nutrición
        </a>
      </div>
    </div>
  );
}
