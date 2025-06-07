import React, { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import { UserContextProvider } from "./context/UserContext";

// Inicializa Firebase
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

// Contexto de la App (idioma y tema)
export const AppContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("es");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, u => setUser(u));
    return unsubscribe;
  }, []);

  const toggleLang = () => setLang(l => (l === "es" ? "en" : "es"));
  const toggleDark = () => setDarkMode(d => !d);

  return (
    <AppContext.Provider value={{ lang, toggleLang, darkMode, toggleDark }}>
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
