import { DevSampleCard } from '@/components/dev/DevSampleCard.jsx'
import { devSamples } from '@/routes/dev/samples.js'

export function DevHubPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-muted">
          Development Samples
        </p>
        <h1 className="text-3xl font-semibold text-theme-fg">
          Internal experiment lab
        </h1>
        <p className="max-w-3xl text-sm leading-6 text-theme-muted">
          These pages are for validating interaction patterns and runtime wiring.
          They are enabled only in local development when the dev routes flag is on.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {devSamples.map((sample) => (
          <DevSampleCard key={sample.slug} sample={sample} />
        ))}
      </div>
    </section>
  )
}
