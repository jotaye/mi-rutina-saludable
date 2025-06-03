import React, { useContext } from "react";
import { AppContext } from "../App";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode, lang } = useContext(AppContext);
  return (
    <button onClick={toggleDarkMode} className="text-gray-700 dark:text-gray-200">
      {darkMode
        ? (lang === "es" ? "Claro" : "Light")
        : (lang === "es" ? "Oscuro" : "Dark")}
    </button>
  );
}
