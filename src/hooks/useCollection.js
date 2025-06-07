// src/hooks/useCollection.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";   // <–– ahora existe db

export default function useCollection(collName, orderField = null) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let q = collection(db, collName);
    if (orderField) {
      q = query(q, orderBy(orderField));
    }
    const unsub = onSnapshot(q, (snapshot) => {
      const results = [];
      snapshot.forEach((doc) => results.push({ id: doc.id, ...doc.data() }));
      setDocs(results);
    });
    return () => unsub();
  }, [collName, orderField]);

  return docs;
}
