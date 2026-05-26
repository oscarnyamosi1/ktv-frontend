import Layout from "../components/Layout"
import "./styles/notifications.css"

export default function Notifications(){

return (
    <Layout>


    <div className="page-header">
      <h1 className="page-title">Notifications</h1>
      <div className="mark-read-btn" data-media-type="kenya-teaching-vacancies-button">
        Mark all as read
      </div>
    </div>

    <div className="filter-tabs">
      <div className="filter-tab active" data-media-type="kenya-teaching-vacancies-button">
        All
      </div>
      <div className="filter-tab" data-media-type="kenya-teaching-vacancies-button">
        Job Alerts
      </div>
      <div className="filter-tab" data-media-type="kenya-teaching-vacancies-button">
        Applications
      </div>
      <div className="filter-tab" data-media-type="kenya-teaching-vacancies-button">
        Mentions
      </div>
    </div>

    <div className="notification-section">
      <div className="section-label">New</div>

      {/* <!-- Notif 1: Job Alert (Unread) --> */}
      <div
        className="notification-card glass-card unread"
        data-media-type="kenya-teaching-vacancies-button"
      >
        <div className="notif-avatar-wrapper">
          <img
            src="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F25-35%2FHispanic%2F2"
            className="notif-avatar"
            alt="Recruiter"
          />
          <div className="notif-type-icon type-job">
            <iconify-icon
              icon="lucide:briefcase"
              style={{fontSize:14}}
            ></iconify-icon>
          </div>
        </div>
        <div className="notif-content">
          <div className="notif-text">
            <strong>Sunnyvale District</strong> posted a new position:
            <strong>Senior History Teacher</strong> matching your
            preferences.
          </div>
          <div className="notif-time">20 minutes ago</div>
        </div>
        <div className="unread-indicator"></div>
      </div>

      {/* <!-- Notif 2: Application Update (Unread) --> */}
      <div
        className="notification-card glass-card unread"
        data-media-type="kenya-teaching-vacancies-button"
      >
        <div className="notif-avatar-wrapper">
          <img
            src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F50-65%2FAfrican%2F2"
            className="notif-avatar"
            alt="Westside Academy"
          />
          <div className="notif-type-icon type-view">
            <iconify-icon
              icon="lucide:eye"
              style={{fontSize:14}}
            ></iconify-icon>
          </div>
        </div>
        <div className="notif-content">
          <div className="notif-text">
            <strong>Westside Academy</strong> viewed your application
            for <strong>Head of Science</strong>.
          </div>
          <div className="notif-time">2 hours ago</div>
        </div>
        <div className="unread-indicator"></div>
      </div>

      {/* <!-- Notif 3: Message (Unread) --> */}
      <div
        className="notification-card glass-card unread"
        data-media-type="kenya-teaching-vacancies-button"
      >
        <div className="notif-avatar-wrapper">
          <img
            src="https://storage.googleapis.com/banani-avatars/avatar%2Ffemale%2F35-50%2FEuropean%2F4"
            className="notif-avatar"
            alt="Principal Sarah"
          />
          <div className="notif-type-icon type-message">
            <iconify-icon
              icon="lucide:message-circle"
              style={{fontSize:14}}
            ></iconify-icon>
          </div>
        </div>
        <div className="notif-content">
          <div className="notif-text">
            <strong>Principal Sarah</strong> sent you a message: "Is
            this salary range okay?"
          </div>
          <div className="notif-time">3 hours ago</div>
        </div>
        <div className="unread-indicator"></div>
      </div>
    </div>

    {/* <!-- Earlier Section --> */}
    <div className="notification-section">
      <div className="section-label">Earlier</div>

      {/* <!-- Notif 4: Alert --> */}
      <div className="notification-card glass-card" data-media-type="kenya-teaching-vacancies-button">
        <div className="notif-avatar-wrapper">
          <div
            className="notif-avatar"
            style={{
              backgroundColor: "var(--input)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"}}
          >
            <iconify-icon
              icon="lucide:bell-ring"
              style={{fontSize: 24,color: "var(--muted-foreground)"}}
            ></iconify-icon>
          </div>
          <div className="notif-type-icon type-alert">
            <iconify-icon
              icon="lucide:zap"
              style={{fontSize: 14}}
            ></iconify-icon>
          </div>
        </div>
        <div className="notif-content">
          <div className="notif-text">
            3 new <strong>English Teacher</strong> jobs in
            <strong>New York</strong> were added today.
          </div>
          <div className="notif-meta">Yesterday at 4:30 PM</div>
        </div>
      </div>

      {/* <!-- Notif 5: Application Status --> */}
      <div className="notification-card glass-card" data-media-type="kenya-teaching-vacancies-button">
        <div className="notif-avatar-wrapper">
          <img
            src="https://storage.googleapis.com/banani-avatars/avatar%2Fmale%2F25-35%2FSouth%20Asian%2F1"
            className="notif-avatar"
            alt="Recruiter Raj"
          />
          <div className="notif-type-icon type-job">
            <iconify-icon
              icon="lucide:check"
              style={{fontSize: 14}}
            ></iconify-icon>
          </div>
        </div>
        <div className="notif-content">
          <div className="notif-text">
            <strong>Recruiter Raj</strong> marked your application as
            <strong>Shortlisted</strong>.
          </div>
          <div className="notif-meta">Yesterday at 10:15 AM</div>
        </div>
      </div>

      {/* <!-- Notif 6: Profile --> */}
      <div className="notification-card glass-card" data-media-type="kenya-teaching-vacancies-button">
        <div className="notif-avatar-wrapper">
          <div
            className="notif-avatar"
            style={{
              backgroundColor: "var(--secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center" }}
            
          >
            <iconify-icon
              icon="lucide:user"
              style={{fontSize: 24, color: "var(--foreground)"}}
            ></iconify-icon>
          </div>
        </div>
        <div className="notif-content">
          <div className="notif-text">
            Your profile is getting noticed! 5 recruiters viewed your
            profile this week.
          </div>
          <div className="notif-meta">2 days ago</div>
        </div>
      </div>
    </div>


    </Layout>
)

}