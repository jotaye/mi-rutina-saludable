// src/pages/Profile.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import { AchievementsContext } from "../context/AchievementsContext";
import Badge from "../components/Badge";
import { TrophyIcon, StarIcon } from "@heroicons/react/24/solid";

export default function Profile() {
  const { lang } = useContext(AppContext);
  const { profile, updateProfile } = useContext(UserContext);
  const { unlocked, definitions } = useContext(AchievementsContext);

  // Form state inicializado desde profile
  const [nombre, setNombre] = useState(profile.nombre || "");
  const [edad, setEdad] = useState(profile.edad || "");
  const [peso, setPeso] = useState(profile.peso || "");
  const [altura, setAltura] = useState(profile.altura || "");
  const [nivel, setNivel] = useState(profile.nivel || "principiante");

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({ nombre, edad, peso, altura, nivel });
    alert(lang === "es" ? "Perfil actualizado" : "Profile updated");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md space-y-6">
      <h1 className="text-2xl font-serif font-bold text-center">
        {lang === "es" ? "Mi Perfil" : "My Profile"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-sans mb-1">
            {lang === "es" ? "Nombre" : "Name"}
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-sans mb-1">
            {lang === "es" ? "Edad" : "Age"}
          </label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block font-sans mb-1">
            {lang === "es" ? "Peso (kg)" : "Weight (kg)"}
          </label>
          <input
            type="number"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min="0"
            step="0.1"
            required
          />
        </div>
        <div>
          <label className="block font-sans mb-1">
            {lang === "es" ? "Altura (cm)" : "Height (cm)"}
          </label>
          <input
            type="number"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className="w-full border rounded px-3 py-2"
            min="0"
            required
          />
        </div>
        <div>
          <label className="block font-sans mb-1">
            {lang === "es" ? "Nivel" : "Level"}
          </label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="principiante">
              {lang === "es" ? "Principiante" : "Beginner"}
            </option>
            <option value="intermedio">
              {lang === "es" ? "Intermedio" : "Intermediate"}
            </option>
            <option value="avanzado">
              {lang === "es" ? "Avanzado" : "Advanced"}
            </option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md transition"
        >
          {lang === "es" ? "Guardar Perfil" : "Save Profile"}
        </button>
      </form>

      {/* Insignias */}
      <div className="mt-8">
        <h2 className="text-xl font-serif font-semibold mb-4">
          {lang === "es" ? "Logros" : "Achievements"}
        </h2>
        <div className="flex space-x-4">
          <Badge
            icon={<TrophyIcon className="h-6 w-6 text-yellow-500" />}
            title={definitions.streak7.name}
            desc={definitions.streak7.desc}
            unlocked={!!unlocked.streak7}
          />
          <Badge
            icon={<StarIcon className="h-6 w-6 text-blue-500" />}
            title={definitions.series100.name}
            desc={definitions.series100.desc}
            unlocked={!!unlocked.series100}
          />
        </div>
      </div>
    </div>
);
}
