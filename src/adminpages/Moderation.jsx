import React, { useState } from "react";
import { useApi, apiRequest } from "../adminhooks/useApi.js";
import Badge from "../admincomponents/shared/Badge.jsx";
import "./Moderation.css";

const MOCK_FLAGS = [
  { id: 1, type: "job", content: "Suspicious job posting: \"Pay KES 5000 application fee\"", reporter: "Mary Wanjiku", date: "2026-05-26", status: "pending" },
  { id: 2, type: "profile", content: "Unverified credentials on profile: John Doe", reporter: "System", date: "2026-05-25", status: "pending" },
  { id: 3, type: "job", content: "Duplicate job posting detected", reporter: "System", date: "2026-05-24", status: "resolved" },
];

const MOCK_AUDIT = [
  { id: 1, user: "Admin", action: "Verified user account", target: "Grace Muthoni", date: "2026-05-27 10:24" },
  { id: 2, user: "Admin", action: "Published job posting", target: "Senior Math Teacher", date: "2026-05-27 09:12" },
  { id: 3, user: "Admin", action: "Suspended user", target: "Peter Kamau", date: "2026-05-26 16:30" },
  { id: 4, user: "Admin", action: "Rejected flag", target: "Job #3 duplicate", date: "2026-05-26 14:08" },
  { id: 5, user: "Admin", action: "Sent bulk message", target: "45 applicants", date: "2026-05-25 11:22" },
];

const MOCK_ALERTS = [
  { id: 1, type: "fraud", message: "Multiple applications from same IP address (41.90.x.x)", severity: "high", date: "2026-05-27" },
  { id: 2, type: "spam", message: "Repeated job posts with identical content from same account", severity: "medium", date: "2026-05-26" },
  { id: 3, type: "system", message: "API rate limit exceeded from 3rd-party client", severity: "low", date: "2026-05-25" },
];

export default function Moderation() {
  const [tab, setTab] = useState("flags");
  const [flags, setFlags] = useState(MOCK_FLAGS);

  function resolveFlag(id, action) {
    setFlags((prev) => prev.map((f) => f.id === id ? { ...f, status: "resolved" } : f));
  }

  return (
    <div className="mod">
      <div className="mod__tabs">
        {[["flags", "Flagged Content"], ["alerts", "Fraud Alerts"], ["audit", "Audit Log"]].map(([key, label]) => (
          <button key={key} className={`mod__tab${tab === key ? " mod__tab--active" : ""}`} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "flags" && (
        <div className="mod__section">
          <div className="mod__list">
            {flags.map((flag) => (
              <div key={flag.id} className={`mod__flag${flag.status === "resolved" ? " mod__flag--resolved" : ""}`}>
                <div className="mod__flag-meta">
                  <span className={`mod__type-badge mod__type-badge--${flag.type}`}>{flag.type}</span>
                  <span className="mod__date">{flag.date}</span>
                  <span className="mod__reporter">Reported by: {flag.reporter}</span>
                </div>
                <p className="mod__flag-content">{flag.content}</p>
                <div className="mod__flag-actions">
                  {flag.status === "pending" ? (
                    <>
                      <button className="mod__btn mod__btn--approve" onClick={() => resolveFlag(flag.id, "approved")}>Approve Content</button>
                      <button className="mod__btn mod__btn--remove" onClick={() => resolveFlag(flag.id, "removed")}>Remove Content</button>
                    </>
                  ) : (
                    <span className="mod__resolved-tag">Resolved</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "alerts" && (
        <div className="mod__section">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className={`mod__alert mod__alert--${alert.severity}`}>
              <div className="mod__alert-header">
                <span className={`mod__severity mod__severity--${alert.severity}`}>{alert.severity}</span>
                <span className="mod__alert-type">{alert.type}</span>
                <span className="mod__date">{alert.date}</span>
              </div>
              <p className="mod__alert-msg">{alert.message}</p>
              <div className="mod__alert-actions">
                <button className="mod__btn mod__btn--dismiss">Dismiss</button>
                <button className="mod__btn mod__btn--investigate">Investigate</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "audit" && (
        <div className="mod__section">
          <div className="mod__audit-table-wrap">
            <table className="mod__audit-table">
              <thead>
                <tr><th>User</th><th>Action</th><th>Target</th><th>Date &amp; Time</th></tr>
              </thead>
              <tbody>
                {MOCK_AUDIT.map((entry) => (
                  <tr key={entry.id}>
                    <td><span className="mod__audit-user">{entry.user}</span></td>
                    <td>{entry.action}</td>
                    <td className="mod__audit-target">{entry.target}</td>
                    <td className="mod__audit-date">{entry.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export { Moderation };
