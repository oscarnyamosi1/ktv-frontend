import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useApi, apiRequest } from "../adminhooks/useApi.js";
import DataTable from "../admincomponents/shared/DataTable.jsx";
import Badge from "../admincomponents/shared/Badge.jsx";
import "./Applicants.css";

const STATUS_VARIANTS = { shortlisted: "success", rejected: "danger", interview: "warning", applied: "default" };
const MOCK_APPLICANTS = [
  { id: 1, name: "Mary Wanjiku", email: "mary@example.com", qualification: "B.Ed Mathematics", experience: 4, subjects: "Mathematics", status: "shortlisted" },
  { id: 2, name: "James Ochieng", email: "james@example.com", qualification: "B.Ed Science", experience: 2, subjects: "Physics, Chemistry", status: "applied" },
  { id: 3, name: "Aisha Hassan", email: "aisha@example.com", qualification: "PGDE", experience: 7, subjects: "Mathematics, Statistics", status: "interview" },
  { id: 4, name: "Peter Kamau", email: "peter@example.com", qualification: "B.Ed Arts", experience: 1, subjects: "History, CRE", status: "rejected" },
  { id: 5, name: "Grace Muthoni", email: "grace@example.com", qualification: "B.Ed Mathematics", experience: 5, subjects: "Mathematics", status: "applied" },
];

export default function Applicants() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const jobId = queryParams.get("job");
  const { data, loading, refetch } = useApi(jobId ? `/admin/applicants/?job=${jobId}` : "/admin/applicants/");
  const [selected, setSelected] = useState([]);
  const [filterQual, setFilterQual] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const applicants = (data?.results || data || MOCK_APPLICANTS).filter((a) => {
    const matchQual = !filterQual || a.qualification?.toLowerCase().includes(filterQual.toLowerCase());
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchQual && matchStatus;
  });

  async function updateStatus(applicantId, status) {
    try {
      await apiRequest("PATCH", `/applicants/${applicantId}/`, { status });
      refetch();
    } catch {}
  }

  async function bulkAction(action) {
    for (const sid of selected) {
      await updateStatus(sid, action).catch(() => {});
    }
    setSelected([]);
    refetch();
  }

  function toggleSelect(id) {
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }

  const columns = [
    { key: "select", label: "", width: 36, render: (_, row) => (
      <input type="checkbox" checked={selected.includes(row.id)} onChange={() => toggleSelect(row.id)} />
    )},
    { key: "name", label: "Applicant" },
    { key: "email", label: "Email" },
    { key: "qualification", label: "Qualification" },
    { key: "experience", label: "Exp (yrs)", render: (v) => `${v ?? 0}y` },
    { key: "subjects", label: "Subjects" },
    { key: "status", label: "Status", render: (v) => (
      <Badge label={v} variant={STATUS_VARIANTS[v] || "default"} />
    )},
    { key: "actions", label: "Actions", render: (_, row) => (
      <div className="app__actions">
        <button className="app__btn app__btn--shortlist" onClick={() => updateStatus(row.id, "shortlisted")}>Shortlist</button>
        <button className="app__btn app__btn--interview" onClick={() => updateStatus(row.id, "interview")}>Interview</button>
        <button className="app__btn app__btn--reject" onClick={() => updateStatus(row.id, "rejected")}>Reject</button>
        <a className="app__btn app__btn--cv" href="#" download>CV</a>
      </div>
    )},
  ];

  return (
    <div className="applicants">
      <div className="applicants__toolbar">
        <div className="applicants__filters">
          <input
            className="app__search"
            placeholder="Filter by qualification..."
            value={filterQual}
            onChange={(e) => setFilterQual(e.target.value)}
          />
          <select className="app__select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interview">Interview</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        {selected.length > 0 && (
          <div className="applicants__bulk">
            <span className="app__selected-count">{selected.length} selected</span>
            <button className="app__bulk-btn app__bulk-btn--shortlist" onClick={() => bulkAction("shortlisted")}>Shortlist All</button>
            <button className="app__bulk-btn app__bulk-btn--reject" onClick={() => bulkAction("rejected")}>Reject All</button>
          </div>
        )}
      </div>

      <div className="applicants__summary">
        <span>Total: <strong>{applicants.length}</strong></span>
        <span>Shortlisted: <strong className="app__count--green">{applicants.filter((a) => a.status === "shortlisted").length}</strong></span>
        <span>Interview: <strong className="app__count--yellow">{applicants.filter((a) => a.status === "interview").length}</strong></span>
        <span>Rejected: <strong className="app__count--red">{applicants.filter((a) => a.status === "rejected").length}</strong></span>
      </div>

      <DataTable columns={columns} data={applicants} loading={loading} emptyMsg="No applicants found for this job." />
    </div>
  );
}

export { Applicants };
