// src/hooks/useCollection.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function useCollection(collName, orderField = null) {
  const [data, setData] = useState([]);
  useEffect(() => {
    let q = collection(db, collName);
    if (orderField) q = query(q, orderBy(orderField));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(docs);
    });
    return () => unsub();
  }, [collName, orderField]);
  return data;
}
