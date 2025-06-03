import React, { useState, useEffect } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds((secs) => secs + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Temporizador</h2>
      <div className="text-5xl font-mono text-gray-700 dark:text-gray-200">
        {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </div>
      <div className="mt-6 space-x-4">
        <button
          onClick={() => setIsActive(!isActive)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}
