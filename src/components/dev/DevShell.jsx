import { Link, NavLink, Outlet } from 'react-router-dom'
import { devSamples } from '@/routes/dev/samples.js'

function navClassName({ isActive }) {
  return isActive
    ? 'rounded-full border border-theme-fg px-3 py-1.5 text-xs font-medium text-theme-fg'
    : 'rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted'
}

export function DevShell() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-fg">
      <header className="border-b border-theme-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-muted">
                ayeshajm.com
              </p>
              <p className="text-lg font-semibold">Dev lab</p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted"
                to="/"
              >
                Public home
              </Link>
              <NavLink className={navClassName} end to="/dev">
                Hub
              </NavLink>
            </div>
          </div>

          <nav className="flex flex-wrap gap-2" aria-label="Dev sample routes">
            {devSamples.map((sample) => (
              <NavLink
                key={sample.slug}
                className={navClassName}
                to={`/dev/${sample.slug}`}
              >
                {sample.title}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
