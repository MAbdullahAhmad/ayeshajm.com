import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { CachedRouteViewport } from '@/components/layout/CachedRouteViewport.jsx'

export function AppShell() {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-fg flex flex-col">
      <Header />
      <main className="flex-1">
        <CachedRouteViewport />
      </main>
      <Footer />
    </div>
  )
}
