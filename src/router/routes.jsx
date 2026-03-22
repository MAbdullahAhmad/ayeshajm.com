import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/app/AppShell'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppShell,
    children: [
      {
        index: true,
        lazy: () => import('@/pages/home/route.jsx'),
      },
    ],
  },
])
