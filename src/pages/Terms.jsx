import Layout from '../components/Layout'
import '../pages/styles/legal.css'

const EFFECTIVE_DATE = '1 June 2026'
const COMPANY = 'Kenya Teaching Vacancies'
const EMAIL = 'legal@kenyateachingvacancies.co.ke'

export default function Terms() {
  return (
    <Layout>
      <div className="legal-page">
        <div className="legal-header">
          <h1 className="legal-title">Terms and Conditions</h1>
          <p className="legal-meta">Effective date: {EFFECTIVE_DATE}</p>
        </div>

        <div className="legal-body">
          <LegalSection title="1. Introduction">
            <p>Welcome to {COMPANY} ("Platform", "we", "us", or "our"). By accessing or using our website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use immediately.</p>
            <p>These Terms constitute a legally binding agreement between you and {COMPANY}, a platform connecting teachers with teaching vacancies across Kenya.</p>
          </LegalSection>

          <LegalSection title="2. Definitions">
            <ul>
              <li><strong>User</strong> — any person who accesses the Platform, whether registered or not.</li>
              <li><strong>Teacher</strong> — a registered user seeking teaching employment.</li>
              <li><strong>School</strong> — an institution registered on the Platform to post vacancies.</li>
              <li><strong>Vacancy</strong> — a teaching position listed by a School.</li>
              <li><strong>Application</strong> — a Teacher's submission of interest for a Vacancy.</li>
              <li><strong>Subscription</strong> — a paid plan granting enhanced access to Platform features.</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. User Obligations">
            <p>By using this Platform you agree to:</p>
            <ul>
              <li>Provide accurate, complete, and current information during registration and in your profile.</li>
              <li>Maintain the confidentiality of your account credentials and notify us immediately of any unauthorised access.</li>
              <li>Use the Platform only for lawful purposes and in accordance with these Terms.</li>
              <li>Not impersonate any person or entity or misrepresent your qualifications.</li>
              <li>Not submit fraudulent, misleading, or fabricated applications.</li>
              <li>Not attempt to scrape, harvest, or systematically collect data from the Platform without written consent.</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Vacancy Listings">
            <p>All vacancies are posted by registered Schools. {COMPANY} does not verify the accuracy of every listing and is not responsible for the content of individual postings.</p>
            <ul>
              <li>Schools must ensure vacancies are genuine, current, and legally compliant.</li>
              <li>Schools must not post positions that discriminate unlawfully based on gender, ethnicity, disability, religion, or other protected characteristics.</li>
              <li>We reserve the right to remove any listing that violates these Terms or applicable Kenyan law.</li>
            </ul>
          </LegalSection>

          <LegalSection title="5. School Responsibilities">
            <p>Schools agree to:</p>
            <ul>
              <li>Only post genuine vacancies for their institution.</li>
              <li>Respond to applicants in a timely and professional manner.</li>
              <li>Handle applicant data in accordance with the Kenya Data Protection Act 2019.</li>
              <li>Not use applicant data for purposes other than recruitment for the specific vacancy.</li>
              <li>Notify {COMPANY} if a vacancy is filled or withdrawn.</li>
            </ul>
          </LegalSection>

          <LegalSection title="6. Subscription Terms">
            <p>Paid subscriptions ("Plans") are billed monthly or annually via M-Pesa. By subscribing:</p>
            <ul>
              <li>You authorise recurring charges at the selected billing frequency.</li>
              <li>Subscriptions renew automatically unless cancelled before the renewal date.</li>
              <li>Downgrading takes effect at the end of the current billing period.</li>
              <li>Free tier users are limited to 2 applications per calendar month.</li>
              <li>Plan benefits are non-transferable between accounts.</li>
            </ul>
          </LegalSection>

          <LegalSection title="7. Intellectual Property">
            <p>All content on the Platform, including text, graphics, logos, icons, and software, is the property of {COMPANY} or its licensors and is protected under Kenyan and international intellectual property laws.</p>
            <p>You may not reproduce, distribute, or create derivative works of Platform content without our express written permission.</p>
          </LegalSection>

          <LegalSection title="8. Limitation of Liability">
            <p>{COMPANY} provides the Platform on an "as is" and "as available" basis. To the fullest extent permitted by law, we disclaim all warranties and shall not be liable for:</p>
            <ul>
              <li>Inaccuracies in job listings or school profiles.</li>
              <li>Loss of employment opportunity or income.</li>
              <li>Interruption, errors, or security breaches beyond our reasonable control.</li>
              <li>Actions taken by Schools or Teachers based on Platform information.</li>
            </ul>
            <p>In no event shall our aggregate liability exceed the total amount paid by you to us in the 3 months preceding the claim.</p>
          </LegalSection>

          <LegalSection title="9. Account Termination">
            <p>We reserve the right to suspend or terminate any account that:</p>
            <ul>
              <li>Violates these Terms or our Acceptable Use Policy.</li>
              <li>Submits fraudulent information or applications.</li>
              <li>Engages in abusive or harassing behaviour toward other users or school staff.</li>
            </ul>
            <p>Users may delete their account at any time from Settings. Upon deletion, personal data is handled in accordance with our Privacy Policy.</p>
          </LegalSection>

          <LegalSection title="10. Governing Law">
            <p>These Terms are governed by the laws of the Republic of Kenya. Any disputes shall be subject to the exclusive jurisdiction of the Kenyan courts.</p>
          </LegalSection>

          <LegalSection title="11. Changes to These Terms">
            <p>We may update these Terms from time to time. Material changes will be notified via email or a prominent notice on the Platform. Continued use after changes constitutes acceptance.</p>
          </LegalSection>

          <LegalSection title="12. Contact Us">
            <p>For questions about these Terms, contact us at: <a href={`mailto:${EMAIL}`} style={{ color: 'var(--primary)' }}>{EMAIL}</a></p>
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
