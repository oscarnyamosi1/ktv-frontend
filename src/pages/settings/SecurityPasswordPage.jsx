import "../styles/securitypasswordpage.css"
import { useState } from 'react'
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { teacherApi } from '../../api/client'
import { useNavigate } from 'react-router-dom'

/* ---------- Password Strength ---------- */
const getStrength = (password) => {
  let score = 0
  if (password.length > 6) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

export default function SecurityPasswordPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const strength = getStrength(form.new_password)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (form.new_password !== form.confirm_password) {
      setError('Passwords do not match')
      return
    }

    if (strength < 2) {
      setError('Password is too weak')
      return
    }

    setLoading(true)

    try {
      await teacherApi.changePassword({
        current_password: form.current_password,
        new_password: form.new_password
      })

      setSuccess('Password updated successfully. Please login again.')

      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (err) {
      setError('Failed to update password. Check current password.')
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

        <main className="content-container">

          <h2 className="page-title">Change Password</h2>

          <div className="glass-card" style={{ padding: 20, maxWidth: 520 }}>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <form onSubmit={handleSubmit}>

              {/* Current Password */}
              <div className="input-group">
                <label>Current Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="current_password"
                  value={form.current_password}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              {/* New Password */}
              <div className="input-group">
                <label>New Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="new_password"
                  value={form.new_password}
                  onChange={handleChange}
                  className="input-field"
                  required
                />

                {/* Strength Bar */}
                <div className="strength-bar">
                  <div
                    className={`strength ${strength}`}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="confirm_password"
                  value={form.confirm_password}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              {/* Controls */}
              <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>

                <label style={{ fontSize: 13 }}>
                  <input
                    type="checkbox"
                    checked={show}
                    onChange={() => setShow(!show)}
                  /> Show Passwords
                </label>

              </div>

              {/* Submit */}
              <button
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', marginTop: 16 }}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>

            </form>

          </div>
        </main>
      </div>
    </>
  )
}