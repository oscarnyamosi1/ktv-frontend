import { useNavigate } from 'react-router-dom'
import { useSubscription } from '../contexts/SubscriptionContext'

export default function SubscriptionModal({ onClose }) {
  const navigate = useNavigate()
  const { monthlyCount, freeLimit } = useSubscription()

  const handleSubscribe = () => {
    onClose()
    navigate('/subscription')
  }

  return (
    <div className="sub-modal-overlay" onClick={onClose}>
      <div className="sub-modal" onClick={e => e.stopPropagation()}>
        <button className="sub-modal-close" onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="sub-modal-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </div>

        <h2 className="sub-modal-title">Free Limit Reached</h2>
        <p className="sub-modal-desc">
          You've used <strong>{monthlyCount} of {freeLimit}</strong> free applications this month.
          Subscribe for <strong>KSh 200/month</strong> to apply to unlimited jobs.
        </p>

        <ul className="sub-modal-perks">
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Unlimited job applications per month
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Priority application visibility
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Early access to new vacancies
          </li>
          <li>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            Application status notifications
          </li>
        </ul>

        <div className="sub-modal-price">
          <span className="sub-price-amount">KSh 200</span>
          <span className="sub-price-period">/ month</span>
        </div>

        <button className="btn btn-primary sub-modal-cta" onClick={handleSubscribe}>
          Subscribe via M-Pesa
        </button>

        <button className="btn btn-ghost sub-modal-skip" onClick={onClose}>
          Maybe later
        </button>
      </div>
    </div>
  )
}
