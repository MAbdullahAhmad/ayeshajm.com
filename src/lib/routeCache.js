const DEFAULT_ROUTE_CACHE_TTL_MS = 30_000

function parseRouteCacheTtlMs(value) {
  const parsedValue = Number(value)

  if (!Number.isFinite(parsedValue) || parsedValue < 0) {
    return DEFAULT_ROUTE_CACHE_TTL_MS
  }

  return parsedValue
}

export const routeCacheTtlMs = parseRouteCacheTtlMs(
  import.meta.env.VITE_ROUTE_CACHE_TTL_MS
)
