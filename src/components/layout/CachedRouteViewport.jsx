import { useCallback, useEffect, useRef, useState } from 'react'
import { useMatches, useOutlet } from 'react-router-dom'
import {
  routeCacheDebugEnabled,
  routeCacheMaxPages,
  routeCacheTtlMs,
} from '@/lib/routeCache.js'

function isHomeCacheKey(cacheKey) {
  return cacheKey === 'home'
}

function countNonHomeEntries(entries) {
  return entries.filter((entry) => !isHomeCacheKey(entry.cacheKey)).length
}

function getLeastRecentlyUsedInactiveEntry(entries) {
  let candidate = null

  entries.forEach((entry) => {
    if (entry.isActive || isHomeCacheKey(entry.cacheKey)) {
      return
    }

    if (!candidate || entry.lastVisitedAt < candidate.lastVisitedAt) {
      candidate = entry
    }
  })

  return candidate
}

function getActiveCacheKey(matches) {
  for (let index = matches.length - 1; index >= 0; index -= 1) {
    const cacheKey = matches[index].handle?.cacheKey

    if (cacheKey) {
      return cacheKey
    }
  }

  return null
}

export function CachedRouteViewport() {
  const outlet = useOutlet()
  const matches = useMatches()
  const activeCacheKey = getActiveCacheKey(matches)
  const [entries, setEntries] = useState([])
  const entriesRef = useRef([])
  const timersRef = useRef(new Map())
  const hasActiveEntry = entries.some(
    (entry) => entry.cacheKey === activeCacheKey
  )
  const displayEntries =
    !hasActiveEntry && activeCacheKey && outlet
      ? [...entries, { cacheKey: activeCacheKey, element: outlet }]
      : entries

  const logCacheEvent = useCallback((event, payload) => {
    if (!routeCacheDebugEnabled) {
      return
    }

    console.info('[route-cache]', event, payload)
  }, [])

  const syncDebugState = useCallback((nextEntries) => {
    if (!routeCacheDebugEnabled) {
      return
    }

    window.__routeCache = {
      activeCacheKey,
      keys: nextEntries.map((entry) => entry.cacheKey),
      nonHomeCount: countNonHomeEntries(nextEntries),
      ttlMs: routeCacheTtlMs,
      maxPages: routeCacheMaxPages,
    }
  }, [activeCacheKey])

  const commitEntries = useCallback((nextEntries) => {
    entriesRef.current = nextEntries
    setEntries(nextEntries)
    syncDebugState(nextEntries)
  }, [syncDebugState])

  const cancelEviction = useCallback((cacheKey) => {
    const timeoutId = timersRef.current.get(cacheKey)

    if (!timeoutId) {
      return
    }

    clearTimeout(timeoutId)
    timersRef.current.delete(cacheKey)
    logCacheEvent('cancel-evict', { cacheKey })
  }, [logCacheEvent])

  const evictEntry = useCallback((cacheKey, reason) => {
    cancelEviction(cacheKey)

    const currentEntries = entriesRef.current
    const nextEntries = currentEntries.filter(
      (entry) => entry.cacheKey !== cacheKey
    )

    if (nextEntries.length === currentEntries.length) {
      return
    }

    logCacheEvent(reason, { cacheKey })
    commitEntries(nextEntries)
  }, [cancelEviction, commitEntries, logCacheEvent])

  const scheduleEviction = useCallback((cacheKey) => {
    if (isHomeCacheKey(cacheKey) || timersRef.current.has(cacheKey)) {
      return
    }

    if (routeCacheTtlMs === 0) {
      evictEntry(cacheKey, 'evict-ttl')
      return
    }

    const timeoutId = window.setTimeout(() => {
      evictEntry(cacheKey, 'evict-ttl')
    }, routeCacheTtlMs)

    timersRef.current.set(cacheKey, timeoutId)
    logCacheEvent('schedule-evict', {
      cacheKey,
      ttlMs: routeCacheTtlMs,
    })
  }, [evictEntry, logCacheEvent])

  useEffect(() => {
    const timers = timersRef.current

    return () => {
      timers.forEach((timeoutId) => {
        clearTimeout(timeoutId)
      })
      timers.clear()
    }
  }, [])

  useEffect(() => {
    entriesRef.current = entries
    syncDebugState(entries)
  }, [entries, syncDebugState])

  useEffect(() => {
    if (!activeCacheKey || !outlet) {
      return
    }

    cancelEviction(activeCacheKey)

    const visitTime = Date.now()
    const previousEntries = entriesRef.current
    const nextEntries = []
    let reusedExistingEntry = false
    let mountedNewEntry = true

    previousEntries.forEach((entry) => {
      if (entry.cacheKey === activeCacheKey) {
        reusedExistingEntry = true
        mountedNewEntry = false
        nextEntries.push({
          ...entry,
          element: outlet,
          isActive: true,
          lastVisitedAt: visitTime,
        })
        return
      }

      nextEntries.push({
        ...entry,
        isActive: false,
      })
    })

    if (!reusedExistingEntry) {
      nextEntries.push({
        cacheKey: activeCacheKey,
        element: outlet,
        isActive: true,
        lastVisitedAt: visitTime,
      })
    }

    if (mountedNewEntry) {
      logCacheEvent('mount', { cacheKey: activeCacheKey })
    } else {
      logCacheEvent('reuse', { cacheKey: activeCacheKey })
    }

    if (routeCacheMaxPages === 0) {
      const immediatelyEvictedKeys = nextEntries
        .filter((entry) => !entry.isActive && !isHomeCacheKey(entry.cacheKey))
        .map((entry) => entry.cacheKey)

      immediatelyEvictedKeys.forEach((cacheKey) => {
        cancelEviction(cacheKey)
      })

      const filteredEntries = nextEntries.filter(
        (entry) => entry.isActive || isHomeCacheKey(entry.cacheKey)
      )

      if (immediatelyEvictedKeys.length > 0) {
        immediatelyEvictedKeys.forEach((cacheKey) => {
          logCacheEvent('evict-limit', {
            cacheKey,
            maxPages: routeCacheMaxPages,
          })
        })
      }

      // eslint-disable-next-line react-hooks/set-state-in-effect
      commitEntries(filteredEntries)
      return
    }

    while (countNonHomeEntries(nextEntries) > routeCacheMaxPages) {
      const lruEntry = getLeastRecentlyUsedInactiveEntry(nextEntries)

      if (!lruEntry) {
        break
      }

      cancelEviction(lruEntry.cacheKey)
      logCacheEvent('evict-limit', {
        cacheKey: lruEntry.cacheKey,
        maxPages: routeCacheMaxPages,
      })

      const entryIndex = nextEntries.findIndex(
        (entry) => entry.cacheKey === lruEntry.cacheKey
      )

      nextEntries.splice(entryIndex, 1)
    }

    nextEntries.forEach((entry) => {
      if (entry.isActive || isHomeCacheKey(entry.cacheKey)) {
        return
      }

      scheduleEviction(entry.cacheKey)
    })

    commitEntries(nextEntries)
  }, [
    activeCacheKey,
    cancelEviction,
    commitEntries,
    logCacheEvent,
    outlet,
    scheduleEviction,
  ])

  return (
    <div className="min-h-[calc(100vh-89px)]">
      {displayEntries.map((entry) => (
        <div
          key={entry.cacheKey}
          className={entry.cacheKey === activeCacheKey ? 'block' : 'hidden'}
        >
          {entry.element}
        </div>
      ))}
    </div>
  )
}
