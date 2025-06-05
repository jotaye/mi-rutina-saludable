// src/pages/UserProfile.jsx
import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";

export default function UserProfile() {
  const { profile, updateProfile } = useContext(UserContext);
  const [formState, setFormState] = useState(profile);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormState(profile);
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formState);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Perfil del usuario</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded-lg shadow-md"
      >
        <div>
          <label className="block text-gray-700">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            value={formState.nombre}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Edad</label>
          <input
            type="number"
            name="edad"
            value={formState.edad}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Peso (kg)</label>
          <input
            type="number"
            name="peso"
            value={formState.peso}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Altura (cm)</label>
          <input
            type="number"
            name="altura"
            value={formState.altura}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Tipo de diabetes</label>
          <select
            name="tipoDiabetes"
            value={formState.tipoDiabetes}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="1">Tipo 1</option>
            <option value="2">Tipo 2</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Nivel de ejercicio</label>
          <select
            name="nivel"
            value={formState.nivel}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="principiante">Principiante</option>
            <option value="intermedio">Intermedio</option>
            <option value="avanzado">Avanzado</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Guardar Perfil
        </button>
        {saved && <p className="text-green-600 mt-2">Perfil guardado correctamente.</p>}
      </form>
    </div>
  );
}
