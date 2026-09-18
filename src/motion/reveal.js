// Scroll-driven entrance animations.
//
// The views mark elements with the reveal classes below (they predate this
// module, so the class names stay). Instead of every element animating on a
// timer the moment the page mounts, this watches the DOM for those elements
// and sets `data-reveal="in"` when one scrolls into view; motion.css keys
// the animations on that attribute. When an animation finishes the element
// gets `data-reveal="done"`, which cancels it: a finished, filled animation
// would otherwise keep the element promoted, and in Chrome that makes it a
// backdrop root, which stops any frosted popover inside it from blurring
// the page.
//
// State lives in a data attribute rather than a class on purpose: Vue
// re-assigns `className` whenever a bound class changes (the active nav
// link, for one), which would silently drop a class added from here.
//
// Elements that come into view later, by scrolling, ignore the choreography
// delays meant for the first screen and stagger by batch instead. A page the
// visitor has already seen this session shows its content straight away.

const CLASSES = ['fadein-bot', 'fadein-up', 'fadein-left', 'fadein-right', 'fade-in-from-left', 'tile']
const SELECTOR = CLASSES.map((c) => '.' + c).join(',')
const STAGGER_MS = 70
const STAGGER_CAP = 8
// How long after a repeat visit new elements still appear without animating.
const INSTANT_WINDOW_MS = 1000

let io = null
let firstBatch = true
let instantUntil = 0
const seen = new Set()

const matches = (el) => el.nodeType === 1 && el.matches(SELECTOR)

function show(el, instant) {
  el.dataset.reveal = instant ? 'done' : 'in'
}

function observe(el) {
  if (!matches(el) || el.dataset.reveal) return
  if (!io) {
    show(el, true)
    return
  }
  io.observe(el)
}

function scan(node) {
  if (node.nodeType !== 1) return
  observe(node)
  node.querySelectorAll(SELECTOR).forEach(observe)
}

function forget(node) {
  if (!io || node.nodeType !== 1) return
  if (matches(node)) io.unobserve(node)
  node.querySelectorAll(SELECTOR).forEach((el) => io.unobserve(el))
}

function onIntersect(entries) {
  const hits = entries.filter((e) => e.isIntersecting)
  if (!hits.length) return
  const instant = performance.now() < instantUntil
  hits.forEach((e, i) => {
    const el = e.target
    io.unobserve(el)
    if (!firstBatch && !instant) {
      el.style.setProperty('--m-delay', `${Math.min(i, STAGGER_CAP) * STAGGER_MS}ms`)
    }
    show(el, instant)
  })
  firstBatch = false
}

function onAnimationEnd(e) {
  const el = e.target
  if (el.nodeType === 1 && el.dataset.reveal === 'in' && matches(el)) {
    el.dataset.reveal = 'done'
  }
}

/** Called on every navigation, before the new page renders. */
function onNavigate(path) {
  firstBatch = true
  instantUntil = seen.has(path) ? performance.now() + INSTANT_WINDOW_MS : 0
  seen.add(path)
}

export default {
  install(app, { router } = {}) {
    if (typeof window === 'undefined') return

    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    if ('IntersectionObserver' in window && !reduce) {
      io = new IntersectionObserver(onIntersect, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 })
    }

    document.addEventListener('animationend', onAnimationEnd)

    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.removedNodes.forEach(forget)
        r.addedNodes.forEach(scan)
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
    scan(document.body)

    if (router) {
      onNavigate(router.currentRoute.value.path)
      router.beforeEach((to, from) => {
        if (to.path !== from.path) onNavigate(to.path)
      })
    }
  }
}
