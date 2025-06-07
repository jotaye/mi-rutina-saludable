// src/main.jsx
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then(regs => regs.forEach(r => r.unregister()))
    .catch(console.error);
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
