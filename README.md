# ayeshajm.com

A React + Vite portfolio project for Ayesha Jan M., prepared for CSR routing, theming, animation tooling, and future 3D scene work.

| [Documentation](./docs/README.md) | [Case Study](./docs/case_study.md) | [License](./LICENSE) |
| --- | --- | --- |

> Proprietary repository. This project is not open source, does not accept contributions, and does not accept pull requests.

## Stack

- React
- Vite
- React Router
- Tailwind CSS
- Three.js / React Three Fiber
- TheatreJS
- GSAP / Framer Motion

## Development

1. Install dependencies with `npm install`
2. Copy an env template into `.env`
3. Start the app with `npm run dev`

## Environment Files

- `.env` is the active local env file used by the project
- `.env.dev` is a development template
- `.env.prod` is a production template
- `.env.example` documents all supported options with comments
- `VITE_ROUTE_CACHE_TTL_MS` controls how long non-home pages stay cached after navigation

Recommended workflow:

```bash
cp .env.dev .env
```

## Dev-Only Routes

Development pages can be enabled with `VITE_ENABLE_DEV_ROUTES=true` in `.env`.
When enabled during local development, the router registers an internal `/dev`
lab with nested sample routes for interaction and rendering experiments. These
pages are not part of the public site IA and must not be exposed in production
builds.

## Routing Layout

- `src/routes/` owns route composition and route-group metadata
- `src/pages/` owns route modules and page UI
- `guest` currently owns `/` and `/about`
- `dev` owns the internal `/dev/*` experiment lab
