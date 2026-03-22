let studioPromise

export function initTheatreStudio() {
  if (!import.meta.env.DEV) {
    return Promise.resolve(null)
  }

  if (studioPromise) {
    return studioPromise
  }

  studioPromise = import('@theatre/studio')
    .then(({ default: studio }) => {
      studio.initialize()
      return studio
    })
    .catch((error) => {
      console.warn('Theatre Studio failed to initialize in development.', error)
      return null
    })

  return studioPromise
}
