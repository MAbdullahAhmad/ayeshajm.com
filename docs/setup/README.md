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

- `src/main.jsx` mounts `RouterProvider` with a boot fallback for the first lazy route resolution.
- `src/router/routes.jsx` defines the router with lazy route modules for `/`, `/catalog`, `/case-study`, and `*`.
- `src/app/AppShell.jsx` owns shared layout UI and the route-transition loader by watching `useNavigation()`.
- Page-local 3D placeholders are lazy-loaded inside the shared route-page layout to preserve chunk boundaries.
- No route data loaders or actions are part of this setup phase.

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
    catalog/
    case-study/
    not-found/
  components/
    ui/
    3d/
    loaders/
    layout/
  scenes/
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
- `public/models/` and `public/textures/` are reserved for compressed delivery assets.
- `src/scenes/` is reserved for route-level Theatre state and related scene glue.
