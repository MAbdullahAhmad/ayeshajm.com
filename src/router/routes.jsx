import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'

const devEnabled =
  import.meta.env.DEV &&
  import.meta.env.VITE_ENABLE_DEV_ROUTES === 'true'

async function getDevRoutes() {
  if (!devEnabled) {
    return []
  }

  const { devSamples } = await import('@/pages/dev/devSamples')

  return [
    {
      path: 'dev',
      lazy: () => import('@/pages/dev/layoutRoute.jsx'),
      children: [
        {
          index: true,
          lazy: () => import('@/pages/dev/indexRoute.jsx'),
        },
        ...devSamples.map((sample) => ({
          path: sample.slug,
          lazy: sample.lazy,
        })),
      ],
    },
  ]
}

export async function createAppRouter() {
  const devRoutes = await getDevRoutes()

  return createBrowserRouter([
    {
      path: '/',
      Component: AppShell,
      children: [
        {
          index: true,
          lazy: () => import('@/pages/home/route.jsx'),
        },
        ...devRoutes,
      ],
    },
  ])
}
