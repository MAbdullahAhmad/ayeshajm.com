import { NavLink, Outlet } from 'react-router-dom'
import { devSamples } from '@/routes/dev/samples.js'

function navClassName({ isActive }) {
  return isActive
    ? 'rounded-full border border-theme-fg px-3 py-1.5 text-xs font-medium text-theme-fg'
    : 'rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted'
}

export function DevShell() {
  return (
    <div className="min-h-[calc(100vh-89px)] bg-theme-bg text-theme-fg">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-muted">
            Development Samples
          </p>
          <p className="text-lg font-semibold">Dev lab</p>
        </div>

        <nav className="flex flex-wrap gap-2" aria-label="Dev sample routes">
          <NavLink className={navClassName} end to="/dev">
            Hub
          </NavLink>
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
      </section>
      <Outlet />
    </div>
  )
}
