// src/pages/Login.jsx
import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../App";

export default function Login() {
  const auth = getAuth();
  const navigate = useNavigate();
  const { lang } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // redirige al home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm relative"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {lang === "es" ? "Iniciar sesión" : "Sign In"}
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <label className="block mb-2 text-sm font-medium">
          {lang === "es" ? "Correo electrónico" : "Email"}
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 text-sm font-medium">
          {lang === "es" ? "Contraseña" : "Password"}
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-2 p-2 border rounded"
        />

        <div className="flex justify-end mb-4">
          <Link
            to="/reset"
            className="text-sm text-blue-600 hover:underline"
          >
            {lang === "es" ? "¿Olvidaste tu contraseña?" : "Forgot password?"}
          </Link>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {lang === "es" ? "Ingresar" : "Sign In"}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          {lang === "es" ? "¿No tienes cuenta?" : "Don't have an account?"}{" "}
          <Link to="/registro" className="text-blue-600 hover:underline">
            {lang === "es" ? "Regístrate" : "Register"}
          </Link>
        </p>
      </form>
    </div>
  );
}
