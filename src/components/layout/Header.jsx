import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Container } from './Container'
import { getTheme, setTheme } from '@/lib/theme'

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function navClass({ isActive }) {
  return isActive
    ? 'text-theme-fg transition-colors'
    : 'text-theme-muted hover:text-theme-fg transition-colors'
}

export function Header() {
  const [theme, setThemeState] = useState(getTheme)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeState(getTheme())
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    setThemeState(next)
  }

  return (
    <header className="sticky top-0 z-50 bg-theme-bg border-b border-theme-border">
      <Container>
        <nav className="flex items-center justify-between py-4 gap-6">
          {/* Brand */}
          <Link
            to="/"
            className="text-lg font-semibold text-theme-fg shrink-0 font-display"
          >
            Ayesha Jan M.
          </Link>

          {/* Nav links — hidden on small screens */}
          <div className="hidden md:flex items-center gap-7 font-body text-sm">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/amazon" className={navClass}>Amazon</NavLink>
            <NavLink to="/3d" className={navClass}>3D</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
          </div>

          {/* Right side: theme toggle + CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full text-theme-muted hover:text-theme-fg hover:bg-theme-border transition-colors"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-theme-fg text-theme-bg text-sm font-body hover:opacity-80 transition-opacity"
            >
              Get in Touch
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}
