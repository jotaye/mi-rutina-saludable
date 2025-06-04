// src/components/Timer.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { AppContext } from "../App";

export default function Timer({
  duration,
  ejercicio,
  caloriesPerMin,
  dateStr,
  onTimerStart,
  className = "",
}) {
  const { addProgress } = useContext(ProgressContext);
  const { lang } = useContext(AppContext);

  const [segundosRestantes, setSegundosRestantes] = useState(duration);
  const [activo, setActivo] = useState(false);
  const [completado, setCompletado] = useState(false);

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // Formatea segundos a MM:SS
  const formatTime = (secs) => {
    const minutos = Math.floor(secs / 60);
    const segundos = secs % 60;
    const mm = String(minutos).padStart(2, "0");
    const ss = String(segundos).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // Corre el temporizador hacia atrás
  useEffect(() => {
    if (activo && segundosRestantes > 0) {
      intervalRef.current = setInterval(() => {
        setSegundosRestantes((prev) => prev - 1);
      }, 1000);
    }
    if (!activo) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [activo]);

  // Cuando llega a cero, suena y registra progreso
  useEffect(() => {
    if (segundosRestantes === 0 && activo) {
      clearInterval(intervalRef.current);
      setActivo(false);
      setCompletado(true);

      // Suena la alarma
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      // Calcula calorías quemadas: caloriesPerMin * (duration / 60)
      const durEnMin = duration / 60;
      const caloriasQuemadas = parseFloat((caloriesPerMin * durEnMin).toFixed(1));

      // Añade el progreso al contexto
      addProgress(dateStr, ejercicio, duration, caloriasQuemadas);
    }
  }, [segundosRestantes, activo, duration, caloriesPerMin, ejercicio, dateStr, addProgress]);

  // Iniciar o reiniciar
  const handleStart = () => {
    if (completado) {
      setSegundosRestantes(duration);
      setCompletado(false);
      setActivo(false);
    } else {
      setActivo(true);
      onTimerStart && onTimerStart();
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Muestra MM:SS */}
      <div className="mb-2">
        <span className="text-xl font-mono text-gray-800 dark:text-gray-100">
          {formatTime(segundosRestantes)}
        </span>
      </div>

      {/* Botón Iniciar / Reiniciar */}
      <button
        onClick={handleStart}
        disabled={activo}
        className={`px-4 py-2 rounded-md text-white ${
          activo
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {activo
          ? lang === "es"
            ? "En progreso…"
            : "In Progress…"
          : completado
          ? lang === "es"
            ? "Reiniciar"
            : "Restart"
          : lang === "es"
          ? "Iniciar"
          : "Start"}
      </button>

      {/* Audio para el pitido cuando finaliza */}
      <audio ref={audioRef}>
        <source
          src="https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg"
          type="audio/ogg"
        />
        <source
          src="https://actions.google.com/sounds/v1/alarms/alarm_clock.mp3"
          type="audio/mpeg"
        />
        Tu navegador no soporta audio.
      </audio>
    </div>
  );
}
