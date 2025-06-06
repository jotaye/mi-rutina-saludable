// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({
  percentage = 0,
  label = "",
  colorClass = "bg-primary-500",
}) {
  const pct = Math.min(Math.max(percentage, 0), 100);
  return (
    <div className="mb-4">
      {label && <p className="font-sans text-gray-700 mb-1">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`${colorClass} h-4 rounded-full transition-all duration-300`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-sm font-sans text-gray-600 mt-1">{`${Math.round(
        pct
      )}%`}</p>
    </div>
  );
}
