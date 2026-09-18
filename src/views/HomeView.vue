<template>
  <main
    class="mt-10 md:mt-1 pb-24 md:pb-0 flex flex-col-reverse gap-8 items-center md:flex-row md:gap-16 md:justify-center min-h-[65vh] md:min-h-[80vh]">
    <div class="space-y-2 text-center md:text-start px-10 w-full md:w-auto min-w-0">
      <p class="fadein-bot" style="color: var(--accent);">{{ $t('home.greeting') }}</p>
      <h1 class="text-4xl font-bold md:text-5xl fadein-up" style="color: var(--text);">{{ $t('home.name') }}</h1>
      <div class="py-2">
        <h1
          class="typewrite text-xl font-semibold text-transparent bg-clip-text md:text-2xl fadein-up"
          style="background-image: linear-gradient(to right, var(--gradient-from), var(--gradient-to));"
          ref="typewriter">
          <span class="wrap">{{ txt }}</span>
        </h1>
      </div>
      <p class="pe-4 fade-in-from-left leading-relaxed text-sm md:text-base max-w-lg" style="color: var(--text-muted);">
        {{ $t('home.bio') }}
      </p>
      <p class="text-sm fade-in-from-left flex items-center justify-center md:justify-start gap-1 pt-2" style="color: var(--text-muted);">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        {{ $t('common.location') }}
      </p>
      <br>
      <div class="fadein-bot fade-500 flex items-center gap-3 justify-center md:justify-start">
        <router-link to="/contact"
          class="ui-btn flex items-center py-2 px-4 text-sm font-medium rounded-btn border md:py-2.5 md:px-5 focus:outline-none w-fit hover:opacity-80"
          style="color: var(--accent); border-color: var(--accent);">
          <svg xmlns="http://www.w3.org/2000/svg" class="me-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          {{ $t('home.getInTouch') }}
        </router-link>
        <router-link to="/portfolio"
          class="ui-btn flex items-center py-2 px-4 text-sm font-medium rounded-btn border md:py-2.5 md:px-5 focus:outline-none w-fit hover:opacity-80"
          style="color: var(--text); border-color: var(--surface-bc);">
          {{ $t('home.viewWork') }}
        </router-link>
      </div>

      <!-- Currently building: a slim pointer to the two builds in flight.
           The detailed cards live on the Portfolio page. -->
      <div class="now-building fadein-bot fade-700">
        <p class="nb-label">
          <span class="nb-pulse" aria-hidden="true"></span>
          {{ $t('common.currentlyBuilding') }}
        </p>
        <div class="nb-row">
          <a v-for="p in nowBuilding" :key="p.id" :href="p.website" target="_blank" rel="noopener"
            class="nb-card surface surface-hover" :style="{ '--sc': statusOf(p).color }" :title="p.tagline + ' · ' + p.websiteLabel">
            <img class="nb-icon" :src="p.icon" alt="" aria-hidden="true" />
            <span class="nb-text">
              <span class="nb-name">{{ p.name }}</span>
              <span class="nb-tag">{{ p.short }}</span>
            </span>
            <span class="nb-status">
              <span class="nb-dot" aria-hidden="true"></span>
              {{ statusOf(p).label }}
            </span>
          </a>
        </div>
      </div>
    </div>
    <div class="flex justify-center md:justify-start fadein-right">
      <div class="w-56 h-56 md:w-72 md:h-72 rounded-full border-4 pict overflow-hidden flex items-center justify-center"
        style="border-color: #000000; background-color: #000000;">
        <video
          src="/videos/welcome.mov"
          autoplay
          loop
          muted
          playsinline
          class="w-[140%] h-[140%] object-contain"
          style="transform: scale(0.7);"
          aria-label="Hani Hashmi welcome animation"
        ></video>
      </div>
    </div>
  </main>
</template>

<script>
import { localizedCurrentWork, statusOf } from '../data/projects.js'

export default {
  name: 'HomeView',
  data() {
    return {
      period: 2000,
      txt: '',
      loopNum: 0,
      isDeleting: false
    };
  },
  computed: {
    toRotate() {
      return this.$t('home.roles');
    },
    nowBuilding() {
      return localizedCurrentWork();
    }
  },
  watch: {
    // Restart the typewriter from the first role in the new language rather
    // than finishing a word that no longer exists in the list.
    '$i18n.locale'() {
      this.txt = '';
      this.loopNum = 0;
      this.isDeleting = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tick();
    });
  },
  beforeUnmount() {
    clearTimeout(this.timer);
  },
  methods: {
    statusOf,
    tick() {
      let typewriter = this.$refs.typewriter;

      if (!typewriter) {
        return;
      }

      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      this.txt = this.isDeleting ? fullTxt.substring(0, this.txt.length - 1) : fullTxt.substring(0, this.txt.length + 1);
      typewriter.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      this.timer = setTimeout(() => {
        that.tick();
      }, delta);
    },
  }
}
</script>

<style>
body {
  overflow-y: scroll;
  overflow-x: hidden;
}

.typewrite>.wrap {
  border-inline-end: 0.08em solid var(--text);
}

.pict {
  box-shadow: 0px 0px 73px -9px var(--img-glow);
  -webkit-box-shadow: 0px 0px 73px -9px var(--img-glow);
  -moz-box-shadow: 0px 0px 73px -9px var(--img-glow);
}

/* ---------- Currently building strip ---------- */
.now-building {
  /* The hero column uses space-y-2, whose sibling selector outranks this
     class, so the breathing room above the strip has to be forced. */
  margin-top: 2.5rem !important;
  padding-top: 1.4rem;
  border-top: 1px solid var(--border);
}

.nb-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
}

.nb-pulse {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: nbPulse 1.8s ease-out infinite;
}

@keyframes nbPulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55); }
  70% { box-shadow: 0 0 0 7px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.nb-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 0.75rem;
}

.nb-card {
  display: inline-flex;
  align-items: center;
  min-width: 0;
  max-width: 100%;
  gap: 0.65rem;
  padding: 0.5rem;
  padding-inline: 0.55rem 0.75rem;
  border-radius: var(--r-card);
  text-align: start;
}

.nb-icon {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  flex: none;
}

.nb-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  min-width: 0;
}

.nb-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text);
}

.nb-tag {
  margin-top: 2px;
  font-size: 0.66rem;
  color: var(--text-muted);
  white-space: nowrap;
}

.nb-status {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin-inline-start: 0.35rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--text-muted);
  border: 1px solid var(--border);
}

.nb-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sc);
  box-shadow: 0 0 6px var(--sc);
}

@media (min-width: 768px) {
  .nb-label,
  .nb-row {
    justify-content: flex-start;
  }
}

/* Phones: one full-width card per row, status pill pushed to the edge and
   the tagline truncating instead of overflowing the viewport. */
@media (max-width: 640px) {
  .nb-card {
    width: 100%;
    max-width: 100%;
  }

  .nb-text {
    flex: 1;
  }

  .nb-tag {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .nb-status {
    margin-inline-start: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nb-pulse {
    animation: none;
  }
}

/* Entrance animations (.fadein-*, .fade-in-from-left) live in
   src/assets/motion.css and play when the element scrolls into view. */
</style>
