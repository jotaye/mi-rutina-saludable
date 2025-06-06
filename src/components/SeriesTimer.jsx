// src/components/SeriesTimer.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

export default function SeriesTimer({
  series = 1,
  duracionSerie = 60,
  descanso = 30,
  nombreEjercicio = "Ejercicio genérico",
  caloriasBase = 0,
  diaClave = "",
  nivel = "principiante",
  onFinish = () => {},
}) {
  const { registrarEjercicio } = useContext(ProgressContext);

  const factorDuracion = {
    principiante: 1.0,
    intermedio: 1.5,
    avanzado: 2.0,
  }[nivel] || 1.0;

  const factorCalorias = {
    principiante: 1.0,
    intermedio: 1.2,
    avanzado: 1.5,
  }[nivel] || 1.0;

  const durSerieAjustada = Math.round(duracionSerie * factorDuracion);
  const descansoAjustado = Math.round(descanso * factorDuracion);
  const caloriasPorSerie = Math.round(caloriasBase * factorCalorias);

  const tiempoTotalSegundos =
    series * durSerieAjustada + (series - 1) * descansoAjustado;

  const [actualSerie, setActualSerie] = useState(1);
  const [esDescanso, setEsDescanso] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(durSerieAjustada);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/assets/alarm.mp3");
  }, []);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, secondsLeft]);

  useEffect(() => {
    if (running && secondsLeft === 0) {
      audioRef.current.play();
      setRunning(false);

      if (!esDescanso) {
        if (actualSerie < series) {
          setEsDescanso(true);
          setSecondsLeft(descansoAjustado);
          setRunning(true);
        } else {
          const duracionTotalMin = Math.round(tiempoTotalSegundos / 60);
          const caloriasTotales = caloriasPorSerie * series;
          registrarEjercicio(diaClave, {
            nombreEjercicio,
            calorias: caloriasTotales,
            duracionMin: duracionTotalMin,
            seriesCompletas: series,
          });
          onFinish();
        }
      } else {
        setEsDescanso(false);
        setActualSerie((p) => p + 1);
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
    tiempoTotalSegundos,
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
          {esDescanso
            ? "Descanso"
            : `Serie ${actualSerie} de ${series}`}
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
            className="flex items-center bg-primary-500 hover:bg-primary-600 text-white px-3 py-1 rounded-md space-x-1 transition duration-200 ease-in-out"
          >
            <PlayIcon className="h-5 w-5" />
            <span>Iniciar</span>
          </button>
        ) : (
          <button
            onClick={stopRoutine}
            className="flex items-center bg-accent-500 hover:bg-accent-600 text-white px-3 py-1 rounded-md space-x-1 transition duration-200 ease-in-out"
          >
            <PauseIcon className="h-5 w-5" />
            <span>Detener</span>
          </button>
        )}
      </div>
      <div className="text-sm text-gray-500">
        <p>{`Objetivo: ${series}×${Math.round(
          durSerieAjustada / 60
        )} min, descanso ${descansoAjustado}s`}</p>
        <p>{`Cal. totales (est.): ${
          caloriasPorSerie * series
        } kcal`}</p>
      </div>
    </div>
  );
}
