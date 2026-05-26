import "../styles/security2fapage.css"
import { useState, useEffect } from 'react'
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { teacherApi } from '../../api/client'

export default function Security2FAPage() {
  const [status, setStatus] = useState(false)
  const [otp, setOtp] = useState('')
  const [qr, setQr] = useState(null)
  const [backupCodes, setBackupCodes] = useState([])
  const [step, setStep] = useState('idle') // idle | setup | verify
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    teacherApi.get2FAStatus().then(res => {
      setStatus(res.data.enabled)
    })
  }, [])

  const enable2FA = async () => {
    setLoading(true)
    const res = await teacherApi.enable2FA()
    setQr(res.data.qr_code)
    setStep('setup')
    setLoading(false)
  }

  const verify2FA = async () => {
    setLoading(true)
    const res = await teacherApi.verify2FA({ otp })
    setBackupCodes(res.data.backup_codes)
    setStatus(true)
    setStep('verify')
    setLoading(false)
  }

  const disable2FA = async () => {
    setLoading(true)
    await teacherApi.disable2FA()
    setStatus(false)
    setStep('idle')
    setLoading(false)
  }

  return (
    <>
      <NavBar />
      <div className="app-layout">
        <aside className="sidebar-left"><SideNav /></aside>

        <main className="content-container">

          <h2 className="page-title">Two-Factor Authentication</h2>

          <div className="glass-card" style={{ padding: 20 }}>

            {/* STATUS */}
            <div style={{ marginBottom: 16 }}>
              <strong>Status:</strong>{' '}
              <span style={{ color: status ? '#22c55e' : '#ef4444' }}>
                {status ? 'Enabled' : 'Disabled'}
              </span>
            </div>

            {/* ENABLE */}
            {!status && step === 'idle' && (
              <button className="btn btn-primary" onClick={enable2FA}>
                Enable 2FA
              </button>
            )}

            {/* QR SETUP
            {step === 'setup' && qr && (
              <div>
                <p>Scan this QR with Google Authenticator:</p>
                <img src={qr} alt="QR Code" style={{ width: 180 }} />

                <div className="input-group" style={{ marginTop: 16 }}>
                  <label>Enter OTP</label>
                  <input
                    className="input-field"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" onClick={verify2FA}>
                  Verify
                </button>
              </div>
            )} */}

            {step === 'setup' && (
              <div>
                <p>Scan QR with Google Authenticator:</p>

                {qr ? (
                  <img src={qr} alt="QR Code" style={{ width: 180 }} />
                ) : (
                  <p>Loading QR...</p>
                )}

                <div className="input-group" style={{ marginTop: 16 }}>
                  <label>Enter OTP</label>
                  <input
                    className="input-field"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button className="btn btn-primary" onClick={verify2FA}>
                  Verify
                </button>
              </div>
            )}

            {/* BACKUP CODES */}
            {step === 'verify' && backupCodes.length > 0 && (
              <div>
                <h4>Backup Codes</h4>
                <p>Save these somewhere safe:</p>

                <div className="code-box">
                  {backupCodes.map((c, i) => (
                    <div key={i}>{c}</div>
                  ))}
                </div>
              </div>
            )}

            {/* DISABLE */}
            {status && (
              <button
                className="btn btn-outline"
                onClick={disable2FA}
                style={{ marginTop: 16 }}
              >
                Disable 2FA
              </button>
            )}

          </div>

        </main>
      </div>
    </>
  )
}