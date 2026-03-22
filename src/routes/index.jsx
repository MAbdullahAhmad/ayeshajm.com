import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'
import { guestRoutes } from './guest/index.jsx'

const devRoutesEnabled =
  import.meta.env.DEV &&
  import.meta.env.VITE_ENABLE_DEV_ROUTES === 'true'

async function getDevRoutes() {
  if (!devRoutesEnabled) {
    return []
  }

  const { createDevRoutes } = await import('./dev/index.jsx')

  return createDevRoutes()
}

export async function createAppRouter() {
  const devRoutes = await getDevRoutes()

  return createBrowserRouter([
    {
      path: '/',
      Component: AppShell,
      children: [
        ...guestRoutes,
        ...devRoutes,
        {
          path: '*',
          handle: { cacheKey: 'not-found' },
          lazy: () => import('@/pages/not-found/route.jsx'),
        },
      ],
    },
  ])
}
