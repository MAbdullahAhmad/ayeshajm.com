import { Link } from 'react-router-dom'
import {
  getAdjacentDevSamples,
  getDevSample,
} from '@/routes/dev/samples.js'

export function DevSampleFrame({ slug, children }) {
  const sample = getDevSample(slug)
  const { previous, next } = getAdjacentDevSamples(slug)

  if (!sample) {
    return null
  }

  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-theme-muted">
          Dev Sample
        </p>
        <h1 className="text-3xl font-semibold text-theme-fg">{sample.title}</h1>
        <p className="max-w-3xl text-sm leading-6 text-theme-muted">
          {sample.summary}
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
        <div className="rounded-2xl border border-theme-border bg-theme-surface p-5">
          {children}
        </div>

        <aside className="space-y-4 rounded-2xl border border-theme-border bg-theme-surface p-5">
          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-theme-muted">
              What this validates
            </h2>
            <p className="text-sm leading-6 text-theme-fg">{sample.goal}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-theme-muted">
              Notes
            </h2>
            <ul className="space-y-2 text-sm leading-6 text-theme-muted">
              {sample.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              className="rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted"
              to="/dev"
            >
              Back to hub
            </Link>

            {previous ? (
              <Link
                className="rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted"
                to={`/dev/${previous.slug}`}
              >
                Prev: {previous.title}
              </Link>
            ) : null}

            {next ? (
              <Link
                className="rounded-full border border-theme-border px-3 py-1.5 text-xs font-medium text-theme-muted"
                to={`/dev/${next.slug}`}
              >
                Next: {next.title}
              </Link>
            ) : null}
          </div>
        </aside>
      </div>
    </section>
  )
}
