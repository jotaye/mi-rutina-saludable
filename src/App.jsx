// src/App.jsx

import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importa tus páginas/componentes
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Timer from "./components/Timer";
import DarkModeToggle from "./components/DarkModeToggle";

// --------------------------------------------------
// 1) CONFIGURACIÓN DE FIREBASE: pega aquí tus datos
// --------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyC7jYi0ST5rfYvfZcb8QgeMmvvVcrKDFiU",
  authDomain: "mi-rutina-saludable.firebaseapp.com",
  projectId: "mi-rutina-saludable",
  storageBucket: "mi-rutina-saludable.firebasestorage.app",
  messagingSenderId: "17810301001",
  appId: "1:17810301001:web:a0d9b260b138c81980df98",
  measurementId: "G-W2ZMDYK46E"
};

initializeApp(firebaseConfig);
const auth = getAuth();

// ----------------------------------------------------
// 2) Creamos un contexto para tema (darkMode) e idioma
// ----------------------------------------------------
export const AppContext = createContext();

function App() {
  // --------------------------------------------------
  // 3) Estados principales
  // --------------------------------------------------
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");      // "es" o "en"
  const [loading, setLoading] = useState(true); // Controla el splash/video de introducción

  // --------------------------------------------------
  // 4) Listener de autenticación de Firebase
  // --------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, usr => {
      setUser(usr);
    });
    return () => unsubscribe();
  }, []);

  // --------------------------------------------------
  // 5) Si darkMode=true, añadimos clase “dark” al <html>
  // --------------------------------------------------
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // --------------------------------------------------
  // 6) Forzar que el splash desaparezca tras 3 segundos
  // --------------------------------------------------
  useEffect(() => {
    const timeoutId = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // --------------------------------------------------
  // 7) Cuando el video intro termine, ocultamos el splash
  // --------------------------------------------------
  const handleIntroEnded = () => {
    setLoading(false);
  };

  // --------------------------------------------------
  // 8) Si hay error al cargar el video, también ocultamos el splash
  // --------------------------------------------------
  const handleIntroError = () => {
    setLoading(false);
  };

  // --------------------------------------------------
  // 9) Mientras “loading” sea true, mostramos el splash
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video
          src="/assets/intro.mov"       // Asegúrate que exista en public/assets/intro.mov
          autoPlay
          loop
          muted
          playsInline
          onEnded={handleIntroEnded}
          onError={handleIntroError}
          className="w-full h-full object-cover"
        >
          Tu navegador no soporta reproducir este video.
        </video>
      </div>
    );
  }

  // --------------------------------------------------
  // 10) Funciones para alternar tema e idioma
  // --------------------------------------------------
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLang = () => setLang(prev => (prev === "es" ? "en" : "es"));

  // --------------------------------------------------
  // 11) Renderizado principal de la aplicación
  // --------------------------------------------------
  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, lang, toggleLang }}>
      <Router>
        {user && (
          <nav className="p-4 bg-white dark:bg-gray-800 shadow flex justify-between items-center">
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-700 dark:text-gray-200 hover:underline">
                {lang === "es" ? "Hoy" : "Today"}
              </Link>
              <Link to="/semana" className="text-gray-700 dark:text-gray-200 hover:underline">
                {lang === "es" ? "Semana" : "Week"}
              </Link>
              <Link to="/progreso" className="text-gray-700 dark:text-gray-200 hover:underline">
                {lang === "es" ? "Progreso" : "Progress"}
              </Link>
              <Link to="/nutricion" className="text-gray-700 dark:text-gray-200 hover:underline">
                {lang === "es" ? "Nutrición" : "Nutrition"}
              </Link>
            </div>
            <div className="flex space-x-4">
              <button onClick={toggleLang} className="text-gray-700 dark:text-gray-200">
                {lang === "es" ? "EN" : "ES"}
              </button>
              <DarkModeToggle />
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          <Route
            path="/semana"
            element={user ? <WeekView /> : <Navigate to="/login" />}
          />
          <Route
            path="/timer"
            element={user ? <Timer /> : <Navigate to="/login" />}
          />
          <Route
            path="/progreso"
            element={user ? <Progress /> : <Navigate to="/login" />}
          />
          <Route
            path="/nutricion"
            element={user ? <Nutrition /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
