import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { teacherApi } from '../../api/client'

export default function SecuritySessionsPage() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    teacherApi.getSessions().then(res => setSessions(res.data))
  }, [])

  const revoke = async (id) => {
    await teacherApi.revokeSession(id)
    setSessions(sessions.filter(s => s.id !== id))
  }

  const revokeAll = async () => {
    await teacherApi.revokeAllSessions()
    setSessions([])
  }

  return (
    <>
      <NavBar />
      <div className="app-layout">
        <aside className="sidebar-left"><SideNav /></aside>

        <main className="content-container">

          <h2 className="page-title">Active Sessions</h2>

          <button className="btn btn-outline" onClick={revokeAll}>
            Log out all devices
          </button>

          <div className="glass-card" style={{ marginTop: 16, padding: 16 }}>

            {sessions.map(s => (
              <div key={s.id} className="settings-item">

                <div className="item-content">
                  <div className="item-title">
                    {s.device} {s.current && '(Current)'}
                  </div>
                  <div className="item-subtitle">
                    {s.location} • {s.last_active}
                  </div>
                </div>

                {!s.current && (
                  <button className="btn btn-outline" onClick={() => revoke(s.id)}>
                    Revoke
                  </button>
                )}

              </div>
            ))}

          </div>

        </main>
      </div>
    </>
  )
}