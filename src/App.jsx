// src/App.jsx

import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Timer from "./components/Timer";
import Progress from "./pages/Progress";
import DarkModeToggle from "./components/DarkModeToggle";
import Nutrition from "./pages/Nutrition";

// ----------------------------------------------
// 1) Configuración de Firebase (copia tus datos)
// ----------------------------------------------
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID"
};

initializeApp(firebaseConfig);
const auth = getAuth();

// ----------------------------------------------------
// 2) Contexto para compartir tema (darkMode) e idioma
// ----------------------------------------------------
export const AppContext = createContext();

function App() {
  // --------------------------------------------------
  // Estados principales
  // --------------------------------------------------
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");      // "es" o "en"
  const [loading, setLoading] = useState(true); // Controla el splash screen

  // --------------------------------------------------
  // 3) Listener de estado de autenticación de Firebase
  // --------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
    });
    return () => unsubscribe();
  }, []);

  // --------------------------------------------------
  // 4) Cambiar clase "dark" en <html> si darkMode = true
  // --------------------------------------------------
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // --------------------------------------------------
  // 5) Forzar que el splash desaparezca tras 3 segundos
  // --------------------------------------------------
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3000 ms = 3 segundos como máximo
    return () => clearTimeout(timeoutId);
  }, []);

  // --------------------------------------------------
  // 6) Cuando el video de introducción termine, ocultar splash
  // --------------------------------------------------
  const handleIntroEnded = () => {
    setLoading(false);
  };

  // --------------------------------------------------
  // 7) Si ocurre error al cargar el video, ocultar splash
  // --------------------------------------------------
  const handleIntroError = () => {
    setLoading(false);
  };

  // --------------------------------------------------
  // 8) Si estamos en “loading”, mostramos splash full-screen
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video
          src="/assets/intro.mov"     // Debe existir en public/assets/intro.mov
          autoPlay                    // Forzamos reproducción automática
          muted={true}                // Silenciado: necesario para que autoplay funcione
          playsInline                 // Evita fullscreen forzado en iOS/Android
          onEnded={handleIntroEnded}  // Al terminar el video, setLoading(false)
          onError={handleIntroError}  // Si hay error, setLoading(false)
          className="w-full h-full object-cover"
        >
          Tu navegador no soporta reproducir este video.
        </video>
      </div>
    );
  }

  // --------------------------------------------------
  // 9) Funciones para alternar modo oscuro e idioma
  // --------------------------------------------------
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  // --------------------------------------------------
  // 10) Renderizado principal de la aplicación
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
