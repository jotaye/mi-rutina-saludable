// src/App.jsx

import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importa aquí tus páginas y componentes
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Timer from "./components/Timer";
import Progress from "./pages/Progress";
import DarkModeToggle from "./components/DarkModeToggle";
import Nutrition from "./pages/Nutrition";

// --------------------------------------------------
// 1) CONFIGURACIÓN DE FIREBASE: debes copiar tus datos
// --------------------------------------------------
// Ve a la Consola de Firebase → Configuración del proyecto → Tus apps → SDK para Web
// Ahí verás un bloque parecido a este (ejemplo ficticio):
//
//   const firebaseConfig = {
//     apiKey: "AIzaSyD12345_XXXXXXXXXXXXXXXXXXXXXXX",
//     authDomain: "mi-proyecto.firebaseapp.com",
//     projectId: "mi-proyecto",
//     storageBucket: "mi-proyecto.appspot.com",
//     messagingSenderId: "1234567890",
//     appId: "1:1234567890:web:abcdef123456",
//     measurementId: "G-ABCDEFGH"
//   };
//
// Debes copiar cada uno de esos valores en lugar de "TU_...".

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
  measurementId: "TU_MEASUREMENT_ID"
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
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
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
  // 6) Forzar que el splash desaparezca tras X segundos
  // --------------------------------------------------
  useEffect(() => {
    // 3000 ms = 3 segundos de espera máxima
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
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
          src="/assets/intro.mov"       // <–– Debe existir en public/assets/intro.mov
          autoPlay                      // Reproducción automática
          loop                          // Loop indefinido
          muted={true}                  // Silenciar para permitir autoplay
          playsInline                   // Evita forzar fullscreen en iOS/Android
          onEnded={handleIntroEnded}    // Se dispara cuando el video finaliza
          onError={handleIntroError}    // Si ocurre un error de carga
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
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

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
          {/* Si “user” está logueado, lo dejamos en la página Home; si no, redirigimos a /login */}
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
