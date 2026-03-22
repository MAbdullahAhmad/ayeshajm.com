import { NavLink } from 'react-router-dom'
import { devRoutesEnabled } from '@/lib/devRoutes.js'

function navClassName({ isActive }) {
  return isActive
    ? 'rounded-full border border-theme-fg px-3 py-1.5 text-xs font-medium text-theme-fg'
    : 'rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted'
}

export function AppHeader() {
  return (
    <header className="border-b border-theme-border">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-muted">
            ayeshajm.com
          </p>
          <p className="text-sm text-theme-muted">Shared app shell</p>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Primary">
          <NavLink className={navClassName} end to="/">
            Home
          </NavLink>
          <NavLink className={navClassName} to="/about">
            About
          </NavLink>
          {devRoutesEnabled ? (
            <NavLink className={navClassName} to="/dev">
              Dev
            </NavLink>
          ) : null}
        </nav>
      </div>
    </header>
  )
}
