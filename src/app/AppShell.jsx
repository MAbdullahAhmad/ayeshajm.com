import { Outlet, ScrollRestoration, useNavigation } from 'react-router-dom'
import { RouteLoader } from '@/components/loaders/RouteLoader'
import { SiteNavigation } from '@/components/ui/SiteNavigation'

export function AppShell() {
  const navigation = useNavigation()
  const isTransitioning = navigation.state !== 'idle'

  return (
    <div className="app-shell">
      <header className="shell-header">
        <div className="shell-brand">
          <p className="shell-kicker">Ayesha Jan M.</p>
          <h1>ayeshajm.com</h1>
          <p className="shell-summary">
            CSR setup baseline for a motion-heavy 3D portfolio.
          </p>
        </div>
        <SiteNavigation />
      </header>

      {isTransitioning ? (
        <RouteLoader
          label={`Loading ${
            navigation.location?.pathname || 'next route'
          }`}
        />
      ) : null}

      <main className="shell-main">
        <Outlet />
      </main>

      <footer className="shell-footer">
        <p>React + Vite + Data Router baseline for future TheatreJS scenes.</p>
        <p>
          Source-visible repository. Proprietary. No contributions accepted.
        </p>
      </footer>

      <ScrollRestoration />
    </div>
  )
}
