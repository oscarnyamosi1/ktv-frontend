import "./styles/postteachingjob.css";
import Layout from "../components/Layout";
import { jobsApi } from "../api/client";
import { useState } from "react";

const PostJob = () => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    school: "",
    location: "",
    description: "",
    subjects: [],
    grades: [],
    contract_type: "Full-time",
    salary_type: "Annual",
    salary_min: "",
    salary_max: "",
    featured: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleArrayValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        title: formData.title,
        school: formData.school,
        location: formData.location,
        description: formData.description,
        subjects: formData.subjects,
        grades: formData.grades,
        contract_type: formData.contract_type,
        salary_type: formData.salary_type,
        salary_min: formData.salary_min,
        salary_max: formData.salary_max,
        featured: formData.featured,
      };

      await jobsApi.postJob(payload);

      alert("Job posted successfully!");

      setFormData({
        title: "",
        school: "",
        location: "",
        description: "",
        subjects: [],
        grades: [],
        contract_type: "Full-time",
        salary_type: "Annual",
        salary_min: "",
        salary_max: "",
        featured: false,
      });
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.detail || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div style={{ width: "100%", maxWidth: 960 }}>
        <h2>Post a teaching job</h2>

        {/* TITLE */}
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job title"
          className="text-input-large"
        />

        {/* SCHOOL */}
        <input
          name="school"
          value={formData.school}
          onChange={handleChange}
          placeholder="School / Organisation"
          className="text-input-large"
        />

        {/* LOCATION */}
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="text-input-large"
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the role..."
          rows={6}
          className="text-input-large"
        />

        {/* SUBJECTS */}
        <h4>Subjects</h4>
        <div className="chips-row">
          {["Mathematics", "STEM", "English", "Science"].map((subj) => (
            <div
              key={subj}
              className={`chip-select ${
                formData.subjects.includes(subj) ? "active" : ""
              }`}
              onClick={() => toggleArrayValue("subjects", subj)}
            >
              {subj}
            </div>
          ))}
        </div>

        {/* GRADES */}
        <h4>Grade Level</h4>
        <div className="chips-row">
          {["Elementary", "Middle School", "High School", "IB / AP"].map(
            (grade) => (
              <div
                key={grade}
                className={`chip-select ${
                  formData.grades.includes(grade) ? "active" : ""
                }`}
                onClick={() => toggleArrayValue("grades", grade)}
              >
                {grade}
              </div>
            )
          )}
        </div>

        {/* CONTRACT */}
        <h4>Contract</h4>
        <div className="chips-row">
          {["Full-time", "Part-time", "Permanent", "1-year contract"].map(
            (c) => (
              <div
                key={c}
                className={`chip-select ${
                  formData.contract_type === c ? "active" : ""
                }`}
                onClick={() =>
                  setFormData({ ...formData, contract_type: c })
                }
              >
                {c}
              </div>
            )
          )}
        </div>

        {/* SALARY */}
        <h4>Salary</h4>
        <div style={{ display: "flex", gap: 10 }}>
          <input
            type="number"
            name="salary_min"
            value={formData.salary_min}
            onChange={handleChange}
            placeholder="Min"
            className="text-input-large"
          />
          <input
            type="number"
            name="salary_max"
            value={formData.salary_max}
            onChange={handleChange}
            placeholder="Max"
            className="text-input-large"
          />
        </div>

        {/* FEATURED TOGGLE */}
        <div style={{ marginTop: 20 }}>
          <label>
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
            />
            Featured job
          </label>
        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="boost-cta"
          style={{ marginTop: 20 }}
        >
          {loading ? "Posting..." : "Post Job"}
        </button>
      </div>
    </Layout>
  );
};

export default PostJob;

