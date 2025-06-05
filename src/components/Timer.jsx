// src/components/Timer.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

// Props:
//   durationSeconds (número de segundos, p.ej. 60),
//   nombreEjercicio (string),
//   caloriasEstimadas (número),
//   diaClave (string: "lunes", "martes", …)
export default function Timer({
  durationSeconds = 30,
  nombreEjercicio = "Ejercicio genérico",
  caloriasEstimadas = 0,
  diaClave = "",
}) {
  const { registrarEjercicio } = useContext(ProgressContext);

  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Carga el sonido de alarma (coloca un archivo alarm.mp3 en public/assets)
    audioRef.current = new Audio("/assets/alarm.mp3");
  }, []);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    }
    if ((!running || secondsLeft === 0) && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0 && running) {
      setRunning(false);
      audioRef.current.play();

      // Registra el ejercicio AUTOMÁTICAMENTE:
      // Redondeamos la duración en minutos (al valor más cercano):
      const duracionMinutos =
        Math.round(durationSeconds / 60); // 1 minuto para 60 s

      registrarEjercicio(diaClave, {
        nombreEjercicio,
        calorias: caloriasEstimadas,
        duracionMin: duracionMinutos,
      });
    }
  }, [secondsLeft, running, registrarEjercicio, diaClave, nombreEjercicio, caloriasEstimadas, durationSeconds]);

  const startTimer = () => {
    setSecondsLeft(durationSeconds);
    setRunning(true);
  };
  const stopTimer = () => {
    setRunning(false);
    setSecondsLeft(durationSeconds);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="bg-gray-100 p-3 rounded-md inline-block">
      <div className="text-2xl font-mono text-center mb-2">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>
      <div className="flex justify-center space-x-2">
        {!running ? (
          <button
            onClick={startTimer}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
          >
            Detener
          </button>
        )}
      </div>
    </div>
  );
}
