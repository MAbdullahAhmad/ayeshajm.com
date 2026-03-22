import { RoutePage } from '@/components/layout/RoutePage'

export function CatalogPage() {
  return (
    <RoutePage
      eyebrow="Catalog Route"
      title="Lazy-loaded product catalog entry point"
      description="This route is reserved for the product orbit and catalog browsing experience, with the route module and scene placeholder split into separate chunks."
      checklist={[
        'Catalog route lives behind the data-router lazy module boundary.',
        'Public model and texture directories are pre-created for compressed assets.',
        'ThreeJS and TheatreJS dependencies are installed but not yet used for feature work.',
      ]}
      sceneTitle="Catalog orbit scene stub"
      scenePath="src/scenes/catalog/"
      sceneNote="Use this folder for the future orbiting-products setup, timeline state, and catalog-specific scene glue."
      links={[
        { to: '/', label: 'Return home' },
        { to: '/case-study', label: 'Review case study route' },
      ]}
    />
  )
}
