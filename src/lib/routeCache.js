const DEFAULT_ROUTE_CACHE_TTL_MS = 5_000
const DEFAULT_ROUTE_CACHE_MAX_PAGES = 3

function parseNonNegativeNumber(value, fallbackValue) {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return fallbackValue
  }

  return parsedValue
}

export const routeCacheTtlMs = parseNonNegativeNumber(
  import.meta.env.VITE_ROUTE_CACHE_TTL_MS,
  DEFAULT_ROUTE_CACHE_TTL_MS
)

export const routeCacheMaxPages = parseNonNegativeNumber(
  import.meta.env.VITE_ROUTE_CACHE_MAX_PAGES,
  DEFAULT_ROUTE_CACHE_MAX_PAGES
)

export const routeCacheDebugEnabled = import.meta.env.DEV
