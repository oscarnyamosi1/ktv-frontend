import "../styles/appearancepage.css"
import NavBar from '../../components/NavBar'
import SideNav from '../../components/SideNav'
import { useState } from 'react'

export default function AppearancePage() {
  const [activeTheme, setActiveTheme] = useState(null)

  const themes = [
    {
      label: 'Green Theme',
      value: 'green',
      bg: '#052e1a',
      primary: '#22c55e',
      accent: '#16a34a',
    },
    {
      label: 'Light Green',
      value: 'lightgreen',
      bg: '#0f2f1a',
      primary: '#86efac',
      accent: '#22c55e',
    },
    {
      label: 'Purple',
      value: 'purple',
      bg: '#1a0b2e',
      primary: '#a855f7',
      accent: '#7c3aed',
    },
    {
      label: 'Root3 Blue',
      value: 'root3',
      bg: '#0b1b2e',
      primary: '#38bdf8',
      accent: '#6366f1',
    },
    {
      label: 'Pink Root',
      value: 'pinkroot',
      bg: '#2e0b1b',
      primary: '#ec4899',
      accent: '#f43f5e',
    },
    {
      label: 'Pink',
      value: 'pink',
      bg: '#2a0a16',
      primary: '#f472b6',
      accent: '#db2777',
    },
    {
      label: 'Mac Glass',
      value: 'macglass',
      bg: '#0f172a',
      primary: '#cbd5f5',
      accent: '#94a3b8',
    },
    {
      label: 'Charcoal',
      value: 'charcoal',
      bg: '#0a0a0a',
      primary: '#9ca3af',
      accent: '#374151',
    },
    {
      label: 'Hybrid',
      value: 'macglasshybrid',
      bg: '#120b1f',
      primary: '#a855f7',
      accent: '#f472b6',
    },
  ]

  const changeTheme = (theme) => {
    setActiveTheme(theme)
    window.location.href = `/changetheme?q=${theme}`
  }

  return (
    <>
      <NavBar />

      <div className="app-layout">
        <aside className="sidebar-left">
          <SideNav />
        </aside>

        <main className="content-container">

          <h2 className="page-title">Appearance</h2>
          <p className="subtitle">Pick a theme that matches your style</p>

          <div className="theme-grid-modern">

            {themes.map((t) => (
              <div
                key={t.value}
                className={`theme-card ${activeTheme === t.value ? 'active' : ''}`}
                onClick={() => changeTheme(t.value)}
                style={{
                  background: `linear-gradient(135deg, ${t.bg}, #111827)`
                }}
              >

                {/* live preview */}
                <div className="theme-preview">
                  <div
                    className="theme-dot primary"
                    style={{ background: t.primary }}
                  />
                  <div
                    className="theme-dot accent"
                    style={{ background: t.accent }}
                  />
                </div>

                <div className="theme-info">
                  <div className="theme-title">{t.label}</div>
                  <div className="theme-sub">{t.value}</div>
                </div>

                {activeTheme === t.value && (
                  <div className="active-badge">✓</div>
                )}
              </div>
            ))}

          </div>

        </main>
      </div>
    </>
  )
}