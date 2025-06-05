// src/components/Timer.jsx
import React, { useState, useEffect, useRef } from "react";

export default function Timer({ durationSeconds = 30, onFinish }) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "/assets/alarm.mp3"
    ); // Debes colocar un archivo alarm.mp3 en /public/assets/
  }, []);

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((sec) => sec - 1);
      }, 1000);
    }
    if (!running && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (secondsLeft === 0 && running) {
      setRunning(false);
      audioRef.current.play();
      if (onFinish) onFinish();
    }
  }, [secondsLeft, running, onFinish]);

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
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
          >
            Iniciar
          </button>
        ) : (
          <button
            onClick={stopTimer}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
          >
            Detener
          </button>
        )}
      </div>
    </div>
  );
}
