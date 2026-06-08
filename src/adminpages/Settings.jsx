import React, { useState } from "react";
import "./Settings.css";

const EMAIL_TEMPLATES = [
  { key: "welcome", label: "Welcome Email", subject: "Welcome to Kenya Teachers Platform" },
  { key: "shortlist", label: "Shortlist Notification", subject: "You have been shortlisted!" },
  { key: "interview", label: "Interview Invitation", subject: "Interview Invitation" },
  { key: "rejection", label: "Rejection Notice", subject: "Application Status Update" },
];

export default function Settings() {
  const [config, setConfig] = useState({
    site_name: "Kenya Teachers Platform",
    contact_email: "admin@kenyateachers.co.ke",
    max_jobs_per_school: 10,
    require_verification: true,
    allow_cv_uploads: true,
    maintenance_mode: false,
  });
  const [notifications, setNotifications] = useState({
    new_applicant: true, shortlist: true, interview: true,
    new_user: true, fraud_alert: true, system_alert: false,
  });
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [saved, setSaved] = useState(false);

  function saveConfig() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div className="settings">
      <div className="settings__card">
        <h3 className="settings__section-title">Global Configuration</h3>
        <div className="form-row">
          <div className="form-group">
            <label>Platform Name</label>
            <input value={config.site_name} onChange={(e) => setConfig({ ...config, site_name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Admin Contact Email</label>
            <input type="email" value={config.contact_email} onChange={(e) => setConfig({ ...config, contact_email: e.target.value })} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Max Jobs Per School</label>
            <input type="number" value={config.max_jobs_per_school} onChange={(e) => setConfig({ ...config, max_jobs_per_school: e.target.value })} />
          </div>
        </div>
        <div className="settings__toggles">
          {[
            ["require_verification", "Require account verification"],
            ["allow_cv_uploads", "Allow CV uploads"],
            ["maintenance_mode", "Maintenance mode"],
          ].map(([key, label]) => (
            <label key={key} className="settings__toggle-row">
              <span className="settings__toggle-label">{label}</span>
              <div className={`settings__toggle${config[key] ? " settings__toggle--on" : ""}`}
                   onClick={() => setConfig({ ...config, [key]: !config[key] })}>
                <div className="settings__toggle-thumb" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="settings__card">
        <h3 className="settings__section-title">Notification Rules</h3>
        <div className="settings__notification-list">
          {Object.entries(notifications).map(([key, val]) => (
            <label key={key} className="settings__toggle-row">
              <span className="settings__toggle-label">{key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</span>
              <div className={`settings__toggle${val ? " settings__toggle--on" : ""}`}
                   onClick={() => setNotifications({ ...notifications, [key]: !val })}>
                <div className="settings__toggle-thumb" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="settings__card">
        <h3 className="settings__section-title">Email Templates</h3>
        <div className="settings__templates">
          {EMAIL_TEMPLATES.map((t) => (
            <div key={t.key} className={`settings__template${activeTemplate === t.key ? " settings__template--active" : ""}`}
                 onClick={() => setActiveTemplate(activeTemplate === t.key ? null : t.key)}>
              <div className="settings__template-header">
                <span className="settings__template-label">{t.label}</span>
                <span className="settings__template-subject">{t.subject}</span>
              </div>
              {activeTemplate === t.key && (
                <textarea
                  className="settings__template-body"
                  rows={6}
                  placeholder={`Write the ${t.label.toLowerCase()} body here...`}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="settings__card">
        <h3 className="settings__section-title">API Integrations</h3>
        <div className="settings__integrations">
          {[
            { name: "Cloudinary (Image Uploads)", status: "configured", key: "VITE_CLOUDINARY_CLOUD_NAME" },
            { name: "SMS Gateway (Africa's Talking)", status: "not_configured", key: "AT_API_KEY" },
            { name: "Payment Gateway (Mpesa)", status: "not_configured", key: "MPESA_CONSUMER_KEY" },
          ].map((integ) => (
            <div key={integ.name} className="settings__integ-row">
              <div className="settings__integ-info">
                <span className="settings__integ-name">{integ.name}</span>
                <span className="settings__integ-key">Env: {integ.key}</span>
              </div>
              <span className={`settings__integ-status settings__integ-status--${integ.status === "configured" ? "ok" : "missing"}`}>
                {integ.status === "configured" ? "Configured" : "Not Configured"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="settings__footer">
        {saved && <span className="settings__saved">Settings saved.</span>}
        <button className="btn-primary" onClick={saveConfig}>Save Settings</button>
      </div>
    </div>
  );
}

export { Settings };
