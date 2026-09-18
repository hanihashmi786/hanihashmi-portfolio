// Document-level transitions on top of the View Transitions API: a circular
// reveal that grows from a point (theme change) or a plain cross-fade
// (style, language). Browsers without the API, and visitors who asked for
// reduced motion, get the update applied directly.

import { nextTick } from 'vue'

const reduceMotion = () =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

let running = null

/**
 * Run `update` (sync or async; it may await nextTick so Vue's re-render is
 * part of the new snapshot) inside a view transition.
 *
 * `from` is a viewport point `{ x, y }`; when given, the new page is revealed
 * as a circle growing from it (see .vt-circle in motion.css).
 */
export function viewTransition(update, { from } = {}) {
  if (typeof document === 'undefined' || !document.startViewTransition || reduceMotion()) {
    update()
    return
  }

  // A second change before the first has finished cuts straight to it.
  if (running) running.skipTransition()

  const root = document.documentElement
  if (from) {
    const r = Math.hypot(Math.max(from.x, innerWidth - from.x), Math.max(from.y, innerHeight - from.y))
    root.style.setProperty('--vt-x', `${from.x}px`)
    root.style.setProperty('--vt-y', `${from.y}px`)
    root.style.setProperty('--vt-r', `${Math.ceil(r)}px`)
    root.classList.add('vt-circle')
  }

  const t = document.startViewTransition(async () => {
    await update()
    await nextTick()
  })
  running = t
  t.finished.finally(() => {
    root.classList.remove('vt-circle')
    if (running === t) running = null
  })
}

/** Centre of the element an event fired on, for `viewTransition({ from })`. */
export function pointOf(e) {
  const el = e && e.currentTarget
  if (!el || !el.getBoundingClientRect) return null
  const r = el.getBoundingClientRect()
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
}
