import { useState } from 'react'
import Layout from '../components/Layout'
import '../pages/styles/legal.css'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  return (
    <Layout>
      <div className="legal-page contact-page">
        <div className="legal-header">
          <h1 className="legal-title">Contact Us</h1>
          <p className="legal-subtitle">Have a question, report an issue, or need help? We're here to assist.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="contact-info-title">Get in Touch</h2>

            <div className="contact-cards">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: 'General Enquiries',
                  value: 'info@kenyateachingvacancies.co.ke',
                  href: 'mailto:info@kenyateachingvacancies.co.ke',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.5 19.79 19.79 0 01.1 4.09 2 2 0 012.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 9.91a16 16 0 006.18 6.18l1.51-1.51a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                  ),
                  label: 'Phone (Placeholder)',
                  value: '+254 700 000 000',
                  href: 'tel:+254700000000',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Address (Placeholder)',
                  value: 'Nairobi, Kenya',
                  href: null,
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  label: 'Support Hours',
                  value: 'Mon – Fri, 8am – 6pm EAT',
                  href: null,
                },
              ].map(item => (
                <div key={item.label} className="contact-card glass card">
                  <div className="contact-card-icon">{item.icon}</div>
                  <div>
                    <div className="contact-card-label">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="contact-card-value" style={{ color: 'var(--primary)' }}>{item.value}</a>
                    ) : (
                      <div className="contact-card-value">{item.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <div className="contact-social-title">Follow Us</div>
              <div className="contact-social-links">
                {['Twitter/X','Facebook','LinkedIn','Instagram'].map(s => (
                  <a key={s} href="#" className="btn btn-outline" style={{ fontSize: 12 }}>{s}</a>
                ))}
              </div>
            </div>

            <div className="contact-legal-links glass card" style={{ padding: '16px 18px', marginTop: 20 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Legal & Compliance</div>
              {[
                { label: 'Data Protection Officer', email: 'dpo@kenyateachingvacancies.co.ke' },
                { label: 'Legal Enquiries', email: 'legal@kenyateachingvacancies.co.ke' },
                { label: 'Press & Media', email: 'press@kenyateachingvacancies.co.ke' },
              ].map(i => (
                <div key={i.label} style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 6 }}>
                  <span>{i.label}: </span>
                  <a href={`mailto:${i.email}`} style={{ color: 'var(--primary)' }}>{i.email}</a>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            <h2 className="contact-info-title">Send a Message</h2>
            {sent ? (
              <div className="contact-success glass card" style={{ padding: 28, textAlign: 'center' }}>
                <div style={{ color: 'var(--success)', marginBottom: 12 }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Message Sent!</div>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Thank you for reaching out. We'll respond within 2 business days.</p>
                <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setSent(false)}>Send Another</button>
              </div>
            ) : (
              <form className="contact-form glass card" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input className="input-field" name="name" value={form.name} onChange={handleChange} placeholder="Jane Wanjiku" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Email Address</label>
                  <input className="input-field" type="email" name="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
                </div>
                <div className="input-group">
                  <label className="input-label">Subject</label>
                  <select className="input-field" name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="">Select a topic…</option>
                    <option>Account issue</option>
                    <option>Subscription / Billing</option>
                    <option>Report a vacancy</option>
                    <option>School registration</option>
                    <option>Data request (KDPA)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Message</label>
                  <textarea
                    className="input-field"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your issue or question in detail…"
                    required
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: 12, fontSize: 15, fontWeight: 600 }} disabled={sending}>
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}
