// src/App.jsx
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Context Providers
import { UserProvider } from "./context/UserContext";
export const AppContext = createContext();

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

function App() {
  const [lang, setLang] = useState("es");
  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  return (
    <AppContext.Provider value={{ lang, toggleLang }}>
      <UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/reset" element={<ResetPassword />} />

            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/semana" element={<PrivateRoute><WeekView /></PrivateRoute>} />
            <Route path="/progreso" element={<PrivateRoute><Progress /></PrivateRoute>} />
            <Route path="/nutricion" element={<PrivateRoute><Nutrition /></PrivateRoute>} />
            <Route path="/perfil" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute requireAdmin><Admin /></PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </AppContext.Provider>
  );
}

// Helper to protect routes
function PrivateRoute({ children, requireAdmin = false }) {
  const { user, isAdmin } = React.useContext(UserContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default App;
