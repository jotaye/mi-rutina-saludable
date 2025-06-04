// src/pages/Login.jsx

import React, { useState, useContext } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
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
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {lang === "es" ? "Iniciar sesión" : "Log In"}
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
            {lang === "es" ? "Ingresar" : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          {lang === "es" ? "¿No tienes cuenta?" : "Don’t have an account?"}{" "}
          <a
            href="/registro"
            className="text-blue-600 hover:underline"
          >
            {lang === "es" ? "Regístrate" : "Sign Up"}
          </a>
        </p>
      </div>
    </div>
  );
}
