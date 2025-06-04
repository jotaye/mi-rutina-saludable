// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Asegura que Tailwind se cargue

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
