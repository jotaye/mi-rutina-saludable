// src/App.jsx

import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";

// ──────────────────────────────────────────────────────────────────────────
// 1) Importamos todo lo necesario de Firebase
// ──────────────────────────────────────────────────────────────────────────
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// ──────────────────────────────────────────────────────────────────────────
// 2) Importa tus páginas/componentes
// ──────────────────────────────────────────────────────────────────────────
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Timer from "./components/Timer";
import DarkModeToggle from "./components/DarkModeToggle";
import Nutrition from "./pages/Nutrition";

// ──────────────────────────────────────────────────────────────────────────
// 3) CONFIGURACIÓN DE FIREBASE: pega aquí los valores EXACTOS que tienes
//    en la consola de Firebase → Configuración del proyecto → Tus apps → SDK
// ──────────────────────────────────────────────────────────────────────────
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

// ──────────────────────────────────────────────────────────────────────────
// 4) Creamos un contexto para tema (darkMode) e idioma
// ──────────────────────────────────────────────────────────────────────────
export const AppContext = createContext();

function App() {
  // ────────────────────────────────────────────────────────────────────────
  // 5) Estados principales
  //    - user: si está autenticado, se renderiza Home/WeekView/etc. Si null, redirige a /login
  //    - darkMode: para tema (claro/oscuro)
  //    - lang: para idioma (“es” / “en”)
  //    - loading: controla el “splash” con intro.mov
  // ────────────────────────────────────────────────────────────────────────
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");
  const [loading, setLoading] = useState(true);

  // ────────────────────────────────────────────────────────────────────────
  // 6) Escuchamos cambios de estado de autenticación
  //    Cuando Firebase termine de cargar, onAuthStateChanged se dispara automáticamente
  // ────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr); // usr = null si no está logueado, o { uid, email, … } si sí lo está
    });
    return () => unsubscribe();
  }, []);

  // ────────────────────────────────────────────────────────────────────────
  // 7) Tema oscuro: añadimos/quitanos la clase “dark” en <html>
  // ────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // ────────────────────────────────────────────────────────────────────────
  // 8) Forzamos que, tras 3 segundos, el splash desaparezca aun si onAuthStateChanged
  //    no se ha disparado o el video no carga. Así nunca te “quedas atorado” en negro.
  // ────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // ────────────────────────────────────────────────────────────────────────
  // 9) Handler para cuando el video intro termine de reproducirse
  // ────────────────────────────────────────────────────────────────────────
  const handleIntroEnded = () => {
    setLoading(false);
  };

  // ────────────────────────────────────────────────────────────────────────
  // 10) Handler para si el video intro da error (404 o códec no soportado)
  // ────────────────────────────────────────────────────────────────────────
  const handleIntroError = () => {
    setLoading(false);
  };

  // ────────────────────────────────────────────────────────────────────────
  // 11) Si seguimos en “loading = true”, mostramos el splash (intro.mov)
  // ────────────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video
          src="/assets/intro.mov"       // Debe existir EXACTO en public/assets/intro.mov
          autoPlay                      // Forzamos autoplay
          loop                          // Loop indefinido
          muted={true}                  // Silenciar (sin sonido) para que el navegador lo reproduzca
          playsInline                   // Evita fullscreen en iOS/Android
          onEnded={handleIntroEnded}    // Cuando termine el video, setLoading(false)
          onError={handleIntroError}    // Si da error (404, codec, etc.), setLoading(false)
          className="w-full h-full object-cover"
        >
          Tu navegador no soporta reproducir este video.
        </video>
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────
  // 12) Funciones auxiliares para tema e idioma
  // ────────────────────────────────────────────────────────────────────────
  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  // ────────────────────────────────────────────────────────────────────────
  // 13) Renderizado principal (una vez loading = false)
  // ────────────────────────────────────────────────────────────────────────
  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, lang, toggleLang }}>
      <Router>
        {/*
          Si user ≠ null (ya está autenticado), mostramos el navbar.
          Si user === null (no autenticado), no lo mostramos y la ruta "/" redirigirá a /login.
        */}
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
          {/*
            - Si “user” existe, ruta "/" → <Home />
            - Si “user” es null, en "/" hacemos <Navigate to="/login" />
          */}
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />

          {/* Rutas abiertas: Login y Registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />

          {/* Rutas protegidas: solo si user ≠ null */}
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
