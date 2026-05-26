import { useState } from 'react'
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { teacherApi } from '../../api/client'

export default function SecurityEmailPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [step, setStep] = useState('edit')

  const changeEmail = async () => {
    await teacherApi.changeEmail({ email })
    setStep('verify')
  }

  const verifyEmail = async () => {
    await teacherApi.verifyEmail({ code })
    setStep('done')
  }

  return (
    <>
      <NavBar />
      <div className="app-layout">
        <aside className="sidebar-left"><SideNav /></aside>

        <main className="content-container">

          <h2 className="page-title">Email Security</h2>

          <div className="glass-card" style={{ padding: 20 }}>

            {step === 'edit' && (
              <>
                <input
                  className="input-field"
                  placeholder="New email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />

                <button className="btn btn-primary" onClick={changeEmail}>
                  Send Verification
                </button>
              </>
            )}

            {step === 'verify' && (
              <>
                <input
                  className="input-field"
                  placeholder="Verification code"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />

                <button className="btn btn-primary" onClick={verifyEmail}>
                  Verify Email
                </button>
              </>
            )}

            {step === 'done' && (
              <div className="success-msg">
                Email verified successfully
              </div>
            )}

          </div>

        </main>
      </div>
    </>
  )
}