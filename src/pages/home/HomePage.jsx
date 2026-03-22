import { RoutePage } from '@/components/layout/RoutePage'

export function HomePage() {
  return (
    <RoutePage
      eyebrow="Home Route"
      title="Portfolio shell and routing baseline"
      description="The home route proves the eager shell, lazy route module, and lazy 3D boundary strategy before real TheatreJS timelines land."
      checklist={[
        'Vite + React CSR foundation with a single @/ import alias.',
        'Boot and route-transition loaders separated by responsibility.',
        'App shell stays eager while page modules and 3D placeholders stay lazy.',
      ]}
      sceneTitle="Home Theatre scene stub"
      scenePath="src/scenes/home/"
      sceneNote="Store future homepage state.json assets, shared camera setup, and watch sequence helpers here."
      links={[
        { to: '/catalog', label: 'Open catalog route' },
        { to: '/case-study', label: 'Open case study route' },
      ]}
    />
  )
}
