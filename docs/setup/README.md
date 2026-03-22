# Setup Guide

## Baseline

This repository uses Vite with React in CSR mode. The app shell is eager, while route modules and page-local 3D placeholders are lazy-loaded through React Router Data Router.

## Installation

1. Install Node.js 22+ and `npm`.
2. Run `npm install`.
3. Start the dev server with `npm run dev`.
4. Build the production bundle with `npm run build`.

## Installed Dependencies

### Runtime

- `react`
- `react-dom`
- `react-router-dom`
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@theatre/core`
- `@theatre/r3f`
- `gsap`
- `framer-motion`

### Development

- `vite`
- `@vitejs/plugin-react`
- `eslint`
- `prettier`
- `vite-plugin-glsl`
- `@gltf-transform/cli`
- `@theatre/studio`

## Router, CSR, and Lazy Loads

- `src/main.jsx` mounts `RouterProvider` for the public app and the optional dev lab.
- `src/router/routes.jsx` always registers `/`, and only registers `/dev/*` when both `import.meta.env.DEV` and `VITE_ENABLE_DEV_ROUTES === 'true'`.
- The `/dev` namespace is a nested internal lab with a hub page plus experiment routes such as rotate-on-scroll, Theatre sequence, and R3F basics.
- Dev sample routes are lazy-loaded and kept isolated from public pages.
- Production builds must behave as if the dev routes do not exist.

## Import Alias

The project uses one canonical import alias:

- `@/*` -> `src/*`

This mapping is defined in both `vite.config.js` and `jsconfig.json`.

## Source Structure

```text
src/
  app/
  router/
  pages/
    home/
    dev/
    catalog/
    case-study/
    not-found/
  components/
    dev/
    ui/
    3d/
    loaders/
    layout/
  scenes/
    dev/
    home/
    catalog/
    shared/
  hooks/
  lib/
  assets/
  styles/
public/
  models/
  textures/
```

## Setup Notes

- Theatre Studio initializes only in development through a guarded dynamic import.
- Dev samples are enabled through `.env` and live only under `/dev`.
- `public/models/` and `public/textures/` are reserved for compressed delivery assets.
- `src/scenes/` is reserved for route-level Theatre state and related scene glue.
