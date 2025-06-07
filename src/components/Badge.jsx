// src/components/Badge.jsx
import React from "react";

export default function Badge({ icon, title, desc, unlocked }) {
  return (
    <div
      className={`flex flex-col items-center space-y-1 p-2 ${
        unlocked ? "opacity-100" : "opacity-30"
      }`}
      title={desc}
    >
      <div className="bg-white p-3 rounded-full shadow-md">
        {icon}
      </div>
      <p className="text-sm font-sans text-center">{title}</p>
    </div>
  );
}
