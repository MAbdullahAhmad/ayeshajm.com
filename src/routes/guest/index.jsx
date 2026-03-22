export const guestRoutes = [
  {
    index: true,
    lazy: () => import('@/pages/guest/home/route.jsx'),
  },
  {
    path: 'about',
    lazy: () => import('@/pages/guest/about/route.jsx'),
  },
]
