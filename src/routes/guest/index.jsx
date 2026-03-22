export const guestRoutes = [
  {
    index: true,
    handle: { cacheKey: 'home' },
    lazy: () => import('@/pages/guest/home/route.jsx'),
  },
  {
    path: 'about',
    handle: { cacheKey: 'about' },
    lazy: () => import('@/pages/guest/about/route.jsx'),
  },
]
