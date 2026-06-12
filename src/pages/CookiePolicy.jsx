import Layout from '../components/Layout'
import '../pages/styles/legal.css'

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="legal-page">
        <div className="legal-header">
          <h1 className="legal-title">Cookie Policy</h1>
          <p className="legal-meta">Effective date: 1 June 2026</p>
        </div>

        <div className="legal-body">
          <LegalSection title="1. What Are Cookies?">
            <p>Cookies are small text files placed on your device when you visit a website. They help the site recognise your device on subsequent visits and remember your preferences.</p>
          </LegalSection>

          <LegalSection title="2. Cookies We Use">
            <div className="cookie-table-wrap">
              <table className="cookie-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Cookie Name(s)</th>
                    <th>Purpose</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span className="tag tag-success">Essential</span></td>
                    <td>auth_session, csrftoken</td>
                    <td>Maintain your login session and protect against CSRF attacks. Required for the Platform to function.</td>
                    <td>Session / 1 day</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-primary">Functional</span></td>
                    <td>ktv_theme, ktv_sub_*</td>
                    <td>Remember your theme preference (dark/light) and subscription state.</td>
                    <td>Persistent (localStorage)</td>
                  </tr>
                  <tr>
                    <td><span className="tag tag-warning">Analytics</span></td>
                    <td>_ga, _gid</td>
                    <td>Google Analytics — aggregate, anonymised usage statistics to help us improve the Platform. No personal data is shared.</td>
                    <td>2 years / 24 hours</td>
                  </tr>
                  <tr>
                    <td><span className="tag" style={{ background: 'rgba(139,92,246,0.15)', color: '#8b5cf6', borderColor: 'rgba(139,92,246,0.3)' }}>Marketing</span></td>
                    <td>_fbp (optional)</td>
                    <td>Used to measure ad effectiveness on social platforms. Only placed with your explicit consent.</td>
                    <td>90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </LegalSection>

          <LegalSection title="3. Essential Cookies">
            <p>These cookies are strictly necessary for the Platform to operate. They cannot be disabled. They include:</p>
            <ul>
              <li>Authentication tokens to keep you logged in.</li>
              <li>Security tokens (CSRF) to protect form submissions.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Functional Cookies">
            <p>Functional cookies enhance your experience by remembering your choices (e.g., dark/light theme). They are stored in your browser's localStorage, not as HTTP cookies, but serve the same purpose of persisting preferences.</p>
          </LegalSection>

          <LegalSection title="5. Analytics Cookies">
            <p>We use Google Analytics to understand how users interact with the Platform. Data collected is aggregated and anonymised. IP addresses are truncated before storage. You can opt out by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Google Analytics Opt-out Browser Add-on</a>.</p>
          </LegalSection>

          <LegalSection title="6. Marketing Cookies">
            <p>Marketing cookies are only placed with your explicit consent. They help us measure the effectiveness of advertising campaigns. You may withdraw consent at any time through your browser settings.</p>
          </LegalSection>

          <LegalSection title="7. Managing Cookies">
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Preferences → Privacy &amp; Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
            </ul>
            <p>Note: Disabling essential cookies will prevent you from logging in to the Platform.</p>
          </LegalSection>

          <LegalSection title="8. Changes to This Policy">
            <p>We may update this Cookie Policy as technology or legal requirements change. Material changes will be communicated on the Platform.</p>
          </LegalSection>

          <LegalSection title="9. Contact">
            <p>Cookie-related queries: <a href="mailto:privacy@kenyateachingvacancies.co.ke" style={{ color: 'var(--primary)' }}>privacy@kenyateachingvacancies.co.ke</a></p>
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
