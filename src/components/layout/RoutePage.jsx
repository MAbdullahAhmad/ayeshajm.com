import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { RouteLoader } from '@/components/loaders/RouteLoader'

const ScenePlaceholder = lazy(() => import('@/components/3d/ScenePlaceholder.jsx'))

export function RoutePage({
  eyebrow,
  title,
  description,
  checklist,
  sceneTitle,
  scenePath,
  sceneNote,
  links,
}) {
  return (
    <section className="route-page">
      <div className="route-page__header">
        <p className="route-page__eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="route-page__description">{description}</p>
      </div>

      <div className="route-page__grid">
        <article className="route-card">
          <h3>Setup baseline</h3>
          <ul className="route-list">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="route-card">
          <h3>Scene hand-off</h3>
          <Suspense
            fallback={
              <RouteLoader compact label="Loading the scene placeholder." />
            }
          >
            <ScenePlaceholder
              title={sceneTitle}
              scenePath={scenePath}
              note={sceneNote}
            />
          </Suspense>
        </article>
      </div>

      <div className="route-links">
        {links.map((link) => (
          <Link key={link.to} className="route-link" to={link.to}>
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  )
}
