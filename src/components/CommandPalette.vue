<script>
import { SCHEMES, STYLES, setScheme, setStyle, theme } from '../theme/index.js'
import { LOCALES, setLocale, i18n } from '../i18n/index.js'
import { localizedProjects, localizedCurrentWork } from '../data/projects.js'
import { profile, buildVCard, cardUrl } from '../data/profile.js'

// 24px stroke glyphs, keyed so the item lists below stay readable.
const ICONS = {
  home: 'M3 11.5L12 4l9 7.5M5 10v10h5v-6h4v6h5V10',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0',
  briefcase: 'M4 8h16v12H4zM9 8V5h6v3M4 13h16',
  grid: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  card: 'M3 6h18v12H3zM7 12h4M7 15h6M15 10h2',
  doc: 'M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8l-5-5zM14 3v5h5M9 13h6M9 17h4',
  palette: 'M12 3a9 9 0 000 18c1.2 0 1.6-.9 1.2-1.7-.5-1 .3-2.3 1.5-2.3H16a5 5 0 005-5c0-5-4-9-9-9zM7 12h.01M9.5 8h.01M14.5 8h.01M17 12h.01',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18',
  copy: 'M9 9h10v11H9zM5 15V4h10',
  phone: 'M5 4h3l2 5-2 1a11 11 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  chat: 'M21 12a8 8 0 01-11.6 7.1L4 20l1.1-4.4A8 8 0 1121 12z',
  github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0020 4.8 5.1 5.1 0 0019.9 1S18.7.7 16 2.5a13.4 13.4 0 00-7 0C6.3.7 5.1 1 5.1 1A5.1 5.1 0 005 4.8a5.4 5.4 0 00-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 009 18.1V22',
  linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
  download: 'M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3',
  external: 'M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3',
  box: 'M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5 9-5M12 13v8'
}

const PAGES = [
  { path: '/', key: 'home', icon: 'home' },
  { path: '/about', key: 'about', icon: 'user' },
  { path: '/experience', key: 'experience', icon: 'briefcase' },
  { path: '/portfolio', key: 'portfolio', icon: 'grid' },
  { path: '/contact', key: 'contact', icon: 'mail' }
]

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || '')

// Case- and accent-insensitive matching; strips Arabic harakat too.
const norm = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ًͯ-ٟ]/g, '')

export default {
  name: 'CommandPalette',
  data() {
    return {
      open: false,
      query: '',
      active: 0,
      note: '',
      icons: ICONS,
      prevOverflow: ''
    }
  },
  computed: {
    hint() {
      return isMac ? '⌘K' : 'Ctrl K'
    },
    groups() {
      const t = this.$t
      // Read so the lists rebuild when language, scheme or style change.
      void i18n.locale
      const scheme = theme.scheme
      const style = theme.style
      const featured = new Set(localizedCurrentWork().map((p) => p.id))

      const pages = PAGES.map((p) => ({
        id: 'page:' + p.key,
        icon: p.icon,
        label: t('nav.' + p.key),
        run: () => this.$router.push(p.path)
      }))
      pages.push({ id: 'page:card', icon: 'card', label: t('titles.card'), run: () => this.$router.push('/card') })
      pages.push({ id: 'page:cv', icon: 'doc', label: t('cv.view'), keys: 'cv resume pdf', run: () => this.$router.push('/cv') })

      const projects = localizedProjects().map((p) => ({
        id: 'project:' + p.id,
        icon: featured.has(p.id) ? 'external' : 'box',
        label: p.name,
        sub: p.tagline,
        keys: p.org + ' ' + p.tech,
        run: () => {
          const live = localizedCurrentWork().find((w) => w.id === p.id)
          if (live) window.open(live.website, '_blank', 'noopener')
          else this.$router.push({ path: '/portfolio', query: { p: p.id } })
        }
      }))

      const links = [
        { id: 'copy-email', icon: 'copy', label: t('cmd.copyEmail'), sub: profile.email, keep: true, run: () => this.copyEmail() },
        { id: 'whatsapp', icon: 'chat', label: t('cmd.whatsapp'), sub: profile.phoneDisplay, run: () => window.open(profile.whatsapp, '_blank', 'noopener') },
        { id: 'call', icon: 'phone', label: t('cmd.call'), sub: profile.phoneDisplay, run: () => (location.href = 'tel:' + profile.phone) },
        { id: 'vcf', icon: 'download', label: t('cmd.saveContact'), run: () => this.saveVCard() },
        { id: 'github', icon: 'github', label: t('cmd.github'), sub: 'github.com/hanihashmi786', run: () => window.open(profile.github, '_blank', 'noopener') },
        { id: 'linkedin', icon: 'linkedin', label: t('cmd.linkedin'), sub: 'linkedin.com/in/hanihashmi', run: () => window.open(profile.linkedin, '_blank', 'noopener') }
      ]

      const appearance = [
        ...SCHEMES.map((s) => ({
          id: 'scheme:' + s.id,
          icon: 'palette',
          label: t('cmd.theme') + ' · ' + s.name,
          current: s.id === scheme,
          keep: true,
          run: (from) => setScheme(s.id, from)
        })),
        ...STYLES.map((s) => ({
          id: 'style:' + s.id,
          icon: 'layers',
          label: t('cmd.style') + ' · ' + s.name,
          current: s.id === style,
          keep: true,
          run: () => setStyle(s.id)
        }))
      ]

      const language = LOCALES.map((l) => ({
        id: 'lang:' + l.code,
        icon: 'globe',
        label: l.native,
        sub: l.name,
        lang: l.code,
        current: l.code === i18n.locale,
        run: () => setLocale(l.code)
      }))

      return [
        { key: 'pages', label: t('cmd.pages'), items: pages },
        { key: 'projects', label: t('cmd.projects'), items: projects },
        { key: 'links', label: t('cmd.links'), items: links },
        { key: 'appearance', label: t('cmd.appearance'), items: appearance },
        { key: 'language', label: t('cmd.language'), items: language }
      ]
    },
    filtered() {
      const q = norm(this.query).trim()
      if (!q) return this.groups
      const words = q.split(/\s+/)
      return this.groups
        .map((g) => ({
          ...g,
          items: g.items.filter((it) => {
            const hay = norm([it.label, it.sub, it.keys, g.label].join(' '))
            return words.every((w) => hay.includes(w))
          })
        }))
        .filter((g) => g.items.length)
    },
    flat() {
      return this.filtered.flatMap((g) => g.items)
    }
  },
  watch: {
    query() {
      this.active = 0
    },
    open(v) {
      if (v) {
        this.query = ''
        this.active = 0
        this.note = ''
        this.prevOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        this.$nextTick(() => this.$refs.input && this.$refs.input.focus())
      } else {
        document.body.style.overflow = this.prevOverflow
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onGlobalKey)
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onGlobalKey)
    if (this.open) document.body.style.overflow = this.prevOverflow
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    close() {
      this.open = false
    },
    indexOf(item) {
      return this.flat.indexOf(item)
    },
    onGlobalKey(e) {
      if ((e.ctrlKey || e.metaKey) && !e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        this.toggle()
      }
    },
    onKey(e) {
      const n = this.flat.length
      if (e.key === 'Escape') {
        e.preventDefault()
        this.close()
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault()
        if (!n) return
        const d = e.key === 'ArrowDown' ? 1 : -1
        this.active = (this.active + d + n) % n
        this.scrollActiveIntoView()
      } else if (e.key === 'Enter') {
        e.preventDefault()
        const item = this.flat[this.active]
        if (item) this.run(item, this.active)
      }
    },
    scrollActiveIntoView() {
      this.$nextTick(() => {
        const el = this.$refs.list && this.$refs.list.querySelector('[data-idx="' + this.active + '"]')
        if (el) el.scrollIntoView({ block: 'nearest' })
      })
    },
    run(item, idx) {
      // Theme changes sweep out from the row that was picked.
      const row = this.$refs.list && this.$refs.list.querySelector('[data-idx="' + idx + '"]')
      let from = null
      if (row) {
        const r = row.getBoundingClientRect()
        from = { x: r.left + r.width / 2, y: r.top + r.height / 2 }
      }
      item.run(from)
      // Appearance and copy actions keep the palette open so a visitor can
      // try several in a row; everything else is a destination.
      if (!item.keep) this.close()
    },
    async copyEmail() {
      try {
        await navigator.clipboard.writeText(profile.email)
        this.flash(this.$t('cmd.emailCopied'))
      } catch {
        this.flash(profile.email)
      }
    },
    flash(msg) {
      this.note = msg
      clearTimeout(this.noteTimer)
      this.noteTimer = setTimeout(() => (this.note = ''), 1600)
    },
    saveVCard() {
      const blob = new Blob([buildVCard({ compact: false, url: cardUrl() })], { type: 'text/vcard;charset=utf-8' })
      const href = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = href
      a.download = 'Hani-Hashmi.vcf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(href)
    }
  }
}
</script>

<template>
  <div class="cmd-root">
    <button
      type="button"
      class="cmd-btn"
      :aria-label="$t('cmd.open')"
      :title="$t('cmd.open') + ' (' + hint + ')'"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="toggle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
      </svg>
      <span class="cmd-btn-kbd" dir="ltr" aria-hidden="true">{{ hint }}</span>
    </button>

    <Teleport to="body">
      <Transition name="cmd">
        <div v-if="open" class="cmd-backdrop" @click.self="close">
          <div class="cmd surface" role="dialog" aria-modal="true" :aria-label="$t('cmd.open')" @keydown="onKey">
            <div class="cmd-search">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref="input"
                v-model="query"
                class="cmd-input"
                type="text"
                :placeholder="$t('cmd.placeholder')"
                autocomplete="off"
                autocorrect="off"
                spellcheck="false"
                role="combobox"
                aria-controls="cmd-list"
                :aria-expanded="true"
                :aria-activedescendant="flat.length ? 'cmd-opt-' + active : null"
              />
              <kbd class="cmd-kbd" dir="ltr">Esc</kbd>
            </div>

            <div id="cmd-list" ref="list" class="cmd-list" role="listbox">
              <template v-for="g in filtered" :key="g.key">
                <p class="cmd-group">{{ g.label }}</p>
                <button
                  v-for="item in g.items"
                  :key="item.id"
                  :id="'cmd-opt-' + indexOf(item)"
                  type="button"
                  class="cmd-item"
                  :class="{ 'is-active': indexOf(item) === active }"
                  role="option"
                  :aria-selected="indexOf(item) === active"
                  :data-idx="indexOf(item)"
                  :lang="item.lang"
                  @mousemove="active = indexOf(item)"
                  @click="run(item, indexOf(item))"
                >
                  <span class="cmd-icon" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path :d="icons[item.icon]" /></svg>
                  </span>
                  <span class="cmd-text">
                    <span class="cmd-label">{{ item.label }}</span>
                    <span v-if="item.sub" class="cmd-sub" dir="auto">{{ item.sub }}</span>
                  </span>
                  <svg v-if="item.current" class="cmd-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 13l4 4L19 7" /></svg>
                </button>
              </template>
              <p v-if="!flat.length" class="cmd-empty">{{ $t('cmd.empty', { q: query }) }}</p>
            </div>

            <div class="cmd-foot" aria-live="polite">
              <span v-if="note" class="cmd-note">{{ note }}</span>
              <template v-else>
                <span><kbd class="cmd-kbd" dir="ltr">↑↓</kbd> {{ $t('cmd.navigate') }}</span>
                <span><kbd class="cmd-kbd" dir="ltr">↵</kbd> {{ $t('cmd.select') }}</span>
                <span><kbd class="cmd-kbd" dir="ltr">Esc</kbd> {{ $t('cmd.close') }}</span>
              </template>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
/* Unscoped: the panel is teleported to <body>. Every class is cmd-prefixed. */

.cmd-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  height: 32px;
  padding: 0 0.6rem 0 0.55rem;
  border-radius: 999px;
  font-size: 0.66rem;
  font-weight: 600;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.cmd-btn svg {
  width: 15px;
  height: 15px;
  flex: none;
}

.cmd-btn-kbd {
  font-family: 'Poppins', sans-serif;
  letter-spacing: 0.04em;
  line-height: 1;
  opacity: 0.85;
}

.cmd-btn:hover {
  color: var(--accent);
  border-color: rgba(var(--accent-rgb), 0.5);
}

.cmd-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Phones: icon only, same size as the buttons beside it. */
@media (max-width: 480px) {
  .cmd-btn {
    width: 32px;
    padding: 0;
    justify-content: center;
  }

  .cmd-btn-kbd {
    display: none;
  }
}

.cmd-backdrop {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 12vh 1rem 1rem;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.cmd {
  display: flex;
  flex-direction: column;
  width: min(38rem, 100%);
  max-height: min(70vh, 40rem);
  overflow: hidden;
  border-radius: var(--r-card-lg);
  text-align: start;
}

.cmd-search {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  border-bottom: 1px solid var(--border);
}

.cmd-search > svg {
  width: 18px;
  height: 18px;
  flex: none;
  color: var(--accent);
}

.cmd-input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  outline: 0;
  font: inherit;
  font-size: 0.95rem;
  color: var(--text);
}

.cmd-input::placeholder {
  color: var(--text-muted);
  opacity: 0.8;
}

.cmd-kbd {
  display: inline-block;
  padding: 0.15rem 0.4rem;
  border-radius: 6px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  line-height: 1.3;
  color: var(--text-muted);
  background: rgba(var(--accent-rgb), 0.06);
  border: 1px solid var(--border);
}

/* No scrollbar-width here: setting it would switch off the site's slim
   ::-webkit-scrollbar styling (App.vue) inside the list. */
.cmd-list {
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.5rem;
}

.cmd-group {
  margin: 0.5rem 0.7rem 0.3rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.cmd-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.5rem 0.7rem;
  border-radius: calc(var(--r-btn) - 2px);
  text-align: start;
  color: var(--text-secondary);
  transition: background-color 0.15s ease, color 0.15s ease;
}

.cmd-item.is-active {
  background: rgba(var(--accent-rgb), 0.1);
  color: var(--text);
}

.cmd-icon {
  display: grid;
  place-items: center;
  flex: none;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  color: var(--accent);
  background: rgba(var(--accent-rgb), 0.08);
}

.cmd-icon svg {
  width: 15px;
  height: 15px;
}

.cmd-text {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  min-width: 0;
  flex: 1;
}

.cmd-label {
  font-size: 0.86rem;
  font-weight: 500;
}

.cmd-sub {
  font-size: 0.7rem;
  color: var(--text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cmd-check {
  flex: none;
  width: 15px;
  height: 15px;
  color: var(--accent);
}

.cmd-empty {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.cmd-foot {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem 1rem;
  padding: 0.6rem 1.1rem;
  border-top: 1px solid var(--border);
  font-size: 0.68rem;
  color: var(--text-muted);
}

.cmd-foot span {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

.cmd-note {
  color: var(--accent);
  font-weight: 600;
}

/* Urdu's Nastaliq sits low; give rows a touch more height. */
html[lang="ur"] .cmd-label {
  line-height: 1.7;
}

.cmd-enter-active,
.cmd-leave-active {
  transition: opacity 0.2s ease;
}

.cmd-enter-active .cmd,
.cmd-leave-active .cmd {
  transition: transform 0.2s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.cmd-enter-from,
.cmd-leave-to {
  opacity: 0;
}

.cmd-enter-from .cmd,
.cmd-leave-to .cmd {
  transform: translateY(-10px) scale(0.98);
}

@media (max-width: 640px) {
  .cmd-backdrop {
    padding: 4.5rem 0.75rem 0.75rem;
  }

  .cmd {
    max-height: calc(100vh - 6rem);
    max-height: calc(100dvh - 6rem);
  }

  .cmd-foot {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cmd-enter-active,
  .cmd-leave-active,
  .cmd-enter-active .cmd,
  .cmd-leave-active .cmd {
    transition: none;
  }
}
</style>
