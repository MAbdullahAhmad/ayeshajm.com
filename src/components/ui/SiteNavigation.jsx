import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/catalog', label: 'Catalog' },
  { to: '/case-study', label: 'Case Study' },
]

export function SiteNavigation() {
  return (
    <nav className="site-nav" aria-label="Primary">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            isActive ? 'site-nav__link site-nav__link--active' : 'site-nav__link'
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
