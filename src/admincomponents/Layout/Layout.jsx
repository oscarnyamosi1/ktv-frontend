import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import "./Layout.css";

const PAGE_TITLES = {
  "/admin/dashboard": "Dashboard",
  "/admin/jobs": "Job Management",
  "/admin/communications": "Communications",
  "/admin/analytics": "Analytics & Reports",
  "/admin/users": "User Management",
  "/admin/school-profile": "School Profile",
  "/admin/subscriptions": "Subscriptions",
  "/admin/moderation": "Moderation",
  "/admin/settings": "Settings",
  "/admin/applicants": "Applicants",
};

export default function Layout({ children, currentPath }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const title = Object.entries(PAGE_TITLES).find(([key]) =>
    currentPath.startsWith(key)
  )?.[1] || "Dashboard";

  return (
    <div className="layout">
      {mobileOpen && (
        <div className="layout__overlay" onClick={() => setMobileOpen(false)} />
      )}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
      />
      <div className="layout__main">
        <Header
          title={title}
          onMenuClick={() => setMobileOpen((o) => !o)}
        />
        <main className="layout__content">{children}</main>
      </div>
    </div>
  );
}

export { Layout };
