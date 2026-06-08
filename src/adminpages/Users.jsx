import React, { useState } from "react";
import { useApi, apiRequest } from "../adminhooks/useApi.js";
import DataTable from "../admincomponents/shared/DataTable.jsx";
import Badge from "../admincomponents/shared/Badge.jsx";
import "./Users.css";

const MOCK_USERS = [
  { id: 1, name: "Mary Wanjiku", email: "mary@example.com", role: "teacher", status: "approved", joined: "2026-03-12", applications: 3 },
  { id: 2, name: "James Ochieng", email: "james@example.com", role: "teacher", status: "pending", joined: "2026-05-01", applications: 1 },
  { id: 3, name: "Aisha Hassan", email: "aisha@example.com", role: "teacher", status: "approved", joined: "2025-11-20", applications: 7 },
  { id: 4, name: "Peter Kamau", email: "peter@example.com", role: "teacher", status: "suspended", joined: "2025-09-14", applications: 0 },
  { id: 5, name: "Grace Muthoni", email: "grace@example.com", role: "admin", status: "approved", joined: "2025-06-01", applications: 0 },
];

const ROLES = ["teacher", "admin", "recruiter", "school_hr"];
const STATUS_VARIANT = { approved: "success", pending: "warning", suspended: "danger" };

export default function Users() {
  const { data, loading, refetch } = useApi("/admin/users/");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const users = (data?.results || data || MOCK_USERS).filter((u) => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchStatus;
  });

  async function updateUser(userId, patch) {
    try { await apiRequest("PATCH", `/admin/users/${userId}/`, patch); refetch(); } catch {}
  }

  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role", render: (v, row) => (
      <select
        className="users__role-select"
        value={v}
        onChange={(e) => updateUser(row.id, { role: e.target.value })}
      >
        {ROLES.map((r) => <option key={r} value={r}>{r.replace("_", " ")}</option>)}
      </select>
    )},
    { key: "status", label: "Status", render: (v) => <Badge label={v} variant={STATUS_VARIANT[v] || "default"} /> },
    { key: "joined", label: "Joined" },
    { key: "applications", label: "Applications" },
    { key: "actions", label: "Actions", render: (_, row) => (
      <div className="users__actions">
        {row.status !== "approved" && (
          <button className="users__btn users__btn--verify" onClick={() => updateUser(row.id, { status: "approved" })}>Verify</button>
        )}
        {row.status !== "suspended" && (
          <button className="users__btn users__btn--suspend" onClick={() => updateUser(row.id, { status: "suspended" })}>Suspend</button>
        )}
        {row.status === "suspended" && (
          <button className="users__btn users__btn--verify" onClick={() => updateUser(row.id, { status: "approved" })}>Restore</button>
        )}
      </div>
    )},
  ];

  return (
    <div className="users">
      <div className="users__toolbar">
        <div className="users__filters">
          <input
            className="users__search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="users__filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Users</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
        <div className="users__counts">
          <span className="users__count-tag">Total: <strong>{users.length}</strong></span>
          <span className="users__count-tag users__count-tag--pending">Pending: <strong>{(data?.results || data || MOCK_USERS).filter((u) => u.status === "pending").length}</strong></span>
        </div>
      </div>
      <DataTable columns={columns} data={users} loading={loading} emptyMsg="No users found." />
    </div>
  );
}

export { Users };
