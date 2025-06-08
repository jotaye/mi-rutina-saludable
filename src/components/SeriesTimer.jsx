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
  caloriasBase,    // calorías aproximadas por minuto
  diaClave,
  nivel,
}) {
  const { user, profile } = useContext(UserContext);
  const peso = profile?.peso || 70; // kg, fallback si no hay perfil
  const [serieActual, setSerieActual] = useState(1);
  const [tiempo, setTiempo] = useState(duracionSerie);
  const [enDescanso, setEnDescanso] = useState(false);
  const timerRef = useRef(null);
  const [registroHecho, setRegistroHecho] = useState(false);

  // Prepara el audio y pide permiso de notificaciones
  const audioRef = useRef(null);
  useEffect(() => {
    audioRef.current = new Audio("/assets/alarm.mp3");
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // Efecto que maneja el conteo regresivo
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

  // Cuando tiempo llega a -1, avanza serie o descanso, suena alarma y notifica
  useEffect(() => {
    if (tiempo < 0) {
      clearInterval(timerRef.current);

      // Reproduce sonido
      if (audioRef.current) {
        audioRef.current.play();
      }
      // Dispara notificación
      if (Notification.permission === "granted") {
        new Notification(
          enDescanso
            ? `Descanso terminado: vuelve a ${nombreEjercicio}`
            : `¡Serie ${serieActual} completada!`,
        );
      }

      if (!enDescanso) {
        // Terminó una serie
        if (serieActual < series) {
          setEnDescanso(true);
          setTiempo(descanso);
        } else {
          // Terminó la última serie
          setSerieActual(series + 1);
        }
      } else {
        // Terminó el descanso
        setEnDescanso(false);
        setSerieActual((s) => s + 1);
        setTiempo(duracionSerie);
      }
    }
  }, [tiempo]);

  // Función para registrar el progreso en Firestore
  const registrarProgreso = async () => {
    try {
      const duracionTotal = series * duracionSerie + (series - 1) * descanso;
      const horas = duracionTotal / 3600;
      const MET = caloriasBase / 60;
      const caloriasEstimadas = Math.round(MET * peso * horas);

      await addDoc(collection(db, "progreso"), {
        uid: user.uid,
        fecha: serverTimestamp(),
        ejercicio: nombreEjercicio,
        dia: diaClave,
        nivel,
        series,
        duracionTotal,
        caloriasEstimadas,
      });
      setRegistroHecho(true);
      console.log("Progreso registrado:", nombreEjercicio, caloriasEstimadas);
    } catch (err) {
      console.error("Error registrando progreso:", err);
    }
  };

  // Render finalizado
  if (serieActual > series) {
    return (
      <div className="text-center text-green-600 font-semibold">
        ¡{nombreEjercicio} completado!
      </div>
    );
  }

  // Render cronómetro
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
