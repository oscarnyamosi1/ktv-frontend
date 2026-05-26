import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { teacherApi } from '../../api/client'

export default function CvDocumentsPage() {
  const [resume, setResume] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadDocuments()
  }, [])

  const loadDocuments = async () => {
    try {
      const res = await teacherApi.getDocuments()
      setResume(res.data.resume)
      setCertificates(res.data.certificates || [])
    } catch (err) {
      console.log(err)
    }
  }

  /* ---------- Upload Resume ---------- */
  const uploadResume = async (file) => {
    if (!file) return

    if (!['application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        .includes(file.type)) {
      setError('Only PDF or DOC/DOCX allowed')
      return
    }

    setUploading(true)
    setError('')
    setSuccess('')

    try {
      const formData = new FormData()
      formData.append('resume', file)

      await teacherApi.uploadResume(formData)
      setSuccess('Resume uploaded successfully')
      loadDocuments()
    } catch (err) {
      setError('Failed to upload resume')
    } finally {
      setUploading(false)
    }
  }

  /* ---------- Upload Certificate ---------- */
  const uploadCertificate = async (file) => {
    if (!file) return

    setUploading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      await teacherApi.uploadCertificate(formData)
      setSuccess('Certificate uploaded')
      loadDocuments()
    } catch (err) {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  /* ---------- Delete ---------- */
  const deleteFile = async (id, type) => {
    await teacherApi.deleteDocument(id, type)
    loadDocuments()
  }

  return (
    <>
      <NavBar />
      <div className="app-layout">
        <aside className="sidebar-left">
          <SideNav />
        </aside>

        <main className="content-container">

          <h2 className="page-title">CV & Documents</h2>

          {/* messages */}
          {error && <div className="error-msg">{error}</div>}
          {success && <div className="success-msg">{success}</div>}

          {/* RESUME */}
          <div className="glass-card" style={{ padding: 20, marginBottom: 20 }}>

            <h3>Resume / CV</h3>

            {resume ? (
              <div className="settings-item">
                <div className="item-content">
                  <div className="item-title">Current Resume</div>
                  <a href={resume.file} target="_blank">View File</a>
                </div>

                <button
                  className="btn btn-outline"
                  onClick={() => deleteFile(resume.id, 'resume')}
                >
                  Delete
                </button>
              </div>
            ) : (
              <p>No resume uploaded</p>
            )}

            <input
              type="file"
              onChange={(e) => uploadResume(e.target.files[0])}
              disabled={uploading}
              className="input-field"
            />

          </div>

          {/* CERTIFICATES */}
          <div className="glass-card" style={{ padding: 20 }}>

            <h3>Certificates</h3>

            {certificates.length === 0 && <p>No certificates uploaded</p>}

            {certificates.map(cert => (
              <div key={cert.id} className="settings-item">

                <div className="item-content">
                  <div className="item-title">{cert.name || 'Certificate'}</div>
                  <a href={cert.file} target="_blank">View</a>
                </div>

                <button
                  className="btn btn-outline"
                  onClick={() => deleteFile(cert.id, 'certificate')}
                >
                  Remove
                </button>

              </div>
            ))}

            <input
              type="file"
              onChange={(e) => uploadCertificate(e.target.files[0])}
              disabled={uploading}
              className="input-field"
            />

          </div>

        </main>
      </div>
    </>
  )
}