// src/pages/ResetPassword.jsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setStatus({ type: "success", msg: "Revisa tu correo para el enlace de restablecer." });
    } catch (err) {
      setStatus({ type: "error", msg: err.message });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Restablecer contraseña</h2>
        {status && (
          <p className={`text-sm mb-4 ${status.type === "error" ? "text-red-600" : "text-green-600"}`}>
            {status.msg}
          </p>
        )}
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded mb-4 focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Enviar enlace
        </button>
      </form>
    </div>
  );
}
