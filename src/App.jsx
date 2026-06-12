import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import Subscription from './pages/Subscription'
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
// import AccountSettings from './pages/settings/AccountSettings'
// import AppearancePage from './pages/settings/AppearancePage'
// import SecurityPasswordPage from './pages/settings/SecurityPasswordPage'
// import SecurityEmailPage from './pages/settings/SecurityEmailPage'
// import Security2FAPage from './pages/settings/Security2FAPage'
// import DocumentsPage from "./pages/settings/DocumentsPage"
// import NotificationSettingsPage from './pages/settings/NotificationSettingsPage'
import UploadDocumentsPage from './pages/UploadDocumetsPage'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
// import AdminShell from './pages/AdminShell'
import PostJob from './pages/PostJob'
import "./App.css"
// import Subscriptions from './adminpages/Subscriptions'
// import Dashboard from './adminpages/Dashboard'
// import Analytics from './adminpages/Analytics'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 100 }}><div className="spinner" /></div>
  return user ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  return (
    <Routes>
          {/* admin routes */}
      {/* <Route path='/admin/dashboard' element={<Dashboard />} />     */}
      {/* <Route path="/admin/subscriptions" element={<Subscriptions />} /> */}
      {/* <Route path="/admin/Analytics" element={<Analytics />} /> */}

      <Route path="/" element={<JobFeed />} />
      <Route path="/login" element={<Login />} />

      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      {/* <Route path="/settings/account" element={<PrivateRoute ><AccountSettings /></PrivateRoute>} /> */}
      {/* <Route path="/settings/appearance" element={<AppearancePage />} /> */}

      <Route path="/upload-docs" element={<PrivateRoute><UploadDocumentsPage /></PrivateRoute>} />
      <Route path="/jobs/postjob" element={<PrivateRoute><PostJob /></PrivateRoute>} />  



      {/* <Route path="/settings/security/password" element={<PrivateRoute><SecurityPasswordPage /></PrivateRoute>} /> */}
      {/* <Route path="/settings/security/email" element={<PrivateRoute><SecurityEmailPage /></PrivateRoute>} /> */}
      {/* <Route path="/settings/security/2fa" element={<PrivateRoute><Security2FAPage /></PrivateRoute>} /> */}

      {/* <Route path="/settings/view-documents" element={<PrivateRoute><DocumentsPage /></PrivateRoute>} /> */}
      {/* <Route path="/settings/notifications" element={<PrivateRoute><NotificationSettingsPage /></PrivateRoute>} /> */}

      <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
      {/* <Route path="/admin/*" element={<PrivateRoute><AdminShell /></PrivateRoute>} /> */}
      {/* <Route path="/employers/admin" element={<Navigate to="/admin/dashboard" replace />} /> */}
      {/* <Route path="/su/dashboard" element={<Navigate to="/admin/dashboard" replace />} /> */}

      <Route path="/register" element={<Register />} />
      <Route path="/jobs/view/:id" element={<JobDetail />} />
      <Route path="/jobs/saved" element={<SavedJobs />} />

      <Route path="/schools" element={<Schools />} />
      
      <Route path="/myapplications" element={<PrivateRoute><MyApplications /></PrivateRoute>} />
      <Route path="/profile" element={<PrivateRoute><TeacherProfile /></PrivateRoute>} />
      <Route path="/subscription" element={<PrivateRoute><Subscription /></PrivateRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SubscriptionProvider>
          <AppRoutes />
        </SubscriptionProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
