// src/components/DarkModeToggle.jsx

import React, { useContext } from "react";
import { AppContext } from "../App";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useContext(AppContext);

  return (
    <button
      onClick={toggleDarkMode}
      className="text-gray-700 dark:text-gray-200 p-2"
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        // Icono de sol para luz
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M7.05 16.95l-1.414 1.414m0-12.728l1.414 1.414M16.95 16.95l1.414 1.414M12 8a4 4 0 100 8 4 4 0 000-8z"
          />
        </svg>
      ) : (
        // Icono de luna para oscuro
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 118.646 3.646 7 7 0 0020.354 15.354z"
          />
        </svg>
      )}
    </button>
  );
}
