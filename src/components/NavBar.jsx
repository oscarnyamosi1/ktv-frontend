import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ChangeColorContext'
import SideNav from './SideNav'
const LogoUrl = import.meta.env.VITE_LOGO_URL

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost theme-toggle"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-label="Toggle theme"
      style={{ padding: '7px', borderRadius: 'var(--radius-md)', minWidth: 36 }}
    >
      {theme === 'dark' ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
        </svg>
      )}
    </button>
  )
}

export default function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const openMobileNav = () => {
    document.querySelector('.overlay').style.display = 'block'
    document.querySelector('.overlay').addEventListener('click', () => {
      document.querySelector('.overlay').style.display = 'None'
    })
  }

  return (
    <>
      <nav className="top-nav">
        <Link to="/" className="logo-area">
          <img src={`${LogoUrl}`} alt="KTV Logo" />
          <span className='site-name'>Kenya Teaching Vacancies</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Feed</Link>
          <Link to="/jobs/saved" className="nav-link">Saved</Link>
          {user && <Link to="/profile" className="nav-link">Profile</Link>}
        </div>

        <div className='mobile-nav' onClick={openMobileNav}>:::
        </div>

        <div className='pc-head-nav' style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ThemeToggle />
          {user ? (
            <button className="btn btn-outline" onClick={handleLogout} style={{ fontSize: 13 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
              {user.username}
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" style={{ fontSize: 13 }}>Log In</Link>
              <Link to="/register" className="btn btn-primary" style={{ fontSize: 13 }}>Sign Up</Link>
            </>
          )}
        </div>
      </nav>

      <div className="overlay">
        <div className="overlay-content">
          <SideNav />
        </div>
      </div>
    </>
  )
}
