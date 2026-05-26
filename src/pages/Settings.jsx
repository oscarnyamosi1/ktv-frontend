import './styles/profilesettings.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { teacherApi } from '../api/client'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'

/* ---------- Settings Item ---------- */
const SettingsItem = ({ to, icon, title, subtitle, danger = false, onClick }) => {
  const content = (
    <div className={`settings-item ${danger ? 'danger-item' : ''}`}>
      <div className={`item-icon-wrapper ${danger ? 'destructive' : ''}`}>
        {icon}
      </div>

      <div className="item-content">
        <div className={`item-title ${danger ? 'destructive' : ''}`}>
          {title}
        </div>
        {subtitle && (
          <div className="item-subtitle">{subtitle}</div>
        )}
      </div>

      {!danger && (
        <div className="chevron-icon">
          <ChevronRightIcon />
        </div>
      )}
    </div>
  )

  if (onClick) {
    return (
      <button className="settings-link-button" onClick={onClick}>
        {content}
      </button>
    )
  }

  return <Link to={to}>{content}</Link>
}

/* ---------- Icons ---------- */
const ChevronRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0113 0" />
  </svg>
)

const KeyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="7.5" cy="15.5" r="3.5" />
    <path d="M21 2l-9.6 9.6" />
  </svg>
)

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 018 0v4" />
  </svg>
)

const FileIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
  </svg>
)

const BellIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
  </svg>
)

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
  </svg>
)

const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
  </svg>
)

const HelpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M9 9a3 3 0 116 1c0 2-3 2-3 4" />
  </svg>
)

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <path d="M16 17l5-5-5-5" />
  </svg>
)

/* ---------- Page ---------- */
export default function SettingsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    if (!user) return

    teacherApi.profile()
      .then(res => setProfile(res.data))
      .catch(() => {})
  }, [user])

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const username = profile?.user?.username || user?.username || 'Teacher'

  return (
    <>
      <NavBar />
      <div className="app-layout">
        <aside className="sidebar-left">
          <SideNav />
        </aside>
        <div className="main-area">

          <div className="content-container">

            {/* Header */}
            <div className="page-header">
              <h1 className="page-title">Settings</h1>
            </div>

            {/* Profile Summary (NOW DYNAMIC like TeacherProfile) */}
            <Link to="/teachers/teacherprofile" className="profile-summary glass-card">
              <div className="profile-avatar">
                {username.charAt(0).toUpperCase()}
              </div>

              <div className="profile-info">
                <div className="profile-name">{username}</div>
                <div className="profile-status">
                  {profile?.classification || 'Teacher'} •
                  {profile?.profile_visibility ? ' Visible' : ' Hidden'}
                </div>
              </div>

              <div className="chevron-icon">
                <UserIcon />
              </div>
            </Link>

            {/* ACCOUNT */}
            <div className="settings-group glass-card">
              <SettingsItem to="/settings/account" icon={<KeyIcon />} title="Account" subtitle="Security, email, phone number" />
              <SettingsItem to="/settings/privacy" icon={<LockIcon />} title="Privacy" subtitle="Profile visibility, blocked users" />
              <SettingsItem to="/settings/view-documents" icon={<FileIcon />} title="CV & Documents" subtitle="Manage your resume and certificates" />
            </div>

            {/* SECURITY */}
            <div className="section-header">Security</div>

            <div className="settings-group glass-card">

              {/* Change Password */}
              <SettingsItem
                to="/settings/security/password"
                icon={<LockIcon />}
                title="Change Password"
                subtitle="Update your account password"
              />

              {/* Email Security */}
              <SettingsItem
                to="/settings/security/email"
                icon={<KeyIcon />}
                title="Email Security"
                subtitle="Update or verify your email address"
              />

              {/* Phone Verification */}
              <SettingsItem
                to="/settings/security/phone"
                icon={<UserIcon />}
                title="Phone Verification"
                subtitle="Verify your phone number for account recovery"
              />

              {/* Two Factor Auth (future-ready UI) */}
              <SettingsItem
                to="/settings/security/2fa"
                icon={<LockIcon />}
                title="Two-Factor Authentication"
                subtitle="Add extra security to your account"
              />

              {/* Active Sessions */}
              <SettingsItem
                to="/settings/security/sessions"
                icon={<GlobeIcon />}
                title="Active Sessions"
                subtitle="Manage devices logged into your account"
              />

            </div>

            {/* PREFERENCES */}
            <div className="section-header">Preferences</div>

            <div className="settings-group glass-card">
              <SettingsItem to="/settings/notifications" icon={<BellIcon />} title="Notifications" subtitle="Messages, job alerts, application updates" />
              <SettingsItem to="/settings/appearance" icon={<MoonIcon />} title="Appearance" subtitle="" />
              <SettingsItem to="/settings/language" icon={<GlobeIcon />} title="Language" subtitle="English" />
            </div>

            {/* SUPPORT */}
            <div className="section-header">Support</div>

            <div className="settings-group glass-card">
              <SettingsItem to="/settings/help" icon={<HelpIcon />} title="Help Center" subtitle="Contact support, privacy policy" />

              <SettingsItem
                icon={<LogoutIcon />}
                title="Log out"
                danger={true}
                onClick={handleLogout}
              />
            </div>

          </div>
        </div>
      </div>
    </>
  )
}