// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // redirige a "/"
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}

        <label className="block text-sm mb-1">Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring"
        />

        <label className="block text-sm mb-1">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring"
        />

        <p className="text-right mb-4">
          <a
            href="/reset"
            className="text-blue-600 hover:underline text-sm"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Ingresar
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
}
