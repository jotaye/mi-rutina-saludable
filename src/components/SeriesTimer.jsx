// src/components/SeriesTimer.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function SeriesTimer({
  series,
  duracionSerie,   // en segundos
  descanso,        // en segundos
  nombreEjercicio,
  caloriasBase,    // calorías aproximadas por minuto (MET ajustado)
  diaClave,
  nivel,
}) {
  const { user, profile } = useContext(UserContext);
  const peso = profile?.peso || 70; // kg, fallback 70
  const [serieActual, setSerieActual] = useState(1);
  const [tiempo, setTiempo] = useState(duracionSerie);
  const [enDescanso, setEnDescanso] = useState(false);
  const timerRef = useRef(null);
  const [registroHecho, setRegistroHecho] = useState(false);

  // Iniciar o pausar el timer
  useEffect(() => {
    if (serieActual > series) {
      if (!registroHecho) registrarProgreso();
      return;
    }
    timerRef.current = setInterval(() => {
      setTiempo((t) => t - 1);
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [serieActual, enDescanso]);

  // Avanzar de estado (serie/descanso)
  useEffect(() => {
    if (tiempo < 0) {
      clearInterval(timerRef.current);
      if (!enDescanso) {
        // terminó serie
        if (serieActual < series) {
          setEnDescanso(true);
          setTiempo(descanso);
        } else {
          // terminó última serie
          setSerieActual(series + 1);
        }
      } else {
        // terminó descanso
        setEnDescanso(false);
        setSerieActual((s) => s + 1);
        setTiempo(duracionSerie);
      }
    }
  }, [tiempo]);

  // Función para registrar en Firestore
  const registrarProgreso = async () => {
    try {
      // duración total en segundos = (series * duracionSerie) + ((series - 1) * descanso)
      const duracionTotal = series * duracionSerie + (series - 1) * descanso;
      const horas = duracionTotal / 3600;
      // calorías = MET * peso(kg) * horas
      // asumimos caloriasBase = MET * 60 (cal/min), así que MET = caloriasBase / 60
      const MET = caloriasBase / 60;
      const caloriasEstimadas = Math.round(MET * peso * horas);

      await addDoc(collection(db, "progreso"), {
        uid: user.uid,
        fecha: serverTimestamp(),
        ejercicio: nombreEjercicio,
        dia: diaClave,
        nivel,
        series,
        duracionTotal,        // en segundos
        caloriasEstimadas,    // integer
      });
      setRegistroHecho(true);
      console.log("Progreso registrado:", nombreEjercicio, caloriasEstimadas);
    } catch (err) {
      console.error("Error registrando progreso:", err);
    }
  };

  // Mostrar “0:00” tras completar
  if (serieActual > series) {
    return (
      <div className="text-center text-green-600 font-semibold">
        ¡{nombreEjercicio} completado!
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="mb-1 font-medium">
        Serie {serieActual} / {series}
      </p>
      <div className="text-4xl font-mono mb-2">
        {String(Math.floor(tiempo / 60)).padStart(2, "0")}:
        {String(tiempo % 60).padStart(2, "0")}
      </div>
      {enDescanso && <p className="text-sm text-gray-500">Descanso</p>}
    </div>
  );
}
