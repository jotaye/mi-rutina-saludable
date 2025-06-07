// src/firebase.js
-import { initializeApp } from "firebase/app";
-import { getAuth } from "firebase/auth";
+import { initializeApp } from "firebase/app";
+import { getAuth } from "firebase/auth";
+import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {
   apiKey: "AIzaSyC7jYi0ST5rfYvfZcb8QgeMmvvVcrKDFiU",
   authDomain: "mi-rutina-saludable.firebaseapp.com",
   projectId: "mi-rutina-saludable",
   storageBucket: "mi-rutina-saludable.firebasestorage.app",
   messagingSenderId: "17810301001",
   appId: "1:17810301001:web:a0d9b260b138c81980df98",
   measurementId: "G-W2ZMDYK46E"
 };

 // Inicializa Firebase App
 const app = initializeApp(firebaseConfig);

 // Exporta Auth
 export const auth = getAuth(app);

 // <<< Nuevo: inicializa y exporta Firestore
 export const db = getFirestore(app);
