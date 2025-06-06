// src/components/SeriesTimer.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

export default function SeriesTimer({
  series = 1,
  duracionSerie = 60,
  descanso = 30,
  nombreEjercicio = "Ejercicio genérico",
  caloriasBase = 0,   // kcal que quema 1 serie “base”
  diaClave = "",
  nivel = "principiante",
  onFinish = () => {},
}) {
  const { registrarEjercicio } = useContext(ProgressContext);

  // FACTORES de nivel (igual que antes)
  const factorDuracion = (nivel) => {
    switch (nivel) {
      case "principiante":
        return 1.0;
      case "intermedio":
        return 1.5;
      case "avanzado":
        return 2.0;
      default:
        return 1.0;
    }
  };
  const factorCalorias = (nivel) => {
    switch (nivel) {
      case "principiante":
        return 1.0;
      case "intermedio":
        return 1.2;
      case "avanzado":
        return 1.5;
      default:
        return 1.0;
    }
  };

  // Ajuste según nivel
  const durSerieAjustada = Math.round(duracionSerie * factorDuracion(nivel));
  const descansoAjustado = Math.round(descanso * factorDuracion(nivel));
  const caloriasPorSerie = Math.round(caloriasBase * factorCalorias(nivel));

  // Tiempo total esperado (solo para mostrar):  
  // sumamos todas las series y descansos intermedios
  const tiempoTotal—
 = series * durSerieAjustada + (series - 1) * descansoAjustado;

  // States internos del temporizador
  const [actualSerie, setActualSerie] = useState(1);
  const [esDescanso, setEsDescanso] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durSerieAjustada);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Carga sonido alarma
    audioRef.current = new Audio("/assets/alarm.mp3");
  }, []);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    }
    if ((!running || secondsLeft === 0) && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, secondsLeft]);

  useEffect(() => {
    // Cuando secondsLeft baja a 0:
    if (secondsLeft === 0 && running) {
      audioRef.current.play();

      // Pausar temporizador actual
      setRunning(false);

      if (!esDescanso) {
        // Acabó una serie
        if (actualSerie < series) {
          // Iniciar descanso antes de la siguiente serie
          setEsDescanso(true);
          setSecondsLeft(descansoAjustado);
          setRunning(true);
        } else {
          // Si ya era la última serie → FIN de toda la rutina
          // Calculamos datos a registrar:
          const duracionTotalMin = Math.round(tiempoTotal—
 / 60); // en minutos redondeados
          const caloriasTotales = caloriasPorSerie * series;

          registrarEjercicio(diaClave, {
            nombreEjercicio,
            calorias: caloriasTotales,
            duracionMin: duracionTotalMin,
            seriesCompletas: series,
          });

          onFinish(); // callback externo
        }
      } else {
        // Estábamos en descanso y va a comenzar la siguiente serie
        setEsDescanso(false);
        setActualSerie((prev) => prev + 1);
        setSecondsLeft(durSerieAjustada);
        setRunning(true);
      }
    }
  }, [
    secondsLeft,
    running,
    esDescanso,
    actualSerie,
    series,
    durSerieAjustada,
    descansoAjustado,
    caloriasPorSerie,
    diaClave,
    nombreEjercicio,
    registrarEjercicio,
    onFinish,
    tiempoTotal—,
  ]);

  const startRoutine = () => {
    setActualSerie(1);
    setEsDescanso(false);
    setSecondsLeft(durSerieAjustada);
    setRunning(true);
  };
  const stopRoutine = () => {
    setRunning(false);
    setActualSerie(1);
    setEsDescanso(false);
    setSecondsLeft(durSerieAjustada);
  };

  const minutos = Math.floor(secondsLeft / 60);
  const segundos = secondsLeft % 60;

  return (
    <div className="bg-gray-100 p-3 rounded-md inline-block text-center">
      <div className="mb-2">
        <span className="font-medium">
          {esDescanso ? "Descanso" : `Serie ${actualSerie} de ${series}`}
        </span>
      </div>
      <div className="text-2xl font-mono mb-2">
        {String(minutos).padStart(2, "0")}:
        {String(segundos).padStart(2, "0")}
      </div>
      <div className="flex justify-center space-x-2 mb-2">
        {!running ? (
          <button
            onClick={startRoutine}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md transition"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={stopRoutine}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
          >
            Detener
          </button>
        )}
      </div>
      <div className="text-sm text-gray-500">
        <p>
          {`Objetivo: ${series}×${Math.round(
            durSerieAjustada / 60
          )} min, descanso ${Math.round(descansoAjustado)} s`}
        </p>
        <p>{`Cal. totales (est.): ${caloriasPorSerie * series} kcal`}</p>
      </div>
    </div>
  );
}
