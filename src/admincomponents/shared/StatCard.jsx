import React from "react";
import "./StatCard.css";

export default function StatCard({ label, value, sub, color, loading }) {
  return (
    <div className={`stat-card stat-card--${color || "blue"}`}>
      <div className="stat-card__label">{label}</div>
      {loading ? (
        <div className="stat-card__skeleton" />
      ) : (
        <div className="stat-card__value">{value ?? "—"}</div>
      )}
      {sub && <div className="stat-card__sub">{sub}</div>}
    </div>
  );
}

export { StatCard };
