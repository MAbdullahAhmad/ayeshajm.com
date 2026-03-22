import { AppHeader } from '@/components/layout/AppHeader.jsx'
import { CachedRouteViewport } from '@/components/layout/CachedRouteViewport.jsx'

export function AppShell() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-fg">
      <AppHeader />
      <main>
        <CachedRouteViewport />
      </main>
    </div>
  )
}
