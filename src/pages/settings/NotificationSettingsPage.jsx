import { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { teacherApi } from '../../api/client'

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState({
    email_notifications: true,
    sms_notifications: false,
    in_app_notifications: true,
    job_alerts: true,
    application_updates: true,
    message_notifications: true,
    marketing_emails: false,
    quiet_mode: false,
    alert_frequency: 'instant' // instant | daily | weekly
  })


    function Toggle({ label, desc, value, onChange }) {
    return (
        <div className="settings-item">
        <div className="item-content">
            <div className="item-title">{label}</div>
            <div className="item-subtitle">{desc}</div>
        </div>

        <label className="switch">
            <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            />
            <span className="slider"></span>
        </label>
        </div>
    )
    }

  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const res = await teacherApi.getNotificationSettings()
      setSettings(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updateField = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const saveSettings = async () => {
    setSaving(true)
    setError('')
    setSuccess('')

    try {
      await teacherApi.updateNotificationSettings(settings)
      setSuccess('Notification settings updated successfully')
    } catch (err) {
      setError('Failed to update settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <NavBar />
      <div className="app-layout">
        <aside className="sidebar-left">
          <SideNav />
        </aside>

        <main className="content-container">

          <h2 className="page-title">Notification Settings</h2>

          {/* messages */}
          {success && <div className="success-msg">{success}</div>}
          {error && <div className="error-msg">{error}</div>}

          <div className="glass-card" style={{ padding: 20 }}>

            {/* CORE NOTIFICATIONS */}
            <h4 className="section-title">Core Notifications</h4>

            <Toggle
              label="Email Notifications"
              desc="Receive updates via email"
              value={settings.email_notifications}
              onChange={(v) => updateField('email_notifications', v)}
            />

            <Toggle
              label="SMS Notifications"
              desc="Receive alerts via SMS"
              value={settings.sms_notifications}
              onChange={(v) => updateField('sms_notifications', v)}
            />

            <Toggle
              label="In-App Notifications"
              desc="Show notifications inside platform"
              value={settings.in_app_notifications}
              onChange={(v) => updateField('in_app_notifications', v)}
            />

            {/* JOB SETTINGS */}
            <h4 className="section-title" style={{ marginTop: 20 }}>Job Alerts</h4>

            <Toggle
              label="Job Matches"
              desc="New teaching opportunities"
              value={settings.job_alerts}
              onChange={(v) => updateField('job_alerts', v)}
            />

            <Toggle
              label="Application Updates"
              desc="Status changes on applications"
              value={settings.application_updates}
              onChange={(v) => updateField('application_updates', v)}
            />

            {/* MESSAGES */}
            <h4 className="section-title" style={{ marginTop: 20 }}>Communication</h4>

            <Toggle
              label="Messages"
              desc="Direct messages from employers"
              value={settings.message_notifications}
              onChange={(v) => updateField('message_notifications', v)}
            />

            {/* FREQUENCY */}
            <div style={{ marginTop: 20 }}>
              <label className="input-label">Alert Frequency</label>

              <select
                className="input-field"
                value={settings.alert_frequency}
                onChange={(e) => updateField('alert_frequency', e.target.value)}
              >
                <option value="instant">Instant</option>
                <option value="daily">Daily digest</option>
                <option value="weekly">Weekly digest</option>
              </select>
            </div>

            {/* PRIVACY */}
            <h4 className="section-title" style={{ marginTop: 20 }}>Privacy</h4>

            <Toggle
              label="Marketing Emails"
              desc="Promotions and tips"
              value={settings.marketing_emails}
              onChange={(v) => updateField('marketing_emails', v)}
            />

            <Toggle
              label="Quiet Mode"
              desc="Pause all non-critical notifications"
              value={settings.quiet_mode}
              onChange={(v) => updateField('quiet_mode', v)}
            />

            {/* SAVE */}
            <div style={{ marginTop: 24 }}>
              <button
                className="btn btn-primary"
                onClick={saveSettings}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>

          </div>

        </main>
      </div>
    </>
  )
}