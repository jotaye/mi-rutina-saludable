// src/hooks/useCollection.js
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";

export default function useCollection(collName, orderField = null) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    let q = collection(db, collName);
    if (orderField) {
      q = query(q, orderBy(orderField));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(results);
    });

    return () => unsubscribe();
  }, [collName, orderField]);

  return docs;
}
