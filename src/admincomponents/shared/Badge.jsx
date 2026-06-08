import React from "react";
import "./Badge.css";

export default function Badge({ label, variant }) {
  return (
    <span className={`badge badge--${variant || "default"}`}>{label}</span>
  );
}

export { Badge };
