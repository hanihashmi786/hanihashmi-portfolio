// Appearance state: a colour scheme and a container style, both applied as
// attributes on <html> and read by the tokens in src/assets/tailwind.css.
// index.html applies the saved choice inline before first paint; this
// module owns it from then on.

import { reactive } from 'vue'
import { viewTransition } from '../motion/transition.js'

export const SCHEMES = [
  { id: 'gold', name: 'Gold', mode: 'dark' },
  { id: 'mono', name: 'Mono', mode: 'light' },
  { id: 'dark-mono', name: 'Dark Mono', mode: 'dark' },
  { id: 'andromeda', name: 'Andromeda', mode: 'dark' },
  { id: 'gruvbox-dark', name: 'Gruvbox Dark', mode: 'dark' },
  { id: 'gruvbox-light', name: 'Gruvbox Light', mode: 'light' },
  { id: 'monokai', name: 'Monokai', mode: 'dark' },
  { id: 'solarized-dark', name: 'Solarized Dark', mode: 'dark' },
  { id: 'solarized-light', name: 'Solarized Light', mode: 'light' },
  { id: 'vscode-dark', name: 'VS Code Dark', mode: 'dark' }
]

export const STYLES = [
  { id: 'minimal', name: 'Minimal' },
  { id: 'material', name: 'Material' },
  { id: 'brutal', name: 'Neo-Brutalism' },
  { id: 'glass', name: 'Glass' },
  { id: 'soft', name: 'Soft' }
]

const SCHEME_KEY = 'scheme'
const STYLE_KEY = 'style'
// Pre-scheme builds stored 'dark' | 'mono' under this key.
const LEGACY_KEY = 'theme'

const has = (list, id) => list.some((x) => x.id === id)

function read(key) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* storage blocked */
  }
}

function detectScheme() {
  const saved = read(SCHEME_KEY)
  if (has(SCHEMES, saved)) return saved
  return read(LEGACY_KEY) === 'mono' ? 'mono' : 'gold'
}

function detectStyle() {
  const saved = read(STYLE_KEY)
  return has(STYLES, saved) ? saved : 'minimal'
}

export const theme = reactive({ scheme: detectScheme(), style: detectStyle() })

export const schemeInfo = () => SCHEMES.find((s) => s.id === theme.scheme)
export const isDark = () => schemeInfo().mode === 'dark'

export function applyDocument() {
  const root = document.documentElement
  root.setAttribute('data-scheme', theme.scheme)
  root.setAttribute('data-mode', schemeInfo().mode)
  root.setAttribute('data-style', theme.style)
}

/**
 * Switch colour scheme. With `from` (a viewport point, normally the centre
 * of the swatch that was clicked) the new palette sweeps out from there as a
 * circle; without it, or where the View Transitions API is missing, the
 * change is immediate.
 */
export function setScheme(id, from = null) {
  if (!has(SCHEMES, id) || id === theme.scheme) return
  write(SCHEME_KEY, id)
  viewTransition(() => {
    theme.scheme = id
    applyDocument()
  }, { from })
}

export function setStyle(id) {
  if (!has(STYLES, id) || id === theme.style) return
  write(STYLE_KEY, id)
  viewTransition(() => {
    theme.style = id
    applyDocument()
  })
}

export default {
  install(app) {
    app.config.globalProperties.$theme = theme
    applyDocument()
  }
}
