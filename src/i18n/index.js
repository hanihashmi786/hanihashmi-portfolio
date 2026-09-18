// Lightweight i18n: a reactive locale, a `t()` lookup with English fallback,
// and `overlay()` for swapping translated copy onto the data records in
// src/data. Installed as a plugin so templates can call `$t('nav.home')`.

import { reactive } from 'vue'
import { viewTransition } from '../motion/transition.js'
import en from './locales/en.js'
import ar from './locales/ar.js'
import ur from './locales/ur.js'

export const LOCALES = [
  { code: 'en', name: 'English', native: 'English', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', native: 'العربية', dir: 'rtl' },
  { code: 'ur', name: 'Urdu', native: 'اردو', dir: 'rtl' }
]

const messages = { en, ar, ur }
const STORAGE_KEY = 'lang'

// Saved choice first, then the browser language, then English. index.html
// runs the same logic inline so the first paint already has the right `dir`.
function detect() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (messages[saved]) return saved
  } catch {
    /* storage blocked */
  }
  const nav = (navigator.language || '').slice(0, 2).toLowerCase()
  return messages[nav] ? nav : 'en'
}

export const i18n = reactive({ locale: detect() })

export const localeInfo = () => LOCALES.find((l) => l.code === i18n.locale)
export const isRtl = () => localeInfo().dir === 'rtl'

const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)

/**
 * Resolve a dotted key in the current language, falling back to English.
 * Strings interpolate `{name}` placeholders from `params`; arrays and objects
 * come back as-is.
 */
export function t(path, params) {
  let v = get(messages[i18n.locale], path)
  if (v === undefined) v = get(messages.en, path)
  if (v === undefined) return path
  if (typeof v === 'string' && params) {
    v = v.replace(/\{(\w+)\}/g, (_, k) => (params[k] ?? ''))
  }
  return v
}

/**
 * Translated fields for a data record, e.g. `overlay('projects.mrafqk')`.
 * Returns null in English (the record itself is the English copy) or when
 * the locale has nothing for that path, so callers can spread it directly.
 */
export function overlay(path) {
  if (i18n.locale === 'en') return null
  return get(messages[i18n.locale], path) || null
}

export function applyDocument() {
  const l = localeInfo()
  document.documentElement.lang = l.code
  document.documentElement.dir = l.dir
}

export function setLocale(code) {
  if (!messages[code] || code === i18n.locale) return
  try {
    localStorage.setItem(STORAGE_KEY, code)
  } catch {
    /* storage blocked */
  }
  // Cross-fade: the whole page re-renders, and possibly flips direction.
  viewTransition(() => {
    i18n.locale = code
    applyDocument()
  })
}

export default {
  install(app) {
    app.config.globalProperties.$t = t
    app.config.globalProperties.$i18n = i18n
    applyDocument()
  }
}
