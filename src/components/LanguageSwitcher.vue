<script>
import { LOCALES, setLocale } from '../i18n/index.js'

export default {
  name: 'LanguageSwitcher',
  data() {
    return {
      locales: LOCALES,
      open: false
    }
  },
  computed: {
    current() {
      return this.locales.find((l) => l.code === this.$i18n.locale)
    }
  },
  mounted() {
    document.addEventListener('pointerdown', this.onOutside)
    document.addEventListener('keydown', this.onKey)
  },
  beforeUnmount() {
    document.removeEventListener('pointerdown', this.onOutside)
    document.removeEventListener('keydown', this.onKey)
  },
  methods: {
    toggle() {
      this.open = !this.open
      if (this.open) this.$nextTick(() => this.focusItem(this.locales.indexOf(this.current)))
    },
    close(refocus = false) {
      if (!this.open) return
      this.open = false
      if (refocus) this.$refs.trigger.focus()
    },
    choose(code) {
      setLocale(code)
      this.close(true)
    },
    // DOM order rather than a v-for ref array, whose order Vue does not
    // guarantee; arrow keys need the menu's visual order.
    items() {
      return Array.from(this.$el.querySelectorAll('.lang-item'))
    },
    focusItem(i) {
      const items = this.items()
      const n = items.length
      if (!n) return
      items[((i % n) + n) % n].focus()
    },
    onOutside(e) {
      if (!this.$el.contains(e.target)) this.close()
    },
    onKey(e) {
      if (!this.open) return
      if (e.key === 'Escape') {
        e.preventDefault()
        this.close(true)
        return
      }
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      e.preventDefault()
      const at = this.items().indexOf(document.activeElement)
      this.focusItem(at + (e.key === 'ArrowDown' ? 1 : -1))
    }
  }
}
</script>

<template>
  <div class="lang">
    <button
      ref="trigger"
      type="button"
      class="lang-btn"
      :class="{ 'is-open': open }"
      :aria-label="$t('nav.language')"
      :title="$t('nav.language')"
      aria-haspopup="menu"
      :aria-expanded="open"
      @click="toggle"
    >
      <!-- "Translate" glyph: 文 beside a Latin A -->
      <svg class="lang-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
      </svg>
      <span class="lang-code" dir="ltr">{{ current.code.toUpperCase() }}</span>
      <svg class="lang-chev" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <Transition name="lang-pop">
      <ul v-if="open" class="lang-menu surface" role="menu" :aria-label="$t('nav.language')">
        <li v-for="l in locales" :key="l.code" role="none">
          <button
            type="button"
            class="lang-item"
            :class="{ active: l.code === current.code }"
            role="menuitemradio"
            :aria-checked="l.code === current.code"
            :lang="l.code"
            @click="choose(l.code)"
          >
            <span class="lang-native">{{ l.native }}</span>
            <span class="lang-name" lang="en" dir="ltr">{{ l.name }}</span>
            <svg v-if="l.code === current.code" class="lang-check" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.lang {
  position: relative;
}

.lang-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  height: 32px;
  padding: 0 0.55rem 0 0.5rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  color: var(--text-muted);
  background: var(--bg-card);
  border: 1px solid var(--border);
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.lang-btn svg {
  width: 16px;
  height: 16px;
  flex: none;
}

.lang-btn .lang-icon {
  width: 17px;
  height: 17px;
}

.lang-btn .lang-chev {
  width: 12px;
  height: 12px;
  opacity: 0.7;
  transition: transform 0.25s ease;
}

.lang-btn:hover,
.lang-btn.is-open {
  color: var(--accent);
  border-color: rgba(var(--accent-rgb), 0.5);
}

.lang-btn.is-open .lang-chev {
  transform: rotate(180deg);
}

.lang-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* The code is Latin in every language, so it keeps its own direction and
   Poppins rather than inheriting the page script's font. */
.lang-code {
  font-family: 'Poppins', sans-serif;
  line-height: 1;
}

.lang-menu {
  position: absolute;
  top: calc(100% + 10px);
  inset-inline-end: 0;
  z-index: 20;
  min-width: 11rem;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: var(--r-card);
  transform-origin: top;
}

.lang-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  padding: 0.5rem 0.65rem;
  border-radius: 9px;
  text-align: start;
  color: var(--text-secondary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.lang-item:hover,
.lang-item:focus-visible {
  background: rgba(var(--accent-rgb), 0.08);
  color: var(--text);
  outline: none;
}

.lang-item.active {
  color: var(--accent);
}

.lang-native {
  flex: 1;
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.5;
}

.lang-name {
  font-family: 'Poppins', sans-serif;
  font-size: 0.66rem;
  font-weight: 500;
  color: var(--text-muted);
  opacity: 0.8;
}

.lang-check {
  width: 14px;
  height: 14px;
  flex: none;
}

/* Urdu's Nastaliq sits low; nudge the row so it centres visually. */
.lang-item[lang='ur'] .lang-native {
  font-size: 0.92rem;
  padding-bottom: 2px;
}

/* Phones: the top bar is tight, so the trigger collapses to a round globe the
   same size as the theme toggle beside it. */
@media (max-width: 480px) {
  .lang-btn {
    width: 32px;
    padding: 0;
    justify-content: center;
  }

  .lang-code,
  .lang-chev {
    display: none;
  }
}

.lang-pop-enter-active,
.lang-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.lang-pop-enter-from,
.lang-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .lang-pop-enter-active,
  .lang-pop-leave-active,
  .lang-btn .lang-chev {
    transition: none;
  }
}
</style>
