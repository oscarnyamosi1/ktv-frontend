import React from "react";
import { useNavigate } from "react-router-dom";
import { dashboardApi } from "../api/adminApi.js";
import { useAdminApi } from "../adminhooks/useAdminApi.js";
import StatCard from "../admincomponents/shared/StatCard.jsx";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell
} from "recharts";
import { TrendingUp, Users, Briefcase, CheckCircle, AlertCircle, Clock } from "lucide-react";
import "./Dashboard.css";

const MOCK_STATS = { total_jobs: 24, total_applicants: 312, active_jobs: 18, total_users: 487 };
const MOCK_FUNNEL = [
  { stage: "Applied", count: 312 },
  { stage: "Shortlisted", count: 98 },
  { stage: "Interview", count: 42 },
  { stage: "Hired", count: 17 },
];
const MOCK_SUBJECTS = [
  { subject: "Mathematics", count: 87 },
  { subject: "English", count: 73 },
  { subject: "Science", count: 61 },
  { subject: "History", count: 44 },
  { subject: "Kiswahili", count: 38 },
];
const MOCK_ACTIVITY = [
  { id: 1, text: "New applicant for Senior Math Teacher", time: "2 min ago", type: "applicant" },
  { id: 2, text: "Job posting \"Science Teacher\" published", time: "18 min ago", type: "job" },
  { id: 3, text: "5 candidates shortlisted for English Teacher", time: "1h ago", type: "shortlist" },
  { id: 4, text: "User John Kamau verified", time: "2h ago", type: "user" },
  { id: 5, text: "Announcement sent to 320 users", time: "3h ago", type: "broadcast" },
];

function QuickLink({ href, className, children }) {
  const navigate = useNavigate();
  return (
    <button type="button" className={className} onClick={() => navigate(href)}>
      {children}
    </button>
  );
}

export default function Dashboard() {
  const { data: stats, loading: statsLoading } = useAdminApi(() => dashboardApi.getStats());
  const { data: activity, loading: activityLoading } = useAdminApi(() => dashboardApi.getActivityLog(5));

  const s = stats || MOCK_STATS;
  const recentActivity = activity || MOCK_ACTIVITY;

  return (
    <div className="dashboard">
      <div className="dashboard__stats">
        <StatCard label="Total Jobs" value={s.total_jobs ?? MOCK_STATS.total_jobs} sub="All postings" color="blue" loading={statsLoading} />
        <StatCard label="Active Jobs" value={s.active_jobs ?? MOCK_STATS.active_jobs} sub="Currently live" color="green" loading={statsLoading} />
        <StatCard label="Total Applicants" value={s.total_applicants ?? MOCK_STATS.total_applicants} sub="All time" color="purple" loading={statsLoading} />
        <StatCard label="Registered Users" value={s.total_users ?? MOCK_STATS.total_users} sub="Teachers" color="yellow" loading={statsLoading} />
      </div>

      <div className="dashboard__charts">
        <div className="dashboard__chart-card">
          <h3 className="dashboard__chart-title">Hiring Funnel</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_FUNNEL} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213 38% 19%)" />
              <XAxis dataKey="stage" tick={{ fill: "#6b84a0", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6b84a0", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#111c2e", border: "1px solid #1e2d45", borderRadius: 8, color: "#e8edf5" }} />
              <Bar dataKey="count" fill="hsl(199 90% 48%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="dashboard__chart-card">
          <h3 className="dashboard__chart-title">Most Applied Subjects</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_SUBJECTS} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(213 38% 19%)" />
              <XAxis type="number" tick={{ fill: "#6b84a0", fontSize: 12 }} />
              <YAxis dataKey="subject" type="category" tick={{ fill: "#6b84a0", fontSize: 12 }} width={80} />
              <Tooltip contentStyle={{ background: "#111c2e", border: "1px solid #1e2d45", borderRadius: 8, color: "#e8edf5" }} />
              <Bar dataKey="count" fill="hsl(162 62% 40%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="dashboard__bottom">
        <div className="dashboard__activity">
          <h3 className="dashboard__section-title">Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-item">
                <div className={`activity-dot activity-dot--${item.type}`} />
                <div className="activity-content">
                  <p className="activity-text">{item.text}</p>
                  <span className="activity-time">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard__quick-links">
          <h3 className="dashboard__section-title">Quick Actions</h3>
          <div className="quick-links">
            <QuickLink href="/admin/jobs" className="quick-link">+ Post New Job</QuickLink>
            <QuickLink href="/admin/users" className="quick-link quick-link--green">Verify Users</QuickLink>
            <QuickLink href="/admin/analytics" className="quick-link quick-link--purple">View Reports</QuickLink>
            <QuickLink href="/admin/moderation" className="quick-link quick-link--yellow">Check Alerts</QuickLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Dashboard };
