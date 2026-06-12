import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { useSubscription } from '../contexts/SubscriptionContext'
import { useAuth } from '../contexts/AuthContext'
import '../pages/styles/subscription.css'

const MPESA_PLACEHOLDER = '0712 345 678'

export default function Subscription() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const {
    isSubscribed,
    subscriptionExpiry,
    activateSubscription,
    monthlyCount,
    freeLimit,
    appsRemaining,
  } = useSubscription()

  const [step, setStep] = useState('plan') // plan | payment | success
  const [phone, setPhone] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [processing, setProcessing] = useState(false)

  const validatePhone = (val) => /^(07|01)\d{8}$/.test(val.replace(/\s/g, ''))

  const handlePay = async () => {
    const clean = phone.replace(/\s/g, '')
    if (!validatePhone(clean)) {
      setPhoneError('Enter a valid Safaricom number (e.g. 0712345678)')
      return
    }
    setPhoneError('')
    setProcessing(true)
    // Simulate M-Pesa STK push delay
    await new Promise(r => setTimeout(r, 2200))
    activateSubscription(1)
    setProcessing(false)
    setStep('success')
  }

  const expiryDisplay = subscriptionExpiry
    ? new Date(subscriptionExpiry).toLocaleDateString('en-KE', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <Layout>
      <button onClick={() => navigate(-1)} className="btn btn-ghost" style={{ marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
        </svg>
        Back
      </button>

      {isSubscribed && step !== 'success' ? (
        <ActiveSubscriptionCard expiry={expiryDisplay} monthlyCount={monthlyCount} navigate={navigate} />
      ) : step === 'plan' ? (
        <PlanStep
          monthlyCount={monthlyCount}
          freeLimit={freeLimit}
          appsRemaining={appsRemaining}
          onContinue={() => setStep('payment')}
        />
      ) : step === 'payment' ? (
        <PaymentStep
          phone={phone}
          setPhone={setPhone}
          phoneError={phoneError}
          processing={processing}
          onPay={handlePay}
          onBack={() => setStep('plan')}
        />
      ) : (
        <SuccessStep expiry={expiryDisplay} navigate={navigate} />
      )}
    </Layout>
  )
}

function ActiveSubscriptionCard({ expiry, monthlyCount, navigate }) {
  return (
    <div className="sub-page-card sub-active-card">
      <div className="sub-active-icon">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <polyline points="9 12 11 14 15 10" />
        </svg>
      </div>
      <h2 className="sub-active-title">You're subscribed!</h2>
      <p className="sub-active-desc">Your Premium plan is active. Apply to unlimited teaching jobs this month.</p>
      <div className="sub-active-meta">
        <div className="sub-meta-item">
          <span className="sub-meta-label">Renews on</span>
          <span className="sub-meta-value">{expiry ?? '—'}</span>
        </div>
        <div className="sub-meta-item">
          <span className="sub-meta-label">Applications this month</span>
          <span className="sub-meta-value">{monthlyCount}</span>
        </div>
        <div className="sub-meta-item">
          <span className="sub-meta-label">Plan</span>
          <span className="sub-meta-value tag tag-success">Premium · KSh 200/mo</span>
        </div>
      </div>
      <button className="btn btn-primary" style={{ marginTop: 24, width: '100%' }} onClick={() => navigate('/')}>
        Browse Jobs
      </button>
    </div>
  )
}

function PlanStep({ monthlyCount, freeLimit, appsRemaining, onContinue }) {
  return (
    <div className="sub-page-wrapper">
      <div className="sub-page-header">
        <h1 className="sub-page-title">Kenya Teaching Vacancies</h1>
        <p className="sub-page-subtitle">Unlock unlimited applications for just KSh 200 a month</p>
      </div>

      {monthlyCount >= freeLimit && (
        <div className="sub-limit-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          You've used all {freeLimit} free applications this month. Subscribe to continue applying.
        </div>
      )}

      <div className="sub-plans-row">
        <div className="sub-plan-card sub-plan-free">
          <div className="sub-plan-label">Free</div>
          <div className="sub-plan-price"><span className="sub-price-num">0</span><span className="sub-price-cur"> KSh</span></div>
          <div className="sub-plan-period">forever</div>
          <ul className="sub-plan-features">
            <li className="feature-ok">Browse all vacancies</li>
            <li className="feature-ok">Save jobs</li>
            <li className="feature-ok">{freeLimit} applications per month</li>
            <li className="feature-no">Unlimited applications</li>
            <li className="feature-no">Priority visibility</li>
            <li className="feature-no">Early access to listings</li>
          </ul>
          <div className="sub-plan-current-tag">Current Plan</div>
        </div>

        <div className="sub-plan-card sub-plan-premium">
          <div className="sub-plan-badge">Most Popular</div>
          <div className="sub-plan-label">Premium</div>
          <div className="sub-plan-price"><span className="sub-price-num">200</span><span className="sub-price-cur"> KSh</span></div>
          <div className="sub-plan-period">per month</div>
          <ul className="sub-plan-features">
            <li className="feature-ok">Browse all vacancies</li>
            <li className="feature-ok">Save jobs</li>
            <li className="feature-ok">{freeLimit} applications (free tier)</li>
            <li className="feature-ok">Unlimited applications</li>
            <li className="feature-ok">Priority visibility</li>
            <li className="feature-ok">Early access to listings</li>
          </ul>
          <button className="btn btn-primary sub-plan-cta" onClick={onContinue}>
            Subscribe — KSh 200
          </button>
        </div>
      </div>

      <div className="sub-faq">
        <h3 className="sub-faq-title">Frequently Asked Questions</h3>
        <div className="sub-faq-list">
          {[
            { q: 'How does billing work?', a: 'You pay KSh 200 via M-Pesa each month. Your subscription is active for 30 days from the payment date.' },
            { q: 'Can I cancel anytime?', a: 'Yes. Your subscription will remain active until the end of the current billing month.' },
            { q: 'What counts as an application?', a: 'Each time you tap "Apply Now" on a job listing, it counts as one application. Withdrawing does not restore your count.' },
            { q: 'Is my payment secure?', a: 'Payments are processed via M-Pesa STK Push — the same trusted system used across Kenya.' },
          ].map(({ q, a }) => (
            <div key={q} className="sub-faq-item">
              <div className="sub-faq-q">{q}</div>
              <div className="sub-faq-a">{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PaymentStep({ phone, setPhone, phoneError, processing, onPay, onBack }) {
  return (
    <div className="sub-page-card">
      <button className="btn btn-ghost" style={{ marginBottom: 16, padding: '6px 0' }} onClick={onBack}>
        ← Back to plans
      </button>

      <div className="sub-payment-header">
        <div className="sub-mpesa-logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>
        <div>
          <h2 className="sub-payment-title">M-Pesa Payment</h2>
          <p className="sub-payment-subtitle">Enter your Safaricom number to receive an STK push</p>
        </div>
      </div>

      <div className="sub-payment-summary">
        <div className="sub-summary-row">
          <span>Kenya Teaching Vacancies Premium</span>
          <span>KSh 200</span>
        </div>
        <div className="sub-summary-row sub-summary-row-total">
          <span>Total</span>
          <strong>KSh 200</strong>
        </div>
      </div>

      <div className="sub-field">
        <label className="sub-label">Safaricom Phone Number</label>
        <div className="sub-phone-input-wrap">
          <span className="sub-phone-prefix">🇰🇪 +254</span>
          <input
            className={`sub-input${phoneError ? ' sub-input-error' : ''}`}
            type="tel"
            placeholder="0712 345 678"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            maxLength={12}
            disabled={processing}
          />
        </div>
        {phoneError && <p className="sub-input-error-msg">{phoneError}</p>}
      </div>

      <p className="sub-mpesa-hint">
        You will receive an M-Pesa prompt on your phone. Enter your PIN to complete payment.
      </p>

      <button
        className="btn btn-primary sub-pay-btn"
        onClick={onPay}
        disabled={processing}
      >
        {processing ? (
          <>
            <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
            Waiting for M-Pesa…
          </>
        ) : 'Pay KSh 200 via M-Pesa'}
      </button>
    </div>
  )
}

function SuccessStep({ expiry, navigate }) {
  return (
    <div className="sub-page-card sub-success-card">
      <div className="sub-success-icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>
      <h2 className="sub-success-title">Payment Successful!</h2>
      <p className="sub-success-desc">
        Your Premium subscription is now active. You can apply to unlimited teaching jobs.
      </p>
      {expiry && (
        <div className="sub-success-expiry">
          Subscription valid until <strong>{expiry}</strong>
        </div>
      )}
      <button className="btn btn-primary sub-success-btn" onClick={() => navigate('/')}>
        Start Applying
      </button>
    </div>
  )
}
