import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="route-page route-page--not-found">
      <div className="route-page__header">
        <p className="route-page__eyebrow">404</p>
        <h2>Route not found</h2>
        <p className="route-page__description">
          The router is active, but this path is not part of the current setup
          baseline.
        </p>
      </div>

      <div className="route-links">
        <Link className="route-link" to="/">
          Return home
        </Link>
        <Link className="route-link" to="/catalog">
          Open catalog route
        </Link>
      </div>
    </section>
  )
}
