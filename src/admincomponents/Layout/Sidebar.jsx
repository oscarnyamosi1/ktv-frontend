import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const NAV_ITEMS = [
  { path: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
  { path: "/admin/jobs", label: "Job Management", icon: "📋" },
  { path: "/admin/communications", label: "Communications", icon: "✉" },
  { path: "/admin/analytics", label: "Analytics", icon: "📊" },
  { path: "/admin/users", label: "Users", icon: "👥" },
  { path: "/admin/school-profile", label: "School Profile", icon: "🏫" },
  { path: "/admin/subscriptions", label: "Subscriptions", icon: "💳" },
  { path: "/admin/moderation", label: "Moderation", icon: "🛡" },
  { path: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function Sidebar({ collapsed, onToggle, mobileOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const classes = [
    "sidebar",
    collapsed ? "sidebar--collapsed" : "",
    mobileOpen ? "sidebar--mobile-open" : "",
  ].filter(Boolean).join(" ");

  return (
    <aside className={classes}>
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <span className="sidebar__logo">KT</span>
          {!collapsed && <span className="sidebar__brand-text">Kenya Teachers</span>}
        </div>
        <button className="sidebar__toggle" onClick={onToggle} aria-label="Toggle sidebar">
          {collapsed ? "›" : "‹"}
        </button>
      </div>

      <nav className="sidebar__nav">
        {NAV_ITEMS.map((item) => {
          const currentPath = location.pathname || "";
          const isActive = currentPath === item.path || 
                          (item.path !== "/admin/dashboard" && currentPath.startsWith(item.path));
          return (
            <button
              key={item.path}
              className={`sidebar__item${isActive ? " sidebar__item--active" : ""}`}
              title={collapsed ? item.label : ""}
              onClick={() => navigate(item.path)}
              type="button"
            >
              <span className="sidebar__icon">{item.icon}</span>
              {!collapsed && <span className="sidebar__label">{item.label}</span>}
              {isActive && !collapsed && <span className="sidebar__active-bar" />}
            </button>
          );
        })}
      </nav>

      <div className="sidebar__footer">
        <div className={`sidebar__user${collapsed ? " sidebar__user--collapsed" : ""}`}>
          <div className="sidebar__avatar">A</div>
          {!collapsed && (
            <div className="sidebar__user-info">
              <span className="sidebar__user-name">Admin</span>
              <span className="sidebar__user-role">Platform Admin</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export { Sidebar };
