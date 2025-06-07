// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { lang, toggleLang } = useContext(AppContext);
  const { isAdmin, logOut } = useContext(UserContext);
  const location = useLocation();

  const links = [
    { to: "/", label: lang === "es" ? "Hoy" : "Today" },
    { to: "/semana", label: lang === "es" ? "Semana" : "Week" },
    { to: "/progreso", label: lang === "es" ? "Progreso" : "Progress" },
    { to: "/nutricion", label: lang === "es" ? "Nutrición" : "Nutrition" },
    { to: "/perfil", label: lang === "es" ? "Perfil" : "Profile" },
    // Solo mostrar Admin si el usuario es admin
    ...(isAdmin ? [{ to: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo o título */}
          <Link to="/" className="text-2xl font-serif font-bold text-primary-600">
            MiRutina
          </Link>

          {/* Enlaces y botones */}
          <div className="flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-2 px-3 font-sans ${
                  location.pathname === link.to
                    ? "text-primary-600 border-b-2 border-primary-600"
                    : "text-gray-700 hover:text-primary-600"
                } dark:text-gray-300 dark:hover:text-primary-400 transition`}
              >
                {link.label}
              </Link>
            ))}

            {/* Alternar idioma */}
            <button
              onClick={toggleLang}
              className="ml-4 text-sm font-sans text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            {/* Cerrar sesión */}
            <button
              onClick={logOut}
              className="ml-4 text-sm font-sans text-red-600 hover:text-red-800 transition"
            >
              {lang === "es" ? "Salir" : "Logout"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
