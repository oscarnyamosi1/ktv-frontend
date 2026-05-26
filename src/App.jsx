import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import JobFeed from './pages/JobFeed'
import JobDetail from './pages/JobDetail'
import SavedJobs from './pages/SavedJobs'
import MyApplications from './pages/MyApplications'
import TeacherProfile from './pages/TeacherProfile'
import Schools from './pages/Schools'
import NotFound from './pages/NotFound'

import Settings from './pages/Settings'
import AccountSettings from './pages/settings/AccountSettings'
import AppearancePage from './pages/settings/AppearancePage'
import SecurityPasswordPage from './pages/settings/SecurityPasswordPage'
import SecurityEmailPage from './pages/settings/SecurityEmailPage'
import Security2FAPage from './pages/settings/Security2FAPage'
import DocumentsPage from "./pages/settings/DocumentsPage"
import NotificationSettingsPage from './pages/settings/NotificationSettingsPage'
import UploadDocumentsPage from './pages/UploadDocumetsPage'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
import AdminDashboard from './pages/AdminDashboard'
import SuDashboard from './pages/SuDashboard'
import PostJob from './pages/PostJob'
import "./App.css"


function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" /></div>
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<JobFeed />} />
      <Route path="/login" element={<Login />} />

      <Route path="/settings" element={<PrivateRoute><Settings />clear</PrivateRoute>} />
      <Route path="/settings/account" element={<PrivateRoute ><AccountSettings /></PrivateRoute>} />
      <Route path="/settings/appearance" element={<AppearancePage />} />

      <Route path="/upload-docs" element={<UploadDocumentsPage />} />
      <Route path="/jobs/postjob" element={<PostJob />} />  



      <Route path="/settings/security/password" element={<PrivateRoute><SecurityPasswordPage /></PrivateRoute>} />
      <Route path="/settings/security/email" element={<PrivateRoute><SecurityEmailPage /></PrivateRoute>} />
      <Route path="/settings/security/2fa" element={<PrivateRoute><Security2FAPage /></PrivateRoute>} />

      <Route path="/settings/view-documents" element={<PrivateRoute><DocumentsPage /></PrivateRoute>} />
      <Route path="/settings/notifications" element={<PrivateRoute><NotificationSettingsPage /></PrivateRoute>} />

      <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      <Route path="/employers/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/su/dashboard" element={<PrivateRoute><SuDashboard /></PrivateRoute>} />

      <Route path="/register" element={<Register />} />
      <Route path="/jobs/view/:id" element={<JobDetail />} />
      <Route path="/jobs/saved" element={<SavedJobs />} />

      <Route path="/schools" element={<Schools />} />
      
      <Route path="/myapplications" element={<PrivateRoute><MyApplications /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><TeacherProfile /></PrivateRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
