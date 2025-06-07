// src/pages/Admin.jsx
import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import useCollection from "../hooks/useCollection";
import { db } from "../firebase";
import {
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

export default function Admin() {
  const { lang } = useContext(AppContext);
  const { isAdmin } = useContext(UserContext);

  // Carga en tiempo real
  const rutinas = useCollection("rutinas");
  const mealPlans = useCollection("mealPlans");

  // Estados para formularios
  const [newDay, setNewDay] = useState("");
  const [newEjercicio, setNewEjercicio] = useState({
    nombre: "",
    video: "",
    descripcion: [""],
    series: 1,
    duracionSerie: 60,
    descanso: 30,
    caloriasBase: 5,
  });
  const [newComida, setNewComida] = useState({
    nombre: "",
    texto: "",
    img: "",
  });

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-serif">Acceso denegado</h1>
        <p className="font-sans">Solo el administrador puede ver esta sección.</p>
      </div>
    );
  }

  // Handlers
  const handleAddRutina = async (e) => {
    e.preventDefault();
    if (!newDay) return alert("Día obligatorio");
    const dayDoc = doc(db, "rutinas", newDay);
    const ejercicios = rutinas.find((d) => d.id === newDay)?.ejercicios || [];
    await updateDoc(dayDoc, {
      ejercicios: [...ejercicios, newEjercicio],
    }).catch(async () => {
      // Si no existe, lo crea
      await addDoc(collection(db, "rutinas"), {
        id: newDay,
        ejercicios: [newEjercicio],
      });
    });
    alert("Ejercicio agregado");
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    if (!newDay) return alert("Día obligatorio");
    const planDoc = doc(db, "mealPlans", newDay);
    const comidas = mealPlans.find((d) => d.id === newDay)?.comidas || [];
    await updateDoc(planDoc, {
      comidas: [...comidas, newComida],
    }).catch(async () => {
      await addDoc(collection(db, "mealPlans"), {
        id: newDay,
        comidas: [newComida],
      });
    });
    alert("Comida agregada");
  };

  const handleDeleteRutina = async (day, idx) => {
    const dayDoc = doc(db, "rutinas", day);
    const ejercicios = rutinas.find((d) => d.id === day).ejercicios;
    ejercicios.splice(idx, 1);
    await updateDoc(dayDoc, { ejercicios });
    alert("Ejercicio eliminado");
  };

  const handleDeletePlan = async (day, idx) => {
    const planDoc = doc(db, "mealPlans", day);
    const comidas = mealPlans.find((d) => d.id === day).comidas;
    comidas.splice(idx, 1);
    await updateDoc(planDoc, { comidas });
    alert("Comida eliminada");
  };

  return (
    <div className="p-6 space-y-12">
      <h1 className="text-3xl font-serif font-bold">
        {lang === "es" ? "Panel de Administración" : "Admin Panel"}
      </h1>

      {/* Sección Rutinas */}
      <section>
        <h2 className="text-2xl font-serif mb-4">
          {lang === "es" ? "Rutinas" : "Routines"}
        </h2>
        {rutinas.map((d) => (
          <div key={d.id} className="mb-6">
            <h3 className="font-serif text-xl capitalize mb-2">{d.id}</h3>
            <ul className="list-decimal pl-6 mb-2 space-y-1">
              {d.ejercicios.map((ej, i) => (
                <li key={i} className="flex justify-between">
                  <span>{ej.nombre}</span>
                  <button
                    onClick={() => handleDeleteRutina(d.id, i)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Form Agregar Ejercicio */}
        <form onSubmit={handleAddRutina} className="space-y-2">
          <h4 className="font-serif">+ Agregar ejercicio</h4>
          <input
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            placeholder="día (lunes, martes…)"
            className="border p-1"
            required
          />
          <input
            value={newEjercicio.nombre}
            onChange={(e) =>
              setNewEjercicio((p) => ({ ...p, nombre: e.target.value }))
            }
            placeholder="Nombre ejercicio"
            className="border p-1 w-full"
          />
          {/* Añade más campos según necesites… */}
          <button type="submit" className="bg-primary-500 text-white px-4 py-1 rounded">
            {lang === "es" ? "Agregar" : "Add"}
          </button>
        </form>
      </section>

      {/* Sección Planes de Comida */}
      <section>
        <h2 className="text-2xl font-serif mb-4">
          {lang === "es" ? "Planes de Comida" : "Meal Plans"}
        </h2>
        {mealPlans.map((d) => (
          <div key={d.id} className="mb-6">
            <h3 className="font-serif text-xl capitalize mb-2">{d.id}</h3>
            <ul className="list-disc pl-6 mb-2 space-y-1">
              {d.comidas.map((c, i) => (
                <li key={i} className="flex justify-between">
                  <span>{c.nombre}</span>
                  <button
                    onClick={() => handleDeletePlan(d.id, i)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Form Agregar Comida */}
        <form onSubmit={handleAddPlan} className="space-y-2">
          <h4 className="font-serif">+ Agregar comida</h4>
          <input
            value={newDay}
            onChange={(e) => setNewDay(e.target.value)}
            placeholder="día (lunes, martes…)"
            className="border p-1"
            required
          />
          <input
            value={newComida.nombre}
            onChange={(e) =>
              setNewComida((p) => ({ ...p, nombre: e.target.value }))
            }
            placeholder="Nombre comida"
            className="border p-1 w-full"
          />
          {/* Añade más campos según necesites… */}
          <button type="submit" className="bg-primary-500 text-white px-4 py-1 rounded">
            {lang === "es" ? "Agregar" : "Add"}
          </button>
        </form>
      </section>
    </div>
  );
}
