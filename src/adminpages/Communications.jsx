import React, { useState } from "react";
import { useApi, apiRequest } from "../adminhooks/useApi.js";
import "./Communications.css";

const MOCK_MESSAGES = [
  { id: 1, to: "Mary Wanjiku", subject: "Interview Invitation", type: "individual", date: "2026-05-26", status: "sent" },
  { id: 2, to: "All Applicants - Senior Math Teacher", subject: "Application Update", type: "bulk", date: "2026-05-25", status: "sent" },
  { id: 3, to: "James Ochieng", subject: "Shortlist Notification", type: "individual", date: "2026-05-24", status: "sent" },
  { id: 4, to: "320 Users", subject: "Platform Announcement", type: "broadcast", date: "2026-05-22", status: "sent" },
];

export default function Communications() {
  const [tab, setTab] = useState("compose");
  const [form, setForm] = useState({ to: "", subject: "", body: "", type: "individual" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSend() {
    if (!form.to || !form.subject || !form.body) return;
    setSending(true);
    try {
      await apiRequest("POST", "/communications/", form);
    } catch {}
    setSent(true);
    setSending(false);
    setTimeout(() => setSent(false), 3000);
    setForm({ to: "", subject: "", body: "", type: "individual" });
  }

  return (
    <div className="comms">
      <div className="comms__tabs">
        {[["compose", "Compose Message"], ["history", "Message History"]].map(([key, label]) => (
          <button key={key} className={`comms__tab${tab === key ? " comms__tab--active" : ""}`} onClick={() => setTab(key)}>
            {label}
          </button>
        ))}
      </div>

      {tab === "compose" && (
        <div className="comms__compose">
          <div className="form-group">
            <label>Message Type</label>
            <div className="comms__type-group">
              {[["individual", "Individual"], ["bulk", "Bulk (per job)"], ["broadcast", "Broadcast All Users"]].map(([val, lbl]) => (
                <button
                  key={val}
                  className={`comms__type-btn${form.type === val ? " comms__type-btn--active" : ""}`}
                  onClick={() => setForm({ ...form, type: val })}
                >
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              {form.type === "broadcast" ? "Recipients" : "To"}
            </label>
            {form.type === "broadcast" ? (
              <input value="All registered users" readOnly className="comms__input comms__input--readonly" />
            ) : (
              <input
                className="comms__input"
                placeholder={form.type === "bulk" ? "Enter job ID or select job" : "Applicant email or name"}
                value={form.to}
                onChange={(e) => setForm({ ...form, to: e.target.value })}
              />
            )}
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              className="comms__input"
              placeholder="Message subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Message Body</label>
            <textarea
              className="comms__textarea"
              rows={8}
              placeholder="Write your message here..."
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </div>

          <div className="comms__templates">
            <span className="comms__templates-label">Quick templates:</span>
            <button className="comms__template-btn" onClick={() => setForm({ ...form, subject: "Interview Invitation", body: "Dear Applicant,\n\nWe are pleased to invite you for an interview for the position you applied for.\n\nPlease confirm your availability.\n\nRegards,\nHR Team" })}>
              Interview Invite
            </button>
            <button className="comms__template-btn" onClick={() => setForm({ ...form, subject: "Application Shortlisted", body: "Dear Applicant,\n\nCongratulations! Your application has been shortlisted. We will be in touch with next steps.\n\nRegards,\nHR Team" })}>
              Shortlist Notice
            </button>
            <button className="comms__template-btn" onClick={() => setForm({ ...form, subject: "Application Status Update", body: "Dear Applicant,\n\nThank you for applying. After careful review, we regret to inform you that you have not been selected for this position.\n\nWe wish you the best in your job search.\n\nRegards,\nHR Team" })}>
              Rejection Notice
            </button>
          </div>

          {sent && <div className="comms__success">Message sent successfully.</div>}

          <div className="comms__actions">
            <button className="btn-ghost" onClick={() => setForm({ to: "", subject: "", body: "", type: "individual" })}>Clear</button>
            <button className="btn-primary" onClick={handleSend} disabled={sending || !form.subject || !form.body}>
              {sending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}

      {tab === "history" && (
        <div className="comms__history">
          <table className="comms__table">
            <thead>
              <tr>
                <th>To</th><th>Subject</th><th>Type</th><th>Date</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_MESSAGES.map((m) => (
                <tr key={m.id}>
                  <td>{m.to}</td>
                  <td>{m.subject}</td>
                  <td><span className={`comms__type-badge comms__type-badge--${m.type}`}>{m.type}</span></td>
                  <td>{m.date}</td>
                  <td><span className="comms__status">Sent</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export { Communications };
