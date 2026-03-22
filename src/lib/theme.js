const STORAGE_KEY = 'ayeshajm-theme'
const DEFAULT_THEME = 'light'
const THEMES = new Set(['light', 'dark'])

export function initializeTheme() {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME
  }

  const storedTheme = readStoredTheme()
  const theme = THEMES.has(storedTheme) ? storedTheme : DEFAULT_THEME

  document.documentElement.dataset.theme = theme

  return theme
}

export function setTheme(theme) {
  if (!THEMES.has(theme) || typeof document === 'undefined') {
    return
  }

  document.documentElement.dataset.theme = theme

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, theme)
  }
}

export function getTheme() {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME
  }

  return document.documentElement.dataset.theme || DEFAULT_THEME
}

function readStoredTheme() {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(STORAGE_KEY)
}
