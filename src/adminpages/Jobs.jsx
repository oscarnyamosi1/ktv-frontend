import React, { useState } from "react";
import { useApi, apiRequest } from "../adminhooks/useApi.js";
import DataTable from "../admincomponents/shared/DataTable.jsx";
import Modal from "../admincomponents/shared/Modal.jsx";
import Badge from "../admincomponents/shared/Badge.jsx";
import "./Jobs.css";

const MOCK_JOBS = [
  { id: 1, title: "Senior Mathematics Teacher", school: "Nairobi Academy", subjects: "Mathematics", deadline: "2026-06-15", published: true, applicants: 34 },
  { id: 2, title: "English & Literature Teacher", school: "Mombasa High School", subjects: "English", deadline: "2026-06-20", published: true, applicants: 21 },
  { id: 3, title: "Biology & Chemistry Teacher", school: "Kisumu Girls", subjects: "Science", deadline: "2026-07-01", published: false, applicants: 8 },
  { id: 4, title: "History & CRE Teacher", school: "Nakuru Boys", subjects: "History", deadline: "2026-07-10", published: true, applicants: 15 },
];

const EMPTY_FORM = { title: "", school: "", subjects: "", qualifications: "", experience: "", deadline: "", description: "", published: false };

export default function Jobs() {
  const { data, loading, refetch } = useApi("/admin/jobs/");
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const jobs = (data?.results || data || MOCK_JOBS).filter((j) => {
    const matchSearch = j.title?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || (filter === "active" ? j.published : !j.published);
    return matchSearch && matchFilter;
  });

  function openCreate() { setForm(EMPTY_FORM); setModal("create"); }
  function openEdit(job) { setForm({ ...job }); setModal("edit"); }
  function openDuplicate(job) { setForm({ ...job, id: undefined, title: `Copy of ${job.title}` }); setModal("create"); }

  async function handleSave() {
    setSaving(true);
    try {
      if (modal === "edit" && form.id) await apiRequest("PATCH", `/admin/jobs/${form.id}/`, form);
      else await apiRequest("POST", "/admin/jobs/", form);
      setModal(null);
      refetch();
    } catch { /* show fallback */ } finally { setSaving(false); }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this job posting?")) return;
    try { await apiRequest("DELETE", `/admin/jobs/${id}/`); refetch(); } catch {}
  }

  async function togglePublish(job) {
    try { await apiRequest("PATCH", `/admin/jobs/${job.id}/`, { published: !job.published }); refetch(); } catch {}
  }

  const columns = [
    { key: "title", label: "Job Title", render: (v, row) => (
      <button type="button" className="jobs__link" onClick={() => openEdit(row)}>{v}</button>
    )},
    { key: "school", label: "School" },
    { key: "subjects", label: "Subjects" },
    { key: "deadline", label: "Deadline" },
    { key: "applicants", label: "Applicants", render: (v) => <span className="jobs__count">{v ?? 0}</span> },
    { key: "published", label: "Status", render: (v, row) => (
      <button className={`jobs__toggle${v ? " jobs__toggle--on" : ""}`} onClick={() => togglePublish(row)}>
        {v ? "Published" : "Draft"}
      </button>
    )},
    { key: "actions", label: "Actions", render: (_, row) => (
      <div className="jobs__actions">
        <button className="btn-icon" onClick={() => openEdit(row)} title="Edit">✏</button>
        <button className="btn-icon" onClick={() => openDuplicate(row)} title="Duplicate">⊕</button>
        <button className="btn-icon btn-icon--danger" onClick={() => handleDelete(row.id)} title="Delete">✕</button>
      </div>
    )},
  ];

  return (
    <div className="jobs">
      <div className="jobs__toolbar">
        <div className="jobs__filters">
          <input
            className="jobs__search"
            placeholder="Search job postings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-job-search"
          />
          <select className="jobs__filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Jobs</option>
            <option value="active">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
        <button className="btn-primary" onClick={openCreate} data-testid="button-create-job">
          + New Job
        </button>
      </div>

      <DataTable columns={columns} data={jobs} loading={loading} emptyMsg="No job postings found." />

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal === "edit" ? "Edit Job" : "Create Job"} size="lg">
        <div className="jobs__form">
          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Senior Mathematics Teacher" />
            </div>
            <div className="form-group">
              <label>School</label>
              <input value={form.school} onChange={(e) => setForm({ ...form, school: e.target.value })} placeholder="School name" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Subjects</label>
              <input value={form.subjects} onChange={(e) => setForm({ ...form, subjects: e.target.value })} placeholder="e.g. Mathematics, Physics" />
            </div>
            <div className="form-group">
              <label>Qualifications Required</label>
              <input value={form.qualifications} onChange={(e) => setForm({ ...form, qualifications: e.target.value })} placeholder="e.g. B.Ed, PGDE" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Experience (years)</label>
              <input type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} placeholder="Minimum years" />
            </div>
            <div className="form-group">
              <label>Application Deadline</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
            </div>
          </div>
          <div className="form-group form-group--full">
            <label>Job Description</label>
            <textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the role and requirements..." />
          </div>
          <div className="form-group form-group--checkbox">
            <label>
              <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
              Publish immediately
            </label>
          </div>
          <div className="modal-footer">
            <button className="btn-ghost" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save Job"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export { Jobs };
