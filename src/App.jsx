// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import UserProfile from "./pages/UserProfile";
import DarkModeToggle from "./components/DarkModeToggle";
import { ProgressProvider } from "./context/ProgressContext";
import { UserProvider } from "./context/UserContext";

export const AppContext = createContext();

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

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timeoutId = setTimeout(() => setLoadingIntro(false), 3000);
    return () => clearTimeout(timeoutId);
  }, []);

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
    <UserProvider>
      <ProgressProvider>
        <AppContext.Provider value={{ darkMode, toggleDarkMode, lang, toggleLang }}>
          <Router>
            {user && <Navbar lang={lang} />}
            <Routes>
              <Route path="/perfil" element={user ? <UserProfile /> : <Navigate to="/login" />} />
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
    </UserProvider>
  );
}

function Navbar({ lang }) {
  const location = useLocation();

  const links = [
    { to: "/", label: lang === "es" ? "Hoy" : "Today" },
    { to: "/semana", label: lang === "es" ? "Semana" : "Week" },
    { to: "/progreso", label: lang === "es" ? "Progreso" : "Progress" },
    { to: "/nutricion", label: lang === "es" ? "Nutrición" : "Nutrition" },
    { to: "/perfil", label: lang === "es" ? "Perfil" : "Profile" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`py-5 px-3 ${
                  location.pathname === link.to
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }  
                  dark:text-gray-300 dark:hover:text-blue-400 transition`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                const auth = getAuth();
                signOut(auth);
              }}
              className="text-red-600 hover:text-red-800 transition"
            >
              {lang === "es" ? "Cerrar sesión" : "Log Out"}
            </button>
            <button
              onClick={() => {
                toggleLang();
              }}
              className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
            <DarkModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default App;
