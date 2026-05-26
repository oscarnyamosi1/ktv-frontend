// import "../styles/profilesettings.css"
import NavBar from '../../components/NavBar.jsx'
import SideNav from '../../components/SideNav.jsx'
import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'

export default function AccountPage() {
  const { user } = useAuth()

  const [email] = useState(user?.email || '')
  const [phone] = useState(null) // replace with teacherApi if needed

  return (
    <>
      <NavBar />

      <div className="app-layout">
        <aside className="sidebar-left">
          <SideNav />
        </aside>

        <main className="content-container">
          <h2 className="page-title">Account</h2>

          <div className="settings-group glass-card">

            {/* EMAIL */}
            <div className="settings-item">
              <div className="item-content">
                <div className="item-title">Email</div>
                <div className="item-subtitle">{email || 'Not set'}</div>
              </div>

              <button className="btn btn-outline">
                Change
              </button>
            </div>

            {/* PHONE */}
            <div className="settings-item">
              <div className="item-content">
                <div className="item-title">Phone Number</div>
                <div className="item-subtitle">
                  {phone ? phone : 'Not set'}
                </div>
              </div>

              <button className="btn btn-outline">
                Change
              </button>
            </div>

            {/* PASSWORD */}
            <div className="settings-item">
              <div className="item-content">
                <div className="item-title">
                  Change Password
                </div>
              </div>

              <button className="btn btn-outline">
                Change
              </button>
            </div>

          </div>
        </main>
      </div>
    </>
  )
}