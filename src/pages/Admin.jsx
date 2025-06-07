// src/pages/Admin.jsx
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import useCollection from "../hooks/useCollection";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Admin() {
  const { isAdmin } = useContext(UserContext);
  const usuarios = useCollection("usuarios"); // colección de perfiles
  const [edits, setEdits] = useState({});

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">No autorizado</h1>
        <p>Solo los administradores pueden acceder a esta sección.</p>
      </div>
    );
  }

  const handleChange = (uid, field, value) => {
    setEdits((prev) => ({
      ...prev,
      [uid]: { ...prev[uid], [field]: value },
    }));
  };

  const handleSave = async (uid) => {
    const ref = doc(db, "usuarios", uid);
    await updateDoc(ref, edits[uid]);
    alert("Perfil actualizado");
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Panel de Administración</h1>

      {/* Sección de edición de usuarios */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Perfiles de usuarios</h2>
        {usuarios.length === 0 && <p>No hay usuarios registrados.</p>}
        {usuarios.map((u) => (
          <div
            key={u.id}
            className="border rounded-lg p-4 mb-4 bg-white shadow-sm"
          >
            <p className="mb-2">
              <strong>Email:</strong> {u.data.email}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["peso", "altura", "nivel"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize mb-1">
                    {field}
                  </label>
                  <input
                    type="text"
                    defaultValue={u.data[field] || ""}
                    onChange={(e) =>
                      handleChange(u.id, field, e.target.value)
                    }
                    className="w-full border px-2 py-1 rounded focus:outline-none focus:ring"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => handleSave(u.id)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Guardar cambios
            </button>
          </div>
        ))}
      </section>

      {/* Aquí podrías seguir con rutinas y planes */}
    </div>
  );
}
