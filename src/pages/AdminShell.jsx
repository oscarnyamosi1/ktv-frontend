import React from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from '../admincomponents/Layout/Layout.jsx'
import Dashboard from '../adminpages/Dashboard.jsx'
import Jobs from '../adminpages/Jobs.jsx'
import Users from '../adminpages/Users.jsx'
import Analytics from '../adminpages/Analytics.jsx'
import Moderation from '../adminpages/Moderation.jsx'
import Settings from '../adminpages/Settings.jsx'
import Subscriptions from '../adminpages/Subscriptions.jsx'
import SchoolProfile from '../adminpages/SchoolProfile.jsx'
import Communications from '../adminpages/Communications.jsx'
import Applicants from '../adminpages/Applicants.jsx'

export default function AdminShell() {
  const location = useLocation()

  return (
    <Layout currentPath={location.pathname}>
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="users" element={<Users />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="moderation" element={<Moderation />} />
        <Route path="settings" element={<Settings />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="school-profile" element={<SchoolProfile />} />
        <Route path="communications" element={<Communications />} />
        <Route path="applicants" element={<Applicants />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </Layout>
  )
}
