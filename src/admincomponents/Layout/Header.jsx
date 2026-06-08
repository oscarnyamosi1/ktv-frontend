import React from "react";
import "./Header.css";

export default function Header({ title, onMenuClick }) {
  return (
    <header className="header">
      <div className="header__left">
        <button className="header__menu-btn" onClick={onMenuClick} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <h1 className="header__title">{title}</h1>
      </div>
      <div className="header__right">
        <button className="header__action-btn" aria-label="Notifications">
          <span className="header__bell">🔔</span>
          <span className="header__badge">3</span>
        </button>
        <div className="header__avatar">A</div>
      </div>
    </header>
  );
}

export { Header };
