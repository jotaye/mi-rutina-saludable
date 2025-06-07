// src/pages/Profile.jsx
import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";

export default function Profile() {
  const { lang } = useContext(AppContext);
  const { profile, updateProfile } = useContext(UserContext);

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
        {/* Nombre */}
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
        {/* Edad */}
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
        {/* Peso */}
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
        {/* Altura */}
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
        {/* Nivel */}
        <div>
          <label className="block font-sans mb-1">
            {lang === "es" ? "Nivel" : "Level"}
          </label>
          <select
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="principiante">{lang === "es" ? "Principiante" : "Beginner"}</option>
            <option value="intermedio">{lang === "es" ? "Intermedio" : "Intermediate"}</option>
            <option value="avanzado">{lang === "es" ? "Avanzado" : "Advanced"}</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary-500 hover:bg-primary-600 text-white py-2 rounded-md transition"
        >
          {lang === "es" ? "Guardar Perfil" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}
