import { useEffect, useRef, useState } from 'react'
import { useMatches, useOutlet } from 'react-router-dom'
import { routeCacheTtlMs } from '@/lib/routeCache.js'

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
  const timersRef = useRef(new Map())
  const hasActiveEntry = entries.some(
    (entry) => entry.cacheKey === activeCacheKey
  )
  const displayEntries =
    !hasActiveEntry && activeCacheKey && outlet
      ? [...entries, { cacheKey: activeCacheKey, element: outlet }]
      : entries

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
    if (!activeCacheKey || !outlet) {
      return
    }

    const activeTimer = timersRef.current.get(activeCacheKey)
    if (activeTimer) {
      clearTimeout(activeTimer)
      timersRef.current.delete(activeCacheKey)
    }

    setEntries((previousEntries) => {
      const nextEntries = []
      let foundActiveEntry = false

      previousEntries.forEach((entry) => {
        if (entry.cacheKey === activeCacheKey) {
          foundActiveEntry = true
          nextEntries.push({
            ...entry,
            element: outlet,
          })
          return
        }

        nextEntries.push(entry)

        if (entry.cacheKey === 'home') {
          return
        }

        if (timersRef.current.has(entry.cacheKey)) {
          return
        }

        const timeoutId = window.setTimeout(() => {
          setEntries((currentEntries) =>
            currentEntries.filter(
              (currentEntry) => currentEntry.cacheKey !== entry.cacheKey
            )
          )
          timersRef.current.delete(entry.cacheKey)
        }, routeCacheTtlMs)

        timersRef.current.set(entry.cacheKey, timeoutId)
      })

      if (!foundActiveEntry) {
        nextEntries.push({
          cacheKey: activeCacheKey,
          element: outlet,
        })
      }

      return nextEntries
    })
  }, [activeCacheKey, outlet])

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
