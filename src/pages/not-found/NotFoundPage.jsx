import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="flex min-h-screen flex-col justify-center gap-3 p-6 text-theme-fg">
      <p className="text-sm text-theme-muted">404</p>
      <h1 className="text-2xl font-semibold">Custom 404 page</h1>
      <p className="max-w-md text-sm text-theme-muted">
        This route does not exist yet. The final 404 experience will be designed later.
      </p>
      <Link
        className="mt-2 w-fit rounded-full border border-theme-border px-4 py-2 text-sm text-theme-fg"
        to="/"
      >
        Back home
      </Link>
    </section>
  )
}
