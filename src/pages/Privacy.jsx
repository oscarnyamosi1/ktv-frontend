import Layout from '../components/Layout'
import '../pages/styles/legal.css'

const EFFECTIVE_DATE = '1 June 2026'
const EMAIL = 'privacy@kenyateachingvacancies.co.ke'
const DPO_EMAIL = 'dpo@kenyateachingvacancies.co.ke'

export default function Privacy() {
  return (
    <Layout>
      <div className="legal-page">
        <div className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">Effective date: {EFFECTIVE_DATE} · Compliant with the Kenya Data Protection Act 2019</p>
        </div>

        <div className="legal-body">
          <LegalSection title="1. Introduction">
            <p>Kenya Teaching Vacancies ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains what information we collect, how we use it, and your rights under the Kenya Data Protection Act 2019 (KDPA) and other applicable laws.</p>
            <p>By using our Platform, you consent to the collection and processing of your data as described in this Policy.</p>
          </LegalSection>

          <LegalSection title="2. Information We Collect">
            <p><strong>Account Information:</strong> Name, email address, phone number, password (hashed), and professional details when you register.</p>
            <p><strong>Profile Data:</strong> Teaching qualifications, TSC number (optional), CV/resume documents, subjects taught, experience level, and preferred counties.</p>
            <p><strong>Application Data:</strong> Records of jobs you apply for, application status, and communication with schools.</p>
            <p><strong>Payment Data:</strong> M-Pesa transaction references, subscription plan, and billing history. We do not store your M-Pesa PIN.</p>
            <p><strong>Usage Data:</strong> Pages visited, search queries, device type, browser, and IP address, collected via cookies and server logs.</p>
            <p><strong>Communications:</strong> Messages you send through our platform and support requests.</p>
          </LegalSection>

          <LegalSection title="3. How We Use Your Data">
            <ul>
              <li><strong>To provide the service:</strong> Create and manage your account, match you with relevant vacancies, and process applications.</li>
              <li><strong>Payments:</strong> Process subscription payments via M-Pesa and maintain billing records.</li>
              <li><strong>Notifications:</strong> Send job alerts, application updates, and important service messages.</li>
              <li><strong>Improving the Platform:</strong> Analyse usage patterns to improve features, performance, and user experience.</li>
              <li><strong>Legal compliance:</strong> Comply with Kenyan laws and respond to lawful government requests.</li>
              <li><strong>Security:</strong> Detect and prevent fraud, abuse, and security incidents.</li>
            </ul>
            <p>We rely on the following lawful bases under the KDPA: performance of a contract, legitimate interests, legal obligation, and consent (where indicated).</p>
          </LegalSection>

          <LegalSection title="4. Data Sharing">
            <p>We do not sell your personal data. We may share data with:</p>
            <ul>
              <li><strong>Schools:</strong> When you apply for a vacancy, your profile and CV are shared with the posting school.</li>
              <li><strong>Payment providers:</strong> Safaricom/M-Pesa for transaction processing.</li>
              <li><strong>Service providers:</strong> Cloud hosting, analytics, and email delivery providers bound by data processing agreements.</li>
              <li><strong>Law enforcement:</strong> When required by a valid court order or Kenyan law.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. Cookies">
            <p>We use cookies and similar technologies to maintain your session, remember preferences, and analyse usage. See our <a href="/cookies" style={{ color: 'var(--primary)' }}>Cookie Policy</a> for full details.</p>
            <p>You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.</p>
          </LegalSection>

          <LegalSection title="6. Data Retention">
            <p>We retain your data for as long as your account is active or as needed to provide services. Specifically:</p>
            <ul>
              <li>Account data: Until account deletion, plus 30 days for recovery.</li>
              <li>Application records: 2 years after the application date.</li>
              <li>Payment records: 7 years for tax and audit compliance.</li>
              <li>Usage/log data: 12 months.</li>
            </ul>
            <p>After retention periods expire, data is securely deleted or anonymised.</p>
          </LegalSection>

          <LegalSection title="7. Your Rights Under the KDPA">
            <p>As a data subject, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
              <li><strong>Deletion:</strong> Request erasure of your data ("right to be forgotten"), subject to legal retention obligations.</li>
              <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
              <li><strong>Withdrawal of consent:</strong> Where processing is based on consent, withdraw it at any time.</li>
            </ul>
            <p>To exercise these rights, contact our Data Protection Officer at <a href={`mailto:${DPO_EMAIL}`} style={{ color: 'var(--primary)' }}>{DPO_EMAIL}</a>. We will respond within 21 days.</p>
          </LegalSection>

          <LegalSection title="8. Security">
            <p>We implement appropriate technical and organisational measures to protect your data, including:</p>
            <ul>
              <li>HTTPS encryption for all data in transit.</li>
              <li>Hashed and salted password storage.</li>
              <li>Role-based access controls for staff.</li>
              <li>Regular security audits and vulnerability assessments.</li>
            </ul>
            <p>Despite these measures, no online service is 100% secure. In the event of a data breach affecting your rights, we will notify you and the Office of the Data Protection Commissioner (ODPC) as required by law.</p>
          </LegalSection>

          <LegalSection title="9. Children's Privacy">
            <p>Our Platform is intended for users aged 18 and above. We do not knowingly collect data from children under 18. If you believe a child has provided us with personal data, contact us immediately.</p>
          </LegalSection>

          <LegalSection title="10. Changes to This Policy">
            <p>We may update this Privacy Policy periodically. Material changes will be communicated via email or Platform notification. Your continued use constitutes acceptance of the updated policy.</p>
          </LegalSection>

          <LegalSection title="11. Contact">
            <p>General privacy enquiries: <a href={`mailto:${EMAIL}`} style={{ color: 'var(--primary)' }}>{EMAIL}</a></p>
            <p>Data Protection Officer: <a href={`mailto:${DPO_EMAIL}`} style={{ color: 'var(--primary)' }}>{DPO_EMAIL}</a></p>
            <p>You may also lodge a complaint with the <strong>Office of the Data Protection Commissioner (ODPC)</strong>, Nairobi, Kenya.</p>
          </LegalSection>
        </div>
      </div>
    </Layout>
  )
}

function LegalSection({ title, children }) {
  return (
    <section className="legal-section">
      <h2 className="legal-section-title">{title}</h2>
      <div className="legal-section-body">{children}</div>
    </section>
  )
}
