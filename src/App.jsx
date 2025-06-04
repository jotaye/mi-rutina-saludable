// src/App.jsx

import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Importa tus páginas y componentes
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Machines from "./pages/Machines";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Timer from "./components/Timer";
import DarkModeToggle from "./components/DarkModeToggle";

// --------------------------------------------------
// 1) Configuración de Firebase (valores reales)
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
// 2) Contexto para tema (darkMode) e idioma (lang)
// ----------------------------------------------------
export const AppContext = createContext();

function App() {
  // --------------------------------------------------
  // 3) Estados principales
  // --------------------------------------------------
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");      // “es” o “en”
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // --------------------------------------------------
  // 4) Listener de Firebase Auth
  // --------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  // --------------------------------------------------
  // 5) Cambiar clase “dark” en <html> si darkMode = true
  // --------------------------------------------------
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // --------------------------------------------------
  // 6) Forzar el splash máximo de 3 segundos
  // --------------------------------------------------
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoadingIntro(false);
    }, 3000);
    return () => clearTimeout(timeoutId);
  }, []);

  // --------------------------------------------------
  // 7) Handlers del video intro
  // --------------------------------------------------
  const handleIntroEnded = () => setLoadingIntro(false);
  const handleIntroError = () => setLoadingIntro(false);

  // --------------------------------------------------
  // 8) Mientras loadingIntro === true, mostramos el splash
  // --------------------------------------------------
  if (loadingIntro) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <video
          src="/assets/intro.mov"
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
  // 9) Si aún no sabemos el estado de autenticación,
  //    mostramos un “Cargando…” hasta que onAuthStateChanged se dispare.
  // --------------------------------------------------
  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <
