import { RoutePage } from '@/components/layout/RoutePage'

export function CaseStudyPage() {
  return (
    <RoutePage
      eyebrow="Case Study Route"
      title="Project brief hand-off inside the app shell"
      description="This route keeps the case-study entry point within the same CSR router so creative direction, setup assumptions, and later feature work stay aligned."
      checklist={[
        'The canonical brief remains in docs/case_study.md.',
        'This route establishes the future in-app case-study surface.',
        'No data loaders or actions are introduced during setup.',
      ]}
      sceneTitle="Shared case-study scene stub"
      scenePath="src/scenes/shared/"
      sceneNote="Reserve shared scene utilities and cross-route R3F helpers here until the actual footer/case-study experience is implemented."
      links={[
        { to: '/', label: 'Return home' },
        { to: '/catalog', label: 'Open catalog route' },
      ]}
    />
  )
}
