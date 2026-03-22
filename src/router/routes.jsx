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
      {
        path: 'catalog',
        lazy: () => import('@/pages/catalog/route.jsx'),
      },
      {
        path: 'case-study',
        lazy: () => import('@/pages/case-study/route.jsx'),
      },
      {
        path: '*',
        lazy: () => import('@/pages/not-found/route.jsx'),
      },
    ],
  },
])
