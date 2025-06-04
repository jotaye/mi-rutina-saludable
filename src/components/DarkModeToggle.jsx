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
      {darkMode ? "🌞" : "🌜"}
    </button>
  );
}
