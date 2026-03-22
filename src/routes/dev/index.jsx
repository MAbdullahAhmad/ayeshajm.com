import { devSamples } from './samples.js'

export function createDevRoutes() {
  return [
    {
      path: 'dev',
      lazy: () => import('@/pages/dev/layoutRoute.jsx'),
      children: [
        {
          index: true,
          handle: { cacheKey: 'dev:hub' },
          lazy: () => import('@/pages/dev/indexRoute.jsx'),
        },
        ...devSamples.map((sample) => ({
          path: sample.slug,
          handle: { cacheKey: `dev:${sample.slug}` },
          lazy: sample.lazy,
        })),
      ],
    },
  ]
}
