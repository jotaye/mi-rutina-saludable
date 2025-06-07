// src/App.jsx
import React, { useState, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Context Providers
import { UserProvider, UserContext } from "./context/UserContext";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import WeekView from "./pages/WeekView";
import Progress from "./pages/Progress";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

// Components
import Navbar from "./components/Navbar";

// Firebase config
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
getAuth();

export const AppContext = createContext();

export default function App() {
  const [lang, setLang] = useState("es");
  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  return (
    <AppContext.Provider value={{ lang, toggleLang }}>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/reset" element={<ResetPassword />} />

            {/* privadas */}
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/semana" element={<PrivateRoute><WeekView /></PrivateRoute>} />
            <Route path="/progreso" element={<PrivateRoute><Progress /></PrivateRoute>} />
            <Route path="/nutricion" element={<PrivateRoute><Nutrition /></PrivateRoute>} />
            <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* sólo admin */}
            <Route
              path="/admin"
              element={
                <PrivateRoute requireAdmin>
                  <Admin />
                </PrivateRoute>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </AppContext.Provider>
  );
}

// Componente que protege rutas y evita destructuring cuando el contexto
function PrivateRoute({ children, requireAdmin = false }) {
  const ctx = useContext(UserContext);
  const user = ctx?.user;
  const isAdmin = ctx?.isAdmin;

  if (!user) {
    // no logueado → login
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && !isAdmin) {
    // no es admin → inicio
    return <Navigate to="/" replace />;
  }
  return children;
}
