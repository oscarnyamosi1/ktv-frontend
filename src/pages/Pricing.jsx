import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import '../pages/styles/legal.css'

const plans = [
  {
    id: 'free',
    name: 'Free',
    monthlyKsh: 0,
    annualKsh: 0,
    color: 'var(--muted-foreground)',
    badge: null,
    description: 'Get started browsing and applying to teaching jobs.',
    features: [
      { text: 'Browse all vacancies', ok: true },
      { text: 'Search & filter jobs', ok: true },
      { text: 'Save up to 10 jobs', ok: true },
      { text: '2 applications per month', ok: true },
      { text: 'Basic profile', ok: true },
      { text: 'Unlimited applications', ok: false },
      { text: 'Priority visibility', ok: false },
      { text: 'CV upload & management', ok: false },
      { text: 'Application tracking', ok: false },
      { text: 'Email notifications', ok: false },
    ],
    cta: 'Get Started Free',
    ctaVariant: 'outline',
  },
  {
    id: 'basic',
    name: 'Basic',
    monthlyKsh: 100,
    annualKsh: 1000,
    color: 'var(--success)',
    badge: null,
    description: 'Apply to more jobs and track your progress.',
    features: [
      { text: 'Browse all vacancies', ok: true },
      { text: 'Search & filter jobs', ok: true },
      { text: 'Save unlimited jobs', ok: true },
      { text: '10 applications per month', ok: true },
      { text: 'Basic profile', ok: true },
      { text: 'Unlimited applications', ok: false },
      { text: 'Priority visibility', ok: false },
      { text: 'CV upload & management', ok: true },
      { text: 'Application tracking', ok: true },
      { text: 'Email notifications', ok: true },
    ],
    cta: 'Subscribe — KSh 100',
    ctaVariant: 'primary',
  },
  {
    id: 'premium',
    name: 'Premium',
    monthlyKsh: 200,
    annualKsh: 2000,
    color: 'var(--primary)',
    badge: 'Most Popular',
    description: 'Unlimited applications and maximum exposure to schools.',
    features: [
      { text: 'Browse all vacancies', ok: true },
      { text: 'Search & filter jobs', ok: true },
      { text: 'Save unlimited jobs', ok: true },
      { text: 'Unlimited applications', ok: true },
      { text: 'Enhanced profile', ok: true },
      { text: 'Priority application visibility', ok: true },
      { text: 'Early access to new listings', ok: true },
      { text: 'CV upload & management', ok: true },
      { text: 'Full application tracking', ok: true },
      { text: 'Email & SMS notifications', ok: true },
    ],
    cta: 'Subscribe — KSh 200',
    ctaVariant: 'primary',
  },
  {
    id: 'school',
    name: 'School',
    monthlyKsh: 1500,
    annualKsh: 15000,
    color: '#8b5cf6',
    badge: 'For Schools',
    description: 'Post vacancies, manage applicants, and find the right teachers.',
    features: [
      { text: 'Post unlimited vacancies', ok: true },
      { text: 'Manage school profile', ok: true },
      { text: 'View all applicants', ok: true },
      { text: 'Download CVs', ok: true },
      { text: 'Shortlist & invite candidates', ok: true },
      { text: 'Featured vacancy listings', ok: true },
      { text: 'Analytics dashboard', ok: true },
      { text: 'Verified school badge', ok: true },
      { text: 'Priority support', ok: true },
      { text: 'Up to 5 admin accounts', ok: true },
    ],
    cta: 'Register School',
    ctaVariant: 'school',
  },
]

export default function Pricing() {
  const [billing, setBilling] = useState('monthly')
  const navigate = useNavigate()

  const price = (plan) => billing === 'monthly' ? plan.monthlyKsh : plan.annualKsh
  const savings = (plan) => plan.monthlyKsh > 0 ? Math.round((1 - plan.annualKsh / (plan.monthlyKsh * 12)) * 100) : 0

  return (
    <Layout>
      <div className="legal-page pricing-page">
        <div className="legal-header">
          <h1 className="legal-title">Simple, Transparent Pricing</h1>
          <p className="legal-subtitle">
            Choose the plan that works for you. Cancel anytime. Payments via M-Pesa.
          </p>

          <div className="billing-toggle">
            <button
              className={`billing-btn ${billing === 'monthly' ? 'billing-active' : ''}`}
              onClick={() => setBilling('monthly')}
            >Monthly</button>
            <button
              className={`billing-btn ${billing === 'annual' ? 'billing-active' : ''}`}
              onClick={() => setBilling('annual')}
            >
              Annual
              <span className="billing-save-badge">Save up to 17%</span>
            </button>
          </div>
        </div>

        <div className="pricing-grid">
          {plans.map(plan => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.id === 'premium' ? 'pricing-card-featured' : ''}`}
              style={{ '--plan-color': plan.color }}
            >
              {plan.badge && (
                <div className="pricing-badge" style={{ background: plan.color === 'var(--primary)' ? 'var(--primary)' : plan.color }}>
                  {plan.badge}
                </div>
              )}
              <div className="pricing-plan-name" style={{ color: plan.color }}>{plan.name}</div>
              <div className="pricing-price">
                {plan.monthlyKsh === 0 ? (
                  <span className="pricing-amount">Free</span>
                ) : (
                  <>
                    <span className="pricing-currency">KSh</span>
                    <span className="pricing-amount">{price(plan).toLocaleString()}</span>
                    <span className="pricing-period">/ {billing === 'monthly' ? 'mo' : 'yr'}</span>
                  </>
                )}
              </div>
              {billing === 'annual' && savings(plan) > 0 && (
                <div className="pricing-savings">Save {savings(plan)}% vs monthly</div>
              )}
              <p className="pricing-desc">{plan.description}</p>

              <ul className="pricing-features">
                {plan.features.map(f => (
                  <li key={f.text} className={f.ok ? 'feature-ok' : 'feature-no'}>
                    {f.ok ? (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--muted-foreground)" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    )}
                    <span>{f.text}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`btn pricing-cta ${plan.id === 'free' ? 'btn-outline' : plan.id === 'school' ? 'btn-school' : 'btn-primary'}`}
                onClick={() => {
                  if (plan.id === 'free') navigate('/register')
                  else navigate('/subscription')
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <div className="pricing-mpesa-note glass card" style={{ padding: '20px 24px', marginTop: 8, display: 'flex', alignItems: 'center', gap: 14 }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
            <line x1="1" y1="10" x2="23" y2="10"/>
          </svg>
          <div>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 3 }}>All payments via M-Pesa</div>
            <div style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
              Secure Lipa Na M-Pesa STK Push. No credit card needed. Cancel anytime from your account settings.
            </div>
          </div>
        </div>

        <div className="pricing-faq">
          <h2 className="pricing-faq-title">Frequently Asked Questions</h2>
          <div className="pricing-faq-grid">
            {[
              { q: 'Can I upgrade or downgrade anytime?', a: 'Yes. Changes take effect on your next billing cycle. Downgrading will not refund the current month.' },
              { q: 'What counts as one application?', a: 'Clicking "Apply Now" on a job listing counts as one application. Withdrawing an application does not restore your count.' },
              { q: 'How does M-Pesa payment work?', a: 'After selecting a plan, you enter your Safaricom number and receive an STK push. Enter your PIN and your subscription activates instantly.' },
              { q: 'Is my data secure?', a: 'Yes. We comply with the Kenya Data Protection Act 2019. Your data is encrypted and never sold to third parties.' },
              { q: 'Can schools post jobs for free?', a: 'Schools can post limited listings on the free tier. The School Plan unlocks unlimited postings and full applicant management.' },
              { q: 'Do you offer refunds?', a: 'Refunds are available within 48 hours of payment if no applications were made under the new plan. See our Refund Policy for full details.' },
            ].map(({ q, a }) => (
              <div key={q} className="pricing-faq-item glass card">
                <div className="sub-faq-q">{q}</div>
                <div className="sub-faq-a">{a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
