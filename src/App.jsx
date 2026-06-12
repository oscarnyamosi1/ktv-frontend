import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { SubscriptionProvider } from './contexts/SubscriptionContext'
import { ThemeProvider } from './contexts/ChangeColorContext'

import Subscription from './pages/Subscription'
import Pricing from './pages/Pricing'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import CookiePolicy from './pages/CookiePolicy'
import Contact from './pages/Contact'

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
import UploadDocumentsPage from './pages/UploadDocumetsPage'
import Messages from './pages/Messages'
import Notifications from './pages/Notifications'
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
      {/* Public routes */}
      <Route path="/" element={<JobFeed />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/jobs/view/:id" element={<JobDetail />} />
      <Route path="/jobs/saved" element={<SavedJobs />} />
      <Route path="/schools" element={<Schools />} />

      {/* Info / legal pages */}
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookies" element={<CookiePolicy />} />
      <Route path="/contact" element={<Contact />} />

      {/* Private routes */}
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
      <Route path="/upload-docs" element={<PrivateRoute><UploadDocumentsPage /></PrivateRoute>} />
      <Route path="/jobs/postjob" element={<PrivateRoute><PostJob /></PrivateRoute>} />
      <Route path="/messages" element={<PrivateRoute><Messages /></PrivateRoute>} />
      <Route path="/notifications" element={<PrivateRoute><Notifications /></PrivateRoute>} />
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
      <ThemeProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <AppRoutes />
          </SubscriptionProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
