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

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

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


// src/pages/Home.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import useCollection from "../hooks/useCollection";

export default function Home() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  const hoy = dias[new Date().getDay()];

  const rutinas = useCollection("rutinas");
  const planes = useCollection("mealPlans");

  const rutinaSemanal = Object.fromEntries(rutinas.map((d) => [d.id, d.ejercicios]));
  const mealPlans = Object.fromEntries(planes.map((d) => [d.id, d.comidas]));

  const ejerciciosHoy = rutinaSemanal[hoy] || [];
  const menuHoy = mealPlans[hoy] || [];

  return (
    <div className="p-6 space-y-10">
      <div>
        <h1 className="text-3xl font-serif font-bold mb-4 capitalize">
          {`Mi rutina de hoy (${hoy})`}
        </h1>
        <div className="space-y-8">
          {ejerciciosHoy.length === 0 ? (
            <p className="font-sans text-gray-500">Descanso</p>
          ) : (
            ejerciciosHoy.map((ej, idx) => (
              <div key={idx} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-serif font-semibold mb-4">{ej.nombre}</h2>
                <video src={ej.video} controls className="w-full max-w-lg mx-auto rounded-md mb-4 bg-black" />
                {ej.descripcion && (
                  <ol className="list-decimal list-inside text-gray-700 mb-4">
                    {ej.descripcion.map((paso, i) => (<li key={i}>{paso}</li>))}
                  </ol>
                )}
                <div className="mb-4 text-gray-700">
                  <p><strong>Series:</strong> {ej.series} × {Math.round(ej.duracionSerie/60)} min</p>
                  <p><strong>Descanso:</strong> {ej.descanso}s</p>
                </div>
                <SeriesTimer
                  series={ej.series}
                  duracionSerie={ej.duracionSerie}
                  descanso={ej.descanso}
                  nombreEjercicio={ej.nombre}
                  caloriasBase={ej.caloriasBase}
                  diaClave={hoy}
                  nivel={profile.nivel}
                  onFinish={() => alert(`${ej.nombre} completado y registrado automáticamente.`)}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-serif font-bold mb-6">Plan alimenticio para hoy</h2>
        {menuHoy.length===0 ? (
          <p className="font-sans text-gray-500">No hay plan alimenticio para hoy.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuHoy.map((c, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <img src={c.img} alt={c.nombre} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                  <h3 className="text-xl font-serif font-semibold mb-2">{c.nombre}</h3>
                  <p className="font-sans text-gray-700">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8">
        <a href="/semana" className="text-primary-500 hover:underline mr-6 transition">Ver toda la semana</a>
        <a href="/nutricion" className="text-primary-500 hover:underline transition">Ir a Nutrición</a>
      </div>
    </div>
  );
}


// src/pages/WeekView.jsx
import React, { useContext } from "react";
import { AppContext } from "../App";
import { UserContext } from "../context/UserContext";
import SeriesTimer from "../components/SeriesTimer";
import useCollection from "../hooks/useCollection";

export default function WeekView() {
  const { lang } = useContext(AppContext);
  const { profile } = useContext(UserContext);

  const rutinas = useCollection("rutinas");
  const rutinaSemanal = Object.fromEntries(rutinas.map((d) => [d.id, d.ejercicios]));
  const diasOrden = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-serif font-bold mb-4">Rutina semanal</h1>
      {diasOrden.map((dia) => (
        <div key={dia}>
          <h2 className="text-2xl font-serif font-semibold mb-4 capitalize">{dia}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(rutinaSemanal[dia] || []).map((ej, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
                <video src={ej.video} controls className="w-full h-40 object-cover bg-black" />
                <div className="p-4">
                  <h3 className="text-lg font-serif font-semibold">{ej.nombre}</h3>
                  <p className="text-sm text-gray-600 mb-2">Series: {ej.series} × {Math.round(ej.duracionSerie/60)} min</p>
                  <p className="text-sm text-gray-600 mb-4">Descanso: {ej.descanso} s</p>
                  <SeriesTimer
                    series={ej.series}
                    duracionSerie={ej.duracionSerie}
                    descanso={ej.descanso}
                    nombreEjercicio={ej.nombre}
                    caloriasBase={ej.caloriasBase}
                    diaClave={dia}
                    nivel={profile.nivel}
                    onFinish={() => alert(`${ej.nombre} completado y registrado automáticamente.`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
