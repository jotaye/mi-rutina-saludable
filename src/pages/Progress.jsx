import React, { useState, useEffect, useContext } from "react";
import { getFirestore, collection, addDoc, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { AppContext } from "../App";

export default function Progress() {
  const { lang } = useContext(AppContext);
  const auth = getAuth();
  const db = getFirestore();
  const user = auth.currentUser;
  const [note, setNote] = useState("");
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "progress"), where("uid", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });
    return () => unsub();
  }, [user]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    try {
      await addDoc(collection(db, "progress"), {
        uid: user.uid,
        note,
        createdAt: new Date()
      });
      setNote("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-6">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">
        {lang === "es" ? "Mi progreso" : "My progress"}
      </h1>
      <form onSubmit={handleAdd} className="mb-6">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={lang === "es" ? "Escribe tu nota..." : "Write your note..."}
          className="w-full p-3 border rounded mb-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          rows={3}
        />
        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          {lang === "es" ? "Agregar" : "Add"}
        </button>
      </form>
      <div className="space-y-4">
        {entries.map((entry) => (
          <div key={entry.id} className="p-4 bg-gray-100 dark:bg-gray-800 rounded">
            <p className="text-gray-800 dark:text-gray-200">{entry.note}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(entry.createdAt.seconds * 1000).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
