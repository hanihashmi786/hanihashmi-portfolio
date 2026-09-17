<script>
import CurrentlyWorkingOn from '../components/CurrentlyWorkingOn.vue'
import { localizedProjects, currentWork, FILTER_KEYS, statusOf } from '../data/projects.js'
import { isRtl } from '../i18n/index.js'

// The two in-flight builds get the Currently Working On block above the
// mosaic, so the mosaic lists everything else rather than repeating them.
const featuredIds = new Set(currentWork.map((p) => p.id))

export default {
  name: 'PortfolioView',
  components: { CurrentlyWorkingOn },
  data() {
    return {
      activeFilter: 'all',
      filters: FILTER_KEYS,
      broken: {},
      openId: null
    };
  },
  computed: {
    gridProjects() {
      return localizedProjects().filter((p) => !featuredIds.has(p.id));
    },
    items() {
      if (this.activeFilter === 'all') return this.gridProjects;
      return this.gridProjects.filter((p) => p.orgKey === this.activeFilter);
    },
    openItem() {
      return this.gridProjects.find((p) => p.id === this.openId) || null;
    },
    openIndex() {
      return this.items.findIndex((p) => p.id === this.openId);
    }
  },
  watch: {
    openId(id) {
      // Lock page scroll while the sheet is up.
      document.body.style.overflow = id ? 'hidden' : '';
    }
  },
  mounted() {
    window.addEventListener('keydown', this.onKey);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKey);
    document.body.style.overflow = '';
  },
  methods: {
    statusOf,
    countFor(key) {
      return key === 'all' ? this.gridProjects.length : this.gridProjects.filter((p) => p.orgKey === key).length;
    },
    stackOf(item) {
      return item.tech.split(',').map((s) => s.trim()).filter(Boolean);
    },
    open(item) {
      this.openId = item.id;
    },
    close() {
      this.openId = null;
    },
    step(dir) {
      if (!this.items.length) return;
      const i = (this.openIndex + dir + this.items.length) % this.items.length;
      this.openId = this.items[i].id;
    },
    onKey(e) {
      if (!this.openId) return;
      // Arrow keys follow reading direction: "next" is to the left under RTL.
      const fwd = isRtl() ? -1 : 1;
      if (e.key === 'Escape') this.close();
      else if (e.key === 'ArrowRight') this.step(fwd);
      else if (e.key === 'ArrowLeft') this.step(-fwd);
    },
    // Cursor-following spotlight on each tile.
    spot(e) {
      const r = e.currentTarget.getBoundingClientRect();
      e.currentTarget.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      e.currentTarget.style.setProperty('--my', (e.clientY - r.top) + 'px');
    },
    onImgError(id) {
      this.broken[id] = true;
    }
  }
}
</script>

<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-start mx-3">
    <article>
      <header class="text-center mb-12 fadein-bot">
        <h2 class="text-3xl font-bold" style="color: var(--text);">{{ $t('portfolio.title') }}</h2>
        <p class="text-base mt-1 text-transparent bg-clip-text" style="background-image: linear-gradient(to right, var(--gradient-from), var(--gradient-to));">
          {{ $t('portfolio.subtitle') }}
        </p>
      </header>

      <!-- Featured: the two builds currently in flight -->
      <CurrentlyWorkingOn class="mb-16" />

      <section>
        <div class="text-xl font-bold mb-5 flex items-center" style="color: var(--text);">
          <div class="h-[1px] w-10 md:w-20 me-3" style="background-color: var(--accent);"></div>
          {{ $t('portfolio.more') }}
        </div>

        <!-- Filter chips -->
        <div class="flex flex-wrap gap-2 mb-6" role="group" :aria-label="$t('portfolio.filterLabel')">
          <button v-for="key in filters" :key="key" type="button"
            class="filter-chip" :class="{ active: activeFilter === key }"
            :aria-pressed="activeFilter === key"
            @click="activeFilter = key">
            {{ $t('filters.' + key) }}
            <span class="filter-count">{{ countFor(key) }}</span>
          </button>
        </div>

        <!-- Mosaic -->
        <div :key="activeFilter" class="mosaic">
          <button v-for="(item, i) in items" :key="item.id" type="button"
            class="tile" :class="['tile-' + (item.size || 'md'), { 'is-featured': item.featured }]"
            :style="{ '--i': i, '--brand': item.color, '--sc': statusOf(item).color }"
            :aria-label="$t('portfolio.openDetails', { name: item.name })"
            @mousemove="spot" @click="open(item)">
            <img v-if="!broken[item.id]" class="tile-img" :src="item.image" :style="{ objectPosition: item.imagePosition }" alt="" loading="lazy" @error="onImgError(item.id)" />
            <span v-else class="tile-img tile-fallback">{{ item.name }}</span>
            <span class="tile-shade" aria-hidden="true"></span>
            <span class="tile-dim" aria-hidden="true"></span>
            <span class="tile-spot" aria-hidden="true"></span>

            <span class="tile-top">
              <span class="tile-pill tile-pill-status">
                <i class="tile-dot" aria-hidden="true"></i>
                {{ statusOf(item).label }}
              </span>
              <span class="tile-pill tile-pill-org">{{ item.org }}</span>
            </span>

            <span class="tile-body">
              <span v-if="item.featured" class="tile-kicker">
                <i class="tile-dot tile-dot-live" aria-hidden="true"></i>
                {{ $t('common.currentlyBuilding') }}
              </span>
              <span class="tile-name">{{ item.name }}</span>
              <span class="tile-tag">{{ item.tagline }}</span>

              <span class="tile-more">
                <span class="tile-more-inner">
                  <span class="tile-desc">{{ item.description }}</span>
                  <span class="tile-icons">
                    <img v-for="ic in item.icons" :key="ic.name" :src="ic.src" :alt="ic.name" :title="ic.name" loading="lazy" :class="{ 'icon-dark': ic.dark }" />
                  </span>
                </span>
              </span>

              <span v-if="item.featured && item.phases" class="tile-phases" :aria-label="$t('portfolio.progress', { phase: item.phases[item.phase] })">
                <span class="tile-phase-bar">
                  <i v-for="(ph, pi) in item.phases" :key="ph" :class="{ done: pi < item.phase, now: pi === item.phase }" :title="ph"></i>
                </span>
                <span class="tile-phase-label">{{ $t('portfolio.stepOf', { phase: item.phases[item.phase], n: item.phase + 1, total: item.phases.length }) }}</span>
              </span>
            </span>

            <span class="tile-open" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9" /></svg>
            </span>
          </button>
        </div>

        <!-- Final Year Project -->
        <div class="mt-16 mb-32">
          <div class="text-xl font-bold mb-6 flex items-center" style="color: var(--text);">
            <div class="h-[1px] w-10 md:w-20 me-3" style="background-color: var(--accent);"></div>
            {{ $t('portfolio.fyp') }}
          </div>
          <div class="fyp rounded-[22px] p-6 md:p-8" style="background-color: var(--bg-card); border: 1px solid var(--border);">
            <h3 class="text-lg font-semibold mb-2" style="color: var(--text);">{{ $t('portfolio.fypTitle') }}</h3>
            <p class="text-sm leading-relaxed mb-4" style="color: var(--text-muted);">
              {{ $t('portfolio.fypDesc') }}
            </p>
            <div class="flex items-center gap-2">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="TensorFlow" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" alt="OpenCV" class="w-5 h-5" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" alt="Flask" class="w-5 h-5 icon-dark" />
            </div>
            <div class="text-xs mt-2" style="color: var(--accent);">Python, TensorFlow/Keras, OpenCV, Flask, CNN, VGG-16, ResNet-50, Inception-V3</div>
          </div>
        </div>
      </section>
    </article>

    <!-- Detail sheet -->
    <Teleport to="body">
      <Transition name="sheet">
        <div v-if="openItem" class="sheet-backdrop" @click.self="close">
          <div class="sheet" role="dialog" aria-modal="true" :aria-label="$t('portfolio.details', { name: openItem.name })">
            <div class="sheet-cover">
              <img v-if="!broken[openItem.id]" :src="openItem.image" :style="{ objectPosition: openItem.imagePosition }" alt="" />
              <span v-else class="sheet-cover-fallback" :style="{ background: openItem.color }">{{ openItem.name }}</span>
              <span class="sheet-cover-shade" aria-hidden="true"></span>
              <span class="tile-pill tile-pill-status sheet-status" :style="{ '--sc': statusOf(openItem).color }">
                <i class="tile-dot" aria-hidden="true"></i>
                {{ statusOf(openItem).label }}
              </span>
              <button type="button" class="sheet-close" :aria-label="$t('common.close')" @click="close">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
              <img v-if="openItem.icon" class="sheet-logo" :src="openItem.icon" alt="" aria-hidden="true" />
            </div>

            <div class="sheet-body" :class="{ 'has-logo': openItem.icon }">
              <div class="sheet-head">
                <div class="min-w-0">
                  <span v-if="openItem.featured" class="tile-kicker sheet-kicker">
                    <i class="tile-dot tile-dot-live" aria-hidden="true"></i>
                    {{ $t('common.currentlyBuilding') }}
                  </span>
                  <h3 class="sheet-name">{{ openItem.name }}</h3>
                  <p class="sheet-tag">{{ openItem.tagline }}</p>
                </div>
                <span class="sheet-org">{{ openItem.org }}</span>
              </div>

              <p class="sheet-desc">{{ openItem.description }}</p>

              <div v-if="openItem.phases" class="sheet-phases">
                <ol class="sheet-steps" :aria-label="$t('portfolio.deliveryProgress', { name: openItem.name })">
                  <li v-for="(ph, pi) in openItem.phases" :key="ph" :class="{ done: pi < openItem.phase, now: pi === openItem.phase }" :aria-current="pi === openItem.phase ? 'step' : null">
                    <i aria-hidden="true"></i>
                    <span>{{ ph }}</span>
                  </li>
                </ol>
                <p v-if="openItem.statusNote" class="sheet-note">{{ openItem.statusNote }}</p>
              </div>

              <ul v-if="openItem.highlights && openItem.highlights.length" class="sheet-highlights">
                <li v-for="h in openItem.highlights" :key="h">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  <span>{{ h }}</span>
                </li>
              </ul>

              <div class="sheet-stack">
                <span v-for="s in stackOf(openItem)" :key="s" class="sheet-chip">{{ s }}</span>
              </div>

              <div class="sheet-links">
                <a v-if="openItem.demo" :href="openItem.demo" target="_blank" rel="noopener" class="sheet-link sheet-link-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                  {{ $t('portfolio.liveSite') }}
                </a>
                <a v-if="openItem.playstore" :href="openItem.playstore" target="_blank" rel="noopener" class="sheet-link">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302-2.302 2.302L15.396 12l2.302-2.492zM5.864 2.658L16.8 9.991l-2.302 2.302L5.864 3.658z" /></svg>
                  {{ $t('portfolio.googlePlay') }}
                </a>
                <span v-if="openItem.note" class="sheet-linknote">{{ openItem.note }}</span>
              </div>
            </div>

            <div class="sheet-nav">
              <button type="button" class="sheet-navbtn" :aria-label="$t('portfolio.prevProject')" @click="step(-1)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                {{ $t('common.prev') }}
              </button>
              <span class="sheet-count" dir="ltr">{{ openIndex + 1 }} / {{ items.length }}</span>
              <button type="button" class="sheet-navbtn" :aria-label="$t('portfolio.nextProject')" @click="step(1)">
                {{ $t('common.next') }}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6" /></svg>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style>
/* ---------- filter chips ---------- */
.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-muted);
  background-color: var(--bg-card);
  border: 1px solid var(--border);
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.filter-chip:hover {
  color: var(--text);
  border-color: rgba(var(--accent-rgb), 0.4);
}

.filter-chip.active {
  color: var(--accent);
  background-color: rgba(var(--accent-rgb), 0.1);
  border-color: rgba(var(--accent-rgb), 0.45);
}

.filter-count {
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.65rem;
  background-color: rgba(var(--accent-rgb), 0.12);
}

/* ---------- mosaic ---------- */
.mosaic {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-auto-rows: 172px;
  grid-auto-flow: dense;
  gap: 12px;
}

.tile-xl { grid-column: span 2; grid-row: span 2; }
.tile-lg { grid-column: span 2; grid-row: span 1; }
.tile-md { grid-column: span 1; grid-row: span 1; }

@media (min-width: 768px) {
  .mosaic {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-auto-rows: 200px;
    gap: 14px;
  }
  .tile-xl { grid-column: span 6; grid-row: span 2; }
  .tile-lg { grid-column: span 3; grid-row: span 2; }
  .tile-md { grid-column: span 3; grid-row: span 1; }
}

@media (min-width: 1024px) {
  .mosaic {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-auto-rows: 218px;
    gap: 16px;
  }
  .tile-xl { grid-column: span 6; grid-row: span 2; }
  .tile-lg { grid-column: span 4; grid-row: span 2; }
  .tile-md { grid-column: span 4; grid-row: span 1; }
}

/* ---------- tile ---------- */
@keyframes tileIn {
  from { opacity: 0; transform: translateY(18px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.tile {
  /* Tiles sit on a dark photo in both themes, so their accents stay gold
     even when the mono theme swaps the site accent to slate. */
  --ta: #ffdb70;
  --ta-rgb: 255, 219, 112;
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  isolation: isolate;
  border-radius: 22px;
  text-align: start;
  font: inherit;
  color: #fff;
  background: var(--brand, var(--bg-card));
  border: 1px solid var(--border);
  box-shadow: 0 18px 40px -28px rgba(0, 0, 0, 0.8);
  transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
  animation: tileIn 0.55s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  animation-delay: calc(var(--i, 0) * 55ms);
  -webkit-tap-highlight-color: transparent;
}

.tile:hover,
.tile:focus-visible {
  transform: translateY(-5px);
  border-color: rgba(var(--accent-rgb), 0.55);
  box-shadow: 0 30px 50px -28px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(var(--accent-rgb), 0.12);
}

.tile:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.tile-img {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.tile:hover .tile-img {
  transform: scale(1.06);
}

.tile-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  background: linear-gradient(135deg, var(--brand), rgba(0, 0, 0, 0.6));
}

.tile-shade {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to top, rgba(6, 6, 8, 0.96) 0%, rgba(6, 6, 8, 0.72) 32%, rgba(6, 6, 8, 0.18) 62%, rgba(6, 6, 8, 0.05) 100%);
}

.tile-dim {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: rgba(6, 6, 8, 0.45);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.tile:hover .tile-dim {
  opacity: 1;
}

.tile-spot {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease;
  background: radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(var(--ta-rgb), 0.22), transparent 45%);
}

.tile:hover .tile-spot {
  opacity: 1;
}

/* Rotating hairline on the two in-flight builds. */
@property --tile-angle {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes tileSpin {
  to { --tile-angle: 360deg; }
}

.tile.is-featured::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  border-radius: inherit;
  padding: 1.5px;
  background: conic-gradient(from var(--tile-angle), transparent 0deg, transparent 240deg, rgba(var(--ta-rgb), 0.95) 300deg, transparent 360deg);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: tileSpin 7s linear infinite;
}

/* top row */
.tile-top {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  right: 0.85rem;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  pointer-events: none;
}

.tile-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.62rem;
  border-radius: 999px;
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.tile-pill-org {
  text-transform: none;
  letter-spacing: 0.02em;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
}

.tile-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sc, #22c55e);
  box-shadow: 0 0 8px var(--sc, #22c55e);
}

.tile-dot-live {
  background: #22c55e;
  box-shadow: 0 0 8px #22c55e;
  animation: tilePulse 1.8s ease-out infinite;
}

@keyframes tilePulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

/* body */
.tile-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  padding: 1rem 1.05rem 1.05rem;
  padding-inline-end: 3.2rem;
  pointer-events: none;
}

.tile-kicker {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.45rem;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ta);
}

.sheet-kicker {
  color: var(--accent);
}

.tile-name {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.15;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.tile-lg .tile-name { font-size: 1.25rem; }
.tile-xl .tile-name { font-size: 1.45rem; }

.tile-tag {
  margin-top: 0.2rem;
  font-size: 0.72rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.72);
}

.tile-xl .tile-tag { font-size: 0.8rem; }

.tile-more {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.45s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.tile-more-inner {
  min-height: 0;
  overflow: hidden;
}

.tile-desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: 0.55rem;
  font-size: 0.74rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.78);
}

.tile-xl .tile-desc,
.tile-lg .tile-desc {
  -webkit-line-clamp: 3;
  font-size: 0.8rem;
}

.tile-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.6rem;
}

.tile-icons img {
  width: 18px;
  height: 18px;
  opacity: 0.9;
}

@media (hover: hover) and (pointer: fine) {
  .tile:hover .tile-more,
  .tile:focus-visible .tile-more {
    grid-template-rows: 1fr;
  }
}

/* progress on the in-flight tiles */
.tile-phases {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.7rem;
  margin-top: 0.75rem;
}

.tile-phase-bar {
  display: flex;
  gap: 4px;
  width: 128px;
  flex: none;
}

.tile-phase-bar i {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.22);
}

.tile-phase-bar i.done {
  background: var(--ta);
}

.tile-phase-bar i.now {
  background: var(--ta);
  box-shadow: 0 0 10px rgba(var(--ta-rgb), 0.9);
}

.tile-phase-label {
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
}

/* open affordance */
.tile-open {
  position: absolute;
  inset-inline-end: 0.95rem;
  bottom: 0.95rem;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.tile-open svg {
  width: 15px;
  height: 15px;
}

.tile:hover .tile-open {
  color: #111;
  background: var(--ta);
  border-color: var(--ta);
  transform: rotate(45deg);
}

/* The open arrow points into the reading direction, so it mirrors under RTL
   along with its hover spin. */
[dir="rtl"] .tile-open svg {
  transform: scaleX(-1);
}

[dir="rtl"] .tile:hover .tile-open {
  transform: rotate(-45deg);
}

/* small tiles on phones: keep the chrome light */
@media (max-width: 767px) {
  .tile-md .tile-pill-org,
  .tile-md .tile-tag {
    display: none;
  }
  .tile-md .tile-name {
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }
  .tile-xl .tile-name {
    font-size: 1.3rem;
  }
  .tile-body {
    padding: 0.85rem 0.9rem 0.9rem;
    padding-inline-end: 3rem;
  }
  .tile-md .tile-body {
    padding-inline-end: 2.5rem;
  }
  .tile-open {
    width: 30px;
    height: 30px;
    inset-inline-end: 0.8rem;
    bottom: 0.8rem;
  }
  .tile-md .tile-open {
    width: 26px;
    height: 26px;
    inset-inline-end: 0.7rem;
    bottom: 0.75rem;
  }
  .tile-md .tile-open svg {
    width: 12px;
    height: 12px;
  }
}

/* Black-on-transparent logos are invisible on dark surfaces. */
html:not([data-theme="mono"]) .icon-dark,
.tile-icons .icon-dark {
  filter: invert(1) hue-rotate(180deg);
}

/* ---------- detail sheet ---------- */
.sheet-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: rgba(0, 0, 0, 0.62);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.sheet {
  position: relative;
  width: 100%;
  max-width: 52rem;
  text-align: start;
  max-height: 92vh;
  max-height: 92dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
  background: var(--bg-card);
  border: 1px solid var(--border);
  box-shadow: 0 40px 90px -30px rgba(0, 0, 0, 0.85);
  transition: transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1);
}

@media (min-width: 768px) {
  .sheet-backdrop {
    align-items: center;
    padding: 2rem;
  }
  .sheet {
    max-height: 88vh;
    border-radius: 24px;
  }
}

.sheet-enter-active,
.sheet-leave-active {
  transition: opacity 0.28s ease;
}

.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}

.sheet-enter-from .sheet,
.sheet-leave-to .sheet {
  transform: translateY(28px) scale(0.985);
}

.sheet-cover {
  position: relative;
  flex: none;
  height: 200px;
  background: #111;
}

@media (min-width: 768px) {
  .sheet-cover {
    height: 280px;
  }
}

.sheet-cover img:not(.sheet-logo) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.sheet-cover-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #fff;
}

.sheet-cover-shade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(to top, var(--bg-card) 0%, rgba(0, 0, 0, 0) 55%);
}

.sheet-status {
  position: absolute;
  top: 1rem;
  inset-inline-start: 1rem;
}

.sheet-close {
  position: absolute;
  top: 0.9rem;
  inset-inline-end: 0.9rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  background: rgba(0, 0, 0, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: background-color 0.25s ease, transform 0.25s ease;
}

.sheet-close svg {
  width: 18px;
  height: 18px;
}

.sheet-close:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
}

.sheet-logo {
  position: absolute;
  inset-inline-start: 1.5rem;
  bottom: -24px;
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: var(--bg-card);
  border: 3px solid var(--bg-card);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.4);
}

.sheet-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 1.25rem 1.5rem 1.5rem;
}

.sheet-body.has-logo {
  padding-top: 2.2rem;
}

.sheet-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.sheet-kicker {
  margin-bottom: 0.35rem;
}

.sheet-name {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.15;
  color: var(--text);
}

.sheet-tag {
  margin-top: 0.25rem;
  font-size: 0.82rem;
  font-weight: 500;
  color: var(--accent);
}

.sheet-org {
  flex: none;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 500;
  white-space: nowrap;
  color: var(--text-muted);
  background: rgba(var(--accent-rgb), 0.07);
  border: 1px solid var(--border);
}

.sheet-desc {
  margin-top: 0.9rem;
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--text-muted);
}

/* progress stepper */
.sheet-phases {
  margin-top: 1.25rem;
  padding: 1rem 1rem 0.8rem;
  border-radius: 16px;
  background: rgba(var(--accent-rgb), 0.05);
  border: 1px solid rgba(var(--accent-rgb), 0.15);
}

.sheet-steps {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.sheet-steps li {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.sheet-steps li::before {
  content: '';
  position: absolute;
  top: 5px;
  inset-inline-start: 50%;
  width: 100%;
  height: 2px;
  background: var(--border);
}

.sheet-steps li:last-child::before {
  display: none;
}

.sheet-steps li.done::before {
  background: var(--accent);
}

.sheet-steps i {
  position: relative;
  z-index: 1;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 2px solid var(--border);
}

.sheet-steps li.done i,
.sheet-steps li.now i {
  background: var(--accent);
  border-color: var(--accent);
}

.sheet-steps li.now i {
  box-shadow: 0 0 0 4px rgba(var(--accent-rgb), 0.22);
}

.sheet-steps span {
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  line-height: 1.2;
  color: var(--text-muted);
  opacity: 0.75;
}

.sheet-steps li.done span {
  color: var(--text-secondary);
  opacity: 1;
}

.sheet-steps li.now span {
  color: var(--accent);
  opacity: 1;
}

.sheet-note {
  margin-top: 0.7rem;
  text-align: center;
  font-size: 0.74rem;
  font-style: italic;
  color: var(--text-muted);
}

.sheet-highlights {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin: 1.25rem 0 0;
  padding: 1rem 0 0;
  border-top: 1px solid var(--border);
}

.sheet-highlights li {
  display: flex;
  gap: 0.6rem;
  font-size: 0.84rem;
  line-height: 1.55;
  color: var(--text-muted);
}

.sheet-highlights svg {
  flex: none;
  width: 16px;
  height: 16px;
  margin-top: 3px;
  color: var(--accent);
}

.sheet-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 1.25rem;
}

.sheet-chip {
  padding: 0.28rem 0.62rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 500;
  color: var(--text-secondary);
  background: rgba(var(--accent-rgb), 0.08);
  border: 1px solid rgba(var(--accent-rgb), 0.18);
}

.sheet-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1.25rem;
}

.sheet-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 1rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text);
  background: var(--bg);
  border: 1px solid var(--border);
  transition: border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
}

.sheet-link svg {
  width: 15px;
  height: 15px;
}

.sheet-link:hover {
  transform: translateY(-2px);
  border-color: rgba(var(--accent-rgb), 0.5);
}

.sheet-link-primary {
  color: #111;
  background: var(--accent);
  border-color: var(--accent);
}

[data-theme="mono"] .sheet-link-primary {
  color: #fff;
}

.sheet-link-primary:hover {
  background: var(--accent);
  opacity: 0.9;
}

.sheet-linknote {
  font-size: 0.74rem;
  font-style: italic;
  color: var(--text-muted);
}

.sheet-nav {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.5rem;
  border-top: 1px solid var(--border);
  background: var(--bg-card);
}

.sheet-navbtn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.8rem;
  border-radius: 10px;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-muted);
  border: 1px solid transparent;
  transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
}

.sheet-navbtn svg {
  width: 15px;
  height: 15px;
}

[dir="rtl"] .sheet-navbtn svg {
  transform: scaleX(-1);
}

.sheet-navbtn:hover {
  color: var(--accent);
  border-color: rgba(var(--accent-rgb), 0.35);
  background: rgba(var(--accent-rgb), 0.06);
}

.sheet-count {
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  color: var(--text-muted);
}

@media (prefers-reduced-motion: reduce) {
  .tile,
  .tile.is-featured::after,
  .tile-dot-live {
    animation: none;
  }
  .tile,
  .tile-img,
  .tile-more,
  .sheet {
    transition: none;
  }
}
</style>
