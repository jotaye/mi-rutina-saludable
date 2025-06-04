// src/pages/Register.jsx
import React, { useState, useContext } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Register() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { lang } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/"); // Al crear la cuenta, redirige a Home
    } catch (error) {
      if (lang === "es") {
        setErrorMsg(`Error de Firebase: ${error.message}`);
      } else {
        setErrorMsg(`Firebase Error: ${error.message}`);
      }
    }
  };

  return (
    <div className="relative h-screen w-full">
      {/* Video de fondo idéntico al de Login */}
      <video
        src="/assets/intro.mov"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        Tu navegador no soporta reproducir este video.
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/95 p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
            {lang === "es" ? "Crear cuenta" : "Sign Up"}
          </h2>
          {errorMsg && (
            <p className="text-red-500 text-sm mb-2">{errorMsg}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">
                {lang === "es" ? "Correo electrónico" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-700">
                {lang === "es" ? "Contraseña" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              {lang === "es" ? "Registrarse" : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            {lang === "es" ? "¿Ya tienes cuenta?" : "Already have an account?"}{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              {lang === "es" ? "Inicia sesión" : "Log In"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
