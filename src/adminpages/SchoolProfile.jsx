import React, { useState } from "react";
import { useApi, apiRequest } from "../adminhooks/useApi.js";
import CloudinaryUpload from "../admincomponents/shared/CloudinaryUpload.jsx";
import "./SchoolProfile.css";

const MOCK_PROFILE = {
  name: "Nairobi Academy", logo: "", location: "Westlands, Nairobi",
  description: "A premier secondary school in Nairobi offering quality education since 1987.",
  email: "info@nairobiacademy.ac.ke", phone: "+254 20 123 4567",
  website: "www.nairobiacademy.ac.ke", county: "Nairobi",
};

export default function SchoolProfile() {
  const { data, loading } = useApi("/school-profile/");
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const profile = form || data || MOCK_PROFILE;
  const f = form || { ...profile };

  function update(key, value) { setForm((prev) => ({ ...(prev || profile), [key]: value })); }

  async function handleSave() {
    setSaving(true);
    try { await apiRequest("PATCH", "/school-profile/", f); setSaved(true); setTimeout(() => setSaved(false), 2500); } catch {}
    setSaving(false);
  }

  if (loading) return <div className="school__loading">Loading profile...</div>;

  return (
    <div className="school">
      <div className="school__card">
        <h2 className="school__section-title">School Information</h2>
        <div className="school__logo-row">
          <CloudinaryUpload label="School Logo" value={f.logo} onChange={(url) => update("logo", url)} />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>School Name</label>
            <input value={f.name || ""} onChange={(e) => update("name", e.target.value)} />
          </div>
          <div className="form-group">
            <label>County / Location</label>
            <input value={f.location || ""} onChange={(e) => update("location", e.target.value)} />
          </div>
        </div>
        <div className="form-group form-group--full">
          <label>Description</label>
          <textarea rows={4} value={f.description || ""} onChange={(e) => update("description", e.target.value)} placeholder="Describe your school..." />
        </div>
      </div>

      <div className="school__card">
        <h2 className="school__section-title">Contact Details</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={f.email || ""} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input value={f.phone || ""} onChange={(e) => update("phone", e.target.value)} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Website</label>
            <input value={f.website || ""} onChange={(e) => update("website", e.target.value)} />
          </div>
          <div className="form-group">
            <label>County</label>
            <input value={f.county || ""} onChange={(e) => update("county", e.target.value)} />
          </div>
        </div>
      </div>

      <div className="school__card">
        <h2 className="school__section-title">Admin Access</h2>
        <p className="school__info-text">Multi-admin accounts can manage this school profile. Contact platform support to add additional admin users.</p>
        <div className="school__admins">
          <div className="school__admin-row">
            <div className="school__admin-avatar">A</div>
            <div>
              <div className="school__admin-name">Admin User</div>
              <div className="school__admin-role">Platform Admin (Primary)</div>
            </div>
            <span className="school__admin-badge">Active</span>
          </div>
        </div>
      </div>

      <div className="school__footer">
        {saved && <span className="school__saved">Profile saved successfully.</span>}
        <button className="btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}

export { SchoolProfile };
