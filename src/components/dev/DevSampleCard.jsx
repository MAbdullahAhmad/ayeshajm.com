import { Link } from 'react-router-dom'

export function DevSampleCard({ sample }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-2xl border border-theme-border bg-theme-surface p-5">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-theme-fg">{sample.title}</h2>
        <p className="text-sm leading-6 text-theme-muted">{sample.summary}</p>
      </div>

      <p className="text-sm font-medium text-theme-fg">{sample.goal}</p>

      <Link
        className="mt-auto inline-flex w-fit items-center rounded-full border border-theme-fg px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-theme-fg"
        to={`/dev/${sample.slug}`}
      >
        Open sample
      </Link>
    </article>
  )
}
