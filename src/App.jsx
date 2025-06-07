// src/App.jsx
import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

import { UserContextProvider } from "./context/UserContext";
import { auth } from "./firebase";   // <–– importamos el auth ya inicializado

export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("es");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <AppContext.Provider
      value={{
        lang,
        toggleLang: () => setLang((l) => (l === "es" ? "en" : "es")),
        darkMode,
        toggleDark: () => setDarkMode((d) => !d),
      }}
    >
      <UserContextProvider>
        <Router>
          <Navbar user={user} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/semana" element={user ? <WeekView /> : <Navigate to="/login" />} />
            <Route path="/progreso" element={user ? <Progress /> : <Navigate to="/login" />} />
            <Route path="/nutricion" element={user ? <Nutrition /> : <Navigate to="/login" />} />
            <Route path="/perfil" element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </AppContext.Provider>
  );
}
