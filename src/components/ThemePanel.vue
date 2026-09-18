<script>
import { SCHEMES, STYLES, setScheme, setStyle } from '../theme/index.js'

export default {
  name: 'ThemePanel',
  data() {
    return {
      schemes: SCHEMES,
      styles: STYLES,
      open: false
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
    },
    close(refocus = false) {
      if (!this.open) return
      this.open = false
      if (refocus) this.$refs.trigger.focus()
    },
    pickScheme: setScheme,
    pickStyle: setStyle,
    onOutside(e) {
      if (!this.$el.contains(e.target)) this.close()
    },
    onKey(e) {
      if (this.open && e.key === 'Escape') {
        e.preventDefault()
        this.close(true)
      }
    }
  }
}
</script>

<template>
  <div class="tp">
    <button
      ref="trigger"
      type="button"
      class="tp-btn"
      :class="{ 'is-open': open }"
      :aria-label="$t('theme.open')"
      :title="$t('theme.open')"
      aria-haspopup="dialog"
      :aria-expanded="open"
      @click="toggle"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3a9 9 0 0 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1.01-.23-.26-.38-.61-.38-.99 0-.83.67-1.5 1.5-1.5H16c2.76 0 5-2.24 5-5 0-4.42-4.03-8-9-8zm-5.5 9c-.83 0-1.5-.67-1.5-1.5S5.67 9 6.5 9 8 9.67 8 10.5 7.33 12 6.5 12zm3-4C8.67 8 8 7.33 8 6.5S8.67 5 9.5 5s1.5.67 1.5 1.5S10.33 8 9.5 8zm5 0c-.83 0-1.5-.67-1.5-1.5S13.67 5 14.5 5s1.5.67 1.5 1.5S15.33 8 14.5 8zm3 4c-.83 0-1.5-.67-1.5-1.5S16.67 9 17.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
      </svg>
    </button>

    <Transition name="tp-pop">
      <div v-if="open" class="tp-menu surface" role="dialog" :aria-label="$t('theme.open')">
        <p class="tp-label">{{ $t('theme.scheme') }}</p>
        <ul class="tp-list" role="listbox" :aria-label="$t('theme.scheme')">
          <li v-for="s in schemes" :key="s.id" role="option" :aria-selected="s.id === $theme.scheme">
            <button type="button" class="tp-item" :class="{ active: s.id === $theme.scheme }" @click="pickScheme(s.id)">
              <span class="tp-name">{{ s.name }}</span>
              <!-- data-scheme on the swatch group resolves that palette's tokens for the dots. -->
              <span class="tp-dots" :data-scheme="s.id" aria-hidden="true">
                <i style="background: var(--bg)"></i>
                <i style="background: var(--bg-card)"></i>
                <i style="background: var(--accent)"></i>
                <i style="background: var(--text)"></i>
              </span>
            </button>
          </li>
        </ul>

        <p class="tp-label">{{ $t('theme.style') }}</p>
        <ul class="tp-list" role="listbox" :aria-label="$t('theme.style')">
          <li v-for="st in styles" :key="st.id" role="option" :aria-selected="st.id === $theme.style">
            <button type="button" class="tp-item" :class="{ active: st.id === $theme.style }" @click="pickStyle(st.id)">
              <span class="tp-name">{{ st.name }}</span>
              <!-- Same trick: data-style on the wrapper renders a tiny card in that style. -->
              <span class="tp-mini" :data-style="st.id" aria-hidden="true"><i></i></span>
            </button>
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.tp {
  position: relative;
}

.tp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  color: var(--accent);
  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
}

.tp-btn svg {
  width: 20px;
  height: 20px;
}

.tp-btn:hover {
  opacity: 0.8;
}

.tp-btn.is-open {
  background: rgba(var(--accent-rgb), 0.12);
}

.tp-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.tp-menu {
  position: absolute;
  top: calc(100% + 10px);
  inset-inline-end: 0;
  z-index: 20;
  width: min(17.5rem, calc(100vw - 2rem));
  max-height: min(82vh, 44rem);
  overflow-y: auto;
  scrollbar-width: thin;
  padding: 8px;
  border-radius: var(--r-card);
  transform-origin: top;
}

.tp-label {
  margin: 8px 10px 4px;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.tp-list {
  list-style: none;
  margin: 0 0 6px;
  padding: 0;
}

.tp-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.45rem 0.65rem;
  border-radius: calc(var(--r-btn) - 2px);
  text-align: start;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--text-secondary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.tp-item:hover,
.tp-item:focus-visible {
  background: rgba(var(--accent-rgb), 0.08);
  color: var(--text);
  outline: none;
}

.tp-item.active {
  color: var(--accent);
  font-weight: 600;
}

/* palette dots */
.tp-dots {
  display: inline-flex;
  gap: 5px;
  flex: none;
}

.tp-dots i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.35);
}

/* style preview: a card rendered with that style's own tokens, scaled down */
.tp-mini {
  position: relative;
  display: grid;
  place-items: center;
  flex: none;
  width: 44px;
  height: 28px;
  border-radius: 6px;
  background: linear-gradient(135deg, rgba(var(--accent-rgb), 0.25), rgba(var(--accent-rgb), 0.04));
}

.tp-mini i {
  display: block;
  width: 54px;
  height: 34px;
  transform: scale(0.56);
  border-radius: calc(var(--r-card) * 0.7);
  background: var(--surface-bg);
  border: var(--surface-bw) solid var(--surface-bc);
  box-shadow: var(--surface-shadow);
  backdrop-filter: var(--surface-blur);
  -webkit-backdrop-filter: var(--surface-blur);
}

.tp-pop-enter-active,
.tp-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.tp-pop-enter-from,
.tp-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.97);
}

@media (prefers-reduced-motion: reduce) {
  .tp-pop-enter-active,
  .tp-pop-leave-active {
    transition: none;
  }
}
</style>
