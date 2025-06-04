// src/components/Timer.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

// Props:
//  - duration: número de segundos (p.ej. 60)
//  - ejercicio: nombre del ejercicio (“Jumping jacks”)
//  - caloriesPerMin: cuántas calorías se queman por minuto (p.ej. 8)
//  - dateStr: “YYYY-MM-DD”
//  - onTimerStart?: función opcional cuando se inicie (no obligatoria)
//  - className?: clase para el botón o contenedor
export default function Timer({
  duration,
  ejercicio,
  caloriesPerMin,
  dateStr,
  onTimerStart,
  className = "",
}) {
  const { addProgress } = useContext(ProgressContext);

  const [segundosRestantes, setSegundosRestantes] = useState(duration);
  const [activo, setActivo] = useState(false);
  const [completado, setCompletado] = useState(false);

  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  // 1) Formatea segundos a MM:SS
  const formatTime = (secs) => {
    const minutos = Math.floor(secs / 60);
    const segundos = secs % 60;
    const mm = String(minutos).padStart(2, "0");
    const ss = String(segundos).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // 2) Maneja el ciclo del timer
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

  // 3) Cuando segundosRestantes llegue a 0, marcamos completado y pitamos
  useEffect(() => {
    if (segundosRestantes === 0 && activo) {
      clearInterval(intervalRef.current);
      setActivo(false);
      setCompletado(true);

      // 3.a) Suena la alarma
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }

      // 3.b) Calculamos calorías: 
      //     caloriesPerMin (kcal/min) * (duration/60) 
      const durEnMin = duration / 60;
      const caloriasQuemadas = parseFloat((caloriesPerMin * durEnMin).toFixed(1));

      // 3.c) Avisamos al contexto para sumar el progreso
      addProgress(dateStr, ejercicio, duration, caloriasQuemadas);
    }
  }, [segundosRestantes, activo, duration, caloriesPerMin, ejercicio, dateStr, addProgress]);

  // 4) Handler de botón Iniciar / Reiniciar
  const handleStart = () => {
    if (completado) {
      // Si ya estaba completado, reiniciamos todo
      setSegundosRestantes(duration);
      setCompletado(false);
      setActivo(false);
    } else {
      setActivo(true);
      onTimerStart && onTimerStart(); // Llama a callback opcional
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* 5) Mostrar cronómetro o estado */}
      <div className="mb-2">
        <span className="text-xl font-mono text-gray-800 dark:text-gray-100">
          {formatTime(segundosRestantes)}
        </span>
      </div>

      {/* 6) Botón Iniciar / Reiniciar */}
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

      {/* 7) Componente <audio> para pitido al terminar */}
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
