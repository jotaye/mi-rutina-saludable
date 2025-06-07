// src/App.jsx
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import { UserProvider } from "./context/UserContext";
import { GoalsProvider } from "./context/GoalsContext";
import { ProgressProvider } from "./context/ProgressContext";
import { AchievementsProvider } from "./context/AchievementsContext";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");

  // Pedir permiso de notificaciones
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Listener de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleLang = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  return (
    <AppContext.Provider value={{ darkMode, toggleDarkMode, lang, toggleLang }}>
      <UserProvider>
        <GoalsProvider>
          <ProgressProvider>
            <AchievementsProvider>
              <Router>
                {user && <Navbar />}
                <Routes>
                  <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
                  <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
                  <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
                  <Route path="/semana" element={user ? <WeekView /> : <Navigate to="/login" replace />} />
                  <Route path="/progreso" element={user ? <Progress /> : <Navigate to="/login" replace />} />
                  <Route path="/nutricion" element={user ? <Nutrition /> : <Navigate to="/login" replace />} />
                  <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/login" replace />} />
                  <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
                </Routes>
              </Router>
            </AchievementsProvider>
          </ProgressProvider>
        </GoalsProvider>
      </UserProvider>
    </AppContext.Provider>
  );
}

export default App;
