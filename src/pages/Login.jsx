// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      const code = error.code;
      let msg = "";
      if (code === "auth/user-not-found") {
        msg = lang === "es" ? "Usuario no encontrado." : "User not found.";
      } else if (code === "auth/wrong-password") {
        msg = lang === "es" ? "Contraseña incorrecta." : "Wrong password.";
      } else if (code === "auth/invalid-email") {
        msg = lang === "es" ? "Email inválido." : "Invalid email.";
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
            {lang === "es" ? "Iniciar sesión" : "Log In"}
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-800 dark:text-gray-100"
                placeholder={lang === "es" ? "********" : "********"}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {lang === "es" ? "Ingresar" : "Log In"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            {lang === "es" ? "¿No tienes cuenta? " : "Don't have an account? "}
            <a href="/registro" className="text-blue-600 dark:text-blue-400 hover:underline">
              {lang === "es" ? "Regístrate" : "Register"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
