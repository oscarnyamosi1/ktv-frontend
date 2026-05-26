import { useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import SideNav from "../components/SideNav"
import { teacherApi } from "../api/client"
import "./styles/uploaddocuments.css"

const UploadItem = ({
  icon,
  label,
  meta,
  fileKey,
  completed,
  onChange,
  accept,
}) => {
  return (
    <div className={`upload-item ${completed ? "completed" : ""}`}>
      <div className="icon-box">{icon}</div>

      <div className="item-content">
        <div className="item-label">{label}</div>
        {meta && <div className="item-meta">{meta}</div>}

        <div className="file-preview">
          <span>{fileKey || "No file selected"}</span>
        </div>
      </div>

      {!completed && (
        <label className="upload-btn">
          Upload
          <input
            type="file"
            hidden
            accept={accept}
            onChange={onChange}
          />
        </label>
      )}

      {completed && (
        <div className="status">
          ✓
        </div>
      )}
    </div>
  )
}

export default function UploadDocumentsPage() {
  const [files, setFiles] = useState({})
  const [existing, setExisting] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    teacherApi.getDocumentsStatus()
      .then(res => setExisting(res.data))
      .catch(() => {})
  }, [])

  const handleFile = (key, file) => {
    setFiles(prev => ({
      ...prev,
      [key]: file
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()

    Object.entries(files).forEach(([key, file]) => {
      formData.append(key, file)
    })

    try {
      await teacherApi.uploadDocuments(formData)
      alert("Documents uploaded successfully!")
      window.location.reload()
    } catch (err) {
      alert("Upload failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <NavBar />

      <div className="app-layout">
        <aside className="sidebar-left">
          <SideNav />
        </aside>

        <main className="main-area">
          <div className="content-container">

            {/* HEADER */}
            <div className="page-header">
              <h1 className="page-title">Upload Your Teaching Documents</h1>
              <p className="muted">
                Upload clear scans or PDFs (max 5MB)
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="glass-card upload-card">

              <UploadItem
                icon="🪪"
                label="National ID"
                meta="Front & back required"
                fileKey={files["national-id"]?.name}
                completed={existing.national_id}
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFile("national-id", e.target.files[0])}
              />

              <UploadItem
                icon="🎓"
                label="Academic Certificates"
                fileKey={files["academic-certificates"]?.name}
                completed={existing.academic_certificates}
                accept=".jpg,.png,.pdf"
                onChange={(e) =>
                  handleFile("academic-certificates", e.target.files[0])
                }
              />

              <UploadItem
                icon="🏫"
                label="TP / Internship Letter"
                meta="Signed by institution head"
                fileKey={files["tp-letter"]?.name}
                completed={existing.internship_letter}
                accept=".jpg,.png,.pdf"
                onChange={(e) => handleFile("tp-letter", e.target.files[0])}
              />

              <UploadItem
                icon="📄"
                label="Curriculum Vitae"
                meta="PDF only"
                fileKey={files["carriculum-vitae"]?.name}
                completed={existing.cv}
                accept=".pdf"
                onChange={(e) =>
                  handleFile("carriculum-vitae", e.target.files[0])
                }
              />

              <UploadItem
                icon="🏅"
                label="TSC Certificate (Optional)"
                meta="If registered"
                fileKey={files["tsc-certificate"]?.name}
                completed={existing.tsc_certificate}
                accept=".jpg,.png,.pdf"
                onChange={(e) =>
                  handleFile("tsc-certificate", e.target.files[0])
                }
              />

              {/* ACTIONS */}
              <div className="card-actions">
                <button className="btn primary" disabled={loading}>
                  {loading ? "Uploading..." : "Submit Documents"}
                </button>

                <button
                  type="button"
                  className="btn ghost"
                  onClick={() =>
                    localStorage.setItem("draft_docs", JSON.stringify(files))
                  }
                >
                  Save Draft
                </button>
              </div>

            </form>

          </div>
        </main>
      </div>
    </>
  )
}