import { useState, useEffect } from 'react'
import { applicationsApi } from '../api/client'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'

const FALLBACK_IMG = 'https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F35-50%2FAfrican%2F2'

function ApplicationCard({ application, onWithdraw }) {
  const navigate = useNavigate()
  const [withdrawing, setWithdrawing] = useState(false)
  const job = application.job


  const handleWithdraw = async () => {
    if (!confirm('Withdraw this application?')) return
    setWithdrawing(true)
    try {
      await applicationsApi.withdraw(application.id)
      onWithdraw(application.id)
 
    } catch {}
    setWithdrawing(false)
  }

  const schoolName = application?.job?.employer?.school?.name || application?.employer?.username || 'Unknown School'
  const countyName = application?.county?.title || ''
  const schoolLogo = application?.employer?.school?.logo || FALLBACK_IMG

  return (
    <div className="glass card" style={{ padding: 20, marginBottom: 14 }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <img src={schoolLogo} alt={schoolName} className="school-avatar" />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
            <div>
              <h3 
                style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 700, cursor: 'pointer', color: 'var(--foreground)' }}
                onClick={() => navigate(`/jobs/${job.id}`)}
              >
                {job?.job_title}
              </h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--muted-foreground)' }}>
                {schoolName} · {countyName}
              </p>
            </div>
            <span className={`status-badge status-${application.status}`}>
              {application.status}
            </span>
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {job?.employment_type?.title && <span className="tag">{job.employment_type.title}</span>}
            {job?.carriculum_type && <span className="tag">{job.carriculum_type}</span>}
            {/* <span className="tag" style={{ color: 'var(--muted-foreground)' }}>
            
            {application?.applied_at?`Applied at ${new Date(application.applied_at).toLocaleDateString()}`:"No application Date"}
       
            </span> */}
            <span className="tag" style={{ color: 'var(--muted-foreground)' }}>
              Deadline {new Date(application.application_deadline).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 16, justifyContent: 'flex-end' }}>
         
          <button className="btn btn-outline" onClick={()=>{navigate(`/jobs/view/${application.id}`)}}>
            View Job
          </button>
     
        <button
          className="btn"
          style={{ color: 'var(--destructive)', borderColor: 'var(--destructive)' }}
          onClick={handleWithdraw}
          disabled={withdrawing}
        >
          {withdrawing ? 'Withdrawing…' : 'Withdraw'}
        </button>
      </div>
    </div>
  )
}

export default function MyApplications() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  const loadApplications = () => {
    applicationsApi.list()
      .then(res => setApplications(res.data.results || res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useEffect(() => {
    if (!user) { navigate('/login'); return }
    loadApplications()
  }, [user])

  const handleWithdraw = (id) => {
    // setApplications(prev => prev.filter(a => a.id !== id))
    applicationsApi.withdraw(id)
    loadApplications()
  }

  const stats = {
    total: applications.length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    interviews: applications.filter(a => a.status === 'Interview').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
  }

  return (
    <Layout>
      <h2 className="section-title">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{ marginRight: 8, verticalAlign: 'middle' }}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14,2 14,8 20,8" />
        </svg>
        My Applications
      </h2>

      {!loading && applications.length > 0 && (
        <div className="profile-stats" style={{ marginBottom: 24 }}>
          {[
            { label: 'Applied', value: stats.total },
            { label: 'Shortlisted', value: stats.shortlisted },
            { label: 'Interviews', value: stats.interviews },
          ].map(s => (
            <div key={s.label} className="stat-card">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {loading ? (
        <div className="loading-center"><div className="spinner" /></div>
      ) : applications.length === 0 ? (
        <div className="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
            <polyline points="14,2 14,8 20,8" />
          </svg>
          <p style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>No applications yet</p>
          <p style={{ fontSize: 14, marginBottom: 20 }}>Start applying for teaching jobs today.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>Browse Jobs</button>
        </div>
      ) : (
        applications.map(app => (
          <ApplicationCard key={app.id} application={app} onWithdraw={handleWithdraw} />
        ))
      )}
    </Layout>
  )
}
