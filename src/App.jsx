// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import DarkModeToggle from "./components/DarkModeToggle";
import { ProgressProvider } from "./context/ProgressContext";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7jYi0ST5rfYvfZcb8QgeMmvvVcrKDFiU",
  authDomain: "mi-rutina-saludable.firebaseapp.com",
  projectId: "mi-rutina-saludable",
  storageBucket: "mi-rutina-saludable.appspot.com",
  messagingSenderId: "17810301001",
  appId: "1:17810301001:web:a0d9b260b138c81980df98",
  measurementId: "G-W2ZMDYK46E"
};

initializeApp(firebaseConfig);
const auth = getAuth();

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // Observa el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // Aplica el modo oscuro/claro
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Simula pantalla de intro por 3 segundos
  useEffect(() => {
    const timeoutId = setTimeout(() => setLoadingIntro(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Mientras dure la intro, muestra solo el video
  if (loadingIntro) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video
          src="/assets/intro.mov"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Tu navegador no soporta reproducir este video.
        </video>
      </div>
    );
  }

  // Hasta que Firebase chequeé la sesión, muestra “Cargando…”
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <p className="text-gray-500">Cargando …</p>
      </div>
    );
  }

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  return (
    <ProgressProvider>
      <AppContext.Provider value={{ darkMode, toggleDarkMode, lang, toggleLang }}>
        <Router>
          {user && (
            <nav className="p-4 bg-white dark:bg-gray-800 shadow flex justify-between">
              <div className="space-x-4">
                <Link to="/" className="text-gray-700 dark:text-gray-200">
                  {lang === "es" ? "Hoy" : "Today"}
                </Link>
                <Link to="/semana" className="text-gray-700 dark:text-gray-200">
                  {lang === "es" ? "Semana" : "Week"}
                </Link>
                <Link to="/progreso" className="text-gray-700 dark:text-gray-200">
                  {lang === "es" ? "Progreso" : "Progress"}
                </Link>
                <Link to="/nutricion" className="text-gray-700 dark:text-gray-200">
                  {lang === "es" ? "Nutrición" : "Nutrition"}
                </Link>
              </div>
              <div className="space-x-4 flex items-center">
                <button
                  onClick={() => signOut(auth)}
                  className="text-red-600 hover:underline"
                >
                  {lang === "es" ? "Cerrar sesión" : "Log Out"}
                </button>
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
            <Route path="/semana" element={user ? <WeekView /> : <Navigate to="/login" />} />
            <Route path="/progreso" element={user ? <Progress /> : <Navigate to="/login" />} />
            <Route path="/nutricion" element={user ? <Nutrition /> : <Navigate to="/login" />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </ProgressProvider>
  );
}

export default App;
