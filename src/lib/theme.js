const COOKIE_NAME = 'ayeshajm-theme'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days in seconds
const DEFAULT_THEME = import.meta.env.VITE_THEME_DEFAULT || 'light'
const THEMES = new Set(['light', 'dark'])

export function initializeTheme() {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME
  }

  const stored = readCookieTheme()
  const theme = THEMES.has(stored) ? stored : DEFAULT_THEME

  applyTheme(theme)

  return theme
}

export function setTheme(theme) {
  if (!THEMES.has(theme) || typeof document === 'undefined') {
    return
  }

  applyTheme(theme)
  writeCookieTheme(theme)
}

export function getTheme() {
  if (typeof document === 'undefined') {
    return DEFAULT_THEME
  }

  return document.documentElement.dataset.theme || DEFAULT_THEME
}

function applyTheme(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark')
}

function writeCookieTheme(theme) {
  document.cookie = `${COOKIE_NAME}=${theme}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
}

function readCookieTheme() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)ayeshajm-theme=([^;]+)/)
  return match ? match[1] : null
}
