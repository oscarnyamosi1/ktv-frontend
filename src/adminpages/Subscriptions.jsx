import React, { useState } from "react";
import { useApi } from "../adminhooks/useApi.js";
import Badge from "../admincomponents/shared/Badge.jsx";
import "./Subscriptions.css";

const PLANS = [
  { name: "Free", jobs: 2, featured: 0, price: "KES 0/mo", active: false },
  { name: "Standard", jobs: 10, featured: 2, price: "KES 2,500/mo", active: true },
  { name: "Professional", jobs: 30, featured: 10, price: "KES 6,500/mo", active: false },
  { name: "Enterprise", jobs: "Unlimited", featured: "Unlimited", price: "Custom", active: false },
];

const MOCK_PAYMENTS = [
  { id: "INV-001", plan: "Standard", amount: "KES 2,500", date: "2026-05-01", status: "paid" },
  { id: "INV-002", plan: "Standard", amount: "KES 2,500", date: "2026-04-01", status: "paid" },
  { id: "INV-003", plan: "Standard", amount: "KES 2,500", date: "2026-03-01", status: "paid" },
  { id: "INV-004", plan: "Free", amount: "KES 0", date: "2026-02-01", status: "paid" },
];

export default function Subscriptions() {
  const [boostModal, setBoostModal] = useState(false);

  return (
    <div className="subs">
      <div className="subs__current">
        <h3 className="subs__section-title">Current Plan</h3>
        <div className="subs__plan-info">
          <div className="subs__plan-badge">Standard Plan</div>
          <p className="subs__plan-desc">10 active job postings · 2 featured boosts · KES 2,500/month</p>
          <p className="subs__plan-renewal">Next renewal: June 1, 2026</p>
        </div>
      </div>

      <h3 className="subs__section-title">Available Plans</h3>
      <div className="subs__plans">
        {PLANS.map((plan) => (
          <div key={plan.name} className={`subs__plan${plan.active ? " subs__plan--active" : ""}`}>
            {plan.active && <span className="subs__plan-current-tag">Current</span>}
            <h4 className="subs__plan-name">{plan.name}</h4>
            <div className="subs__plan-price">{plan.price}</div>
            <ul className="subs__plan-features">
              <li>{plan.jobs} job postings</li>
              <li>{plan.featured} featured boost{plan.featured !== 1 ? "s" : ""}</li>
              <li>Applicant management</li>
              <li>Analytics dashboard</li>
              {plan.name !== "Free" && <li>Priority support</li>}
            </ul>
            <button className={`subs__plan-btn${plan.active ? " subs__plan-btn--active" : ""}`} disabled={plan.active}>
              {plan.active ? "Active Plan" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>

      <div className="subs__boosts">
        <div className="subs__boosts-header">
          <h3 className="subs__section-title">Featured Job Boosts</h3>
          <button className="btn-primary" onClick={() => setBoostModal(true)}>+ Boost a Job</button>
        </div>
        <p className="subs__boost-desc">Featured jobs appear at the top of search results and are highlighted to teachers. 2 boosts remaining this month.</p>
        <div className="subs__boost-bar">
          <div className="subs__boost-used" style={{ width: "0%" }} />
        </div>
        <p className="subs__boost-label">0 of 2 boosts used this month</p>
      </div>

      <div className="subs__payments">
        <h3 className="subs__section-title">Payment History</h3>
        <div className="subs__table-wrap">
          <table className="subs__table">
            <thead>
              <tr><th>Invoice</th><th>Plan</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {MOCK_PAYMENTS.map((p) => (
                <tr key={p.id}>
                  <td className="subs__invoice-id">{p.id}</td>
                  <td>{p.plan}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                  <td><Badge label={p.status} variant="success" /></td>
                  <td><button className="subs__download-btn">Download PDF</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export { Subscriptions };
