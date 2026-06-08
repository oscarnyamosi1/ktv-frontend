import React from "react";
import { useApi } from "../adminhooks/useApi.js";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, LineChart, Line, PieChart, Pie, Cell, Legend
} from "recharts";
import "./Analytics.css";


const MOCK_FUNNEL = [
  { stage: "Applied", count: 312 }, { stage: "Shortlisted", count: 98 },
  { stage: "Interview", count: 42 }, { stage: "Hired", count: 17 },
];
const MOCK_SUBJECTS = [
  { subject: "Mathematics", count: 87 }, { subject: "English", count: 73 },
  { subject: "Science", count: 61 }, { subject: "History", count: 44 },
  { subject: "Kiswahili", count: 38 }, { subject: "Business", count: 29 },
];
const MOCK_JOBS_PERF = [
  { name: "Sr. Math Teacher", applicants: 34, views: 210 },
  { name: "English Teacher", applicants: 21, views: 145 },
  { name: "Biology Teacher", applicants: 8, views: 72 },
  { name: "History Teacher", applicants: 15, views: 98 },
  { name: "Physics Teacher", applicants: 27, views: 180 },
];
const MOCK_USAGE = [
  { date: "May 20", signups: 14, applications: 28 }, { date: "May 21", signups: 9, applications: 19 },
  { date: "May 22", signups: 22, applications: 41 }, { date: "May 23", signups: 18, applications: 35 },
  { date: "May 24", signups: 11, applications: 22 }, { date: "May 25", signups: 25, applications: 48 },
  { date: "May 26", signups: 19, applications: 37 },
];
const COLORS = ["hsl(199,90%,48%)", "hsl(162,62%,40%)", "hsl(38,92%,50%)", "hsl(0,72%,51%)"];
const TOOLTIP_STYLE = { background: "#111c2e", border: "1px solid #1e2d45", borderRadius: 8, color: "#e8edf5", fontSize: 13 };
const TICK_STYLE = { fill: "#6b84a0", fontSize: 12 };

export default function Analytics() {
  const { data } = useApi("/analytics/");

  return (
      <div className="analytics">
        <div className="analytics__grid">
          <div className="analytics__card analytics__card--wide">
            <h3 className="analytics__card-title">Hiring Funnel</h3>
            <p className="analytics__card-sub">Applied → Shortlisted → Interview → Hired</p>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MOCK_FUNNEL} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                <XAxis dataKey="stage" tick={TICK_STYLE} />
                <YAxis tick={TICK_STYLE} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {MOCK_FUNNEL.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics__card">
            <h3 className="analytics__card-title">Most Applied Subjects</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={MOCK_SUBJECTS} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                <XAxis type="number" tick={TICK_STYLE} />
                <YAxis dataKey="subject" type="category" tick={TICK_STYLE} width={80} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Bar dataKey="count" fill="hsl(162,62%,40%)" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics__card analytics__card--wide">
            <h3 className="analytics__card-title">Platform Activity (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={MOCK_USAGE} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d45" />
                <XAxis dataKey="date" tick={TICK_STYLE} />
                <YAxis tick={TICK_STYLE} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Legend wrapperStyle={{ color: "#7ba7cc", fontSize: 13 }} />
                <Line type="monotone" dataKey="signups" stroke="hsl(199,90%,48%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="applications" stroke="hsl(162,62%,40%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="analytics__card">
            <h3 className="analytics__card-title">Active Job Performance</h3>
            <div className="analytics__job-list">
              {MOCK_JOBS_PERF.map((job, i) => (
                <div key={i} className="analytics__job-row">
                  <span className="analytics__job-name">{job.name}</span>
                  <div className="analytics__job-stats">
                    <span className="analytics__job-stat analytics__job-stat--primary">{job.applicants} apps</span>
                    <span className="analytics__job-stat analytics__job-stat--muted">{job.views} views</span>
                  </div>
                  <div className="analytics__job-bar">
                    <div className="analytics__job-bar-fill" style={{ width: `${(job.applicants / 40) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export { Analytics };
