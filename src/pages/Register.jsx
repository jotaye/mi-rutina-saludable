// src/pages/Register.jsx

import React, { useState, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
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
      navigate("/");
    } catch (error) {
      const code = error.code;
      let msg = "";
      if (code === "auth/email-already-in-use") {
        msg = lang === "es" ? "El correo ya está en uso." : "Email already in use.";
      } else if (code === "auth/invalid-email") {
        msg = lang === "es" ? "Email inválido." : "Invalid email.";
      } else if (code === "auth/weak-password") {
        msg = lang === "es" ? "La contraseña es muy débil." : "Password is too weak.";
      } else {
        msg = error.message;
      }
      setErrorMsg(msg);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
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
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/90 dark:bg-gray-900/90 p-6 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">
            {lang === "es" ? "Crear cuenta" : "Register"}
          </h2>
          {errorMsg && (
            <p className="text-red-500 text-sm mb-2 text-center">{errorMsg}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                {lang === "es" ? "Correo electrónico" : "Email"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300 dark:bg-gray-800 dark:text-gray-100"
                placeholder={lang === "es" ? "tucorreo@ejemplo.com" : "you@example.com"}
              />
            </div>
            <div>
              <label className="block text-gray-700 dark:text-gray-200 mb-1">
                {lang === "es" ? "Contraseña" : "Password"}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-green-300 dark:bg-gray-800 dark:text-gray-100"
                placeholder={lang === "es" ? "********" : "********"}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            >
              {lang === "es" ? "Crear cuenta" : "Register"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {lang === "es" ? "¿Ya tienes cuenta? " : "Already have an account? "}
            <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
              {lang === "es" ? "Inicia sesión" : "Log In"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
