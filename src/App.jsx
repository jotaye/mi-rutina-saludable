// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ResetPassword from "./pages/ResetPassword";
import Navbar from "./components/Navbar";
import { getAnalytics } from "firebase/analytics";

// ---- Firebase config ----
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
getAnalytics();

const auth = getAuth();

export const AppContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState("es");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  return (
    <AppContext.Provider value={{ lang, toggleLang }}>
      <Router>
        {user && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/registro"
            element={!user ? <Register /> : <Navigate to="/" replace />}
          />
          <Route
            path="/reset"
            element={!user ? <ResetPassword /> : <Navigate to="/" replace />}
          />
          <Route
            path="/semana"
            element={user ? <WeekView /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/progreso"
            element={user ? <Progress /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/nutricion"
            element={user ? <Nutrition /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/perfil"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/admin"
            element={user ? <Admin /> : <Navigate to="/login" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
