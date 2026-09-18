<template>
  <Analytics />
  <CustomCursor />
  <div class="max-w-7xl mx-auto flex flex-col relative">

    <nav class="site-nav relative isolate max-w-7xl px-5 md:fixed top-0 z-[98] w-screen" style="background-color: var(--nav-surface);">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <button @click="redirectToHome" class="flex">
          <!-- Kept LTR so the wordmark always reads `name();` like code, whatever the page direction. -->
          <span class="self-center text-lg font-semibold whitespace-nowrap fadein-bot hover:opacity-80 transition-opacity" style="color: var(--accent);" dir="ltr">{{ $t('brand') }}</span>
        </button>
        <div class="flex md:order-2 items-center gap-3 fadein-bot">
          <CommandPalette />
          <LanguageSwitcher />
          <ThemePanel />
          <a href="https://github.com/hanihashmi786" target="_blank" rel="noopener">
            <img class="w-8 rounded-full gh-icon" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub">
          </a>
          <a href="https://linkedin.com/in/hanihashmi" target="_blank" rel="noopener">
            <img class="w-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn">
          </a>
        </div>
        <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
          <ul class="flex-col md:flex-row flex md:gap-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <router-link to="/"
                class="fadein-bot nav-link block ps-3 pe-4 py-2 md:p-0 transition-colors duration-300"
                aria-current="page">{{ $t('nav.home') }}</router-link>
            </li>
            <li>
              <router-link to="/about"
                class="fadein-bot fadein-1 nav-link block ps-3 pe-4 py-2 md:p-0 transition-colors duration-300">{{ $t('nav.about') }}</router-link>
            </li>
            <li>
              <router-link to="/experience"
                class="fadein-bot fadein-2 nav-link block ps-3 pe-4 py-2 md:p-0 transition-colors duration-300">{{ $t('nav.experience') }}</router-link>
            </li>
            <li>
              <router-link to="/portfolio"
                class="fadein-bot fadein-3 nav-link block ps-3 pe-4 py-2 md:p-0 transition-colors duration-300">{{ $t('nav.portfolio') }}</router-link>
            </li>
            <li>
              <router-link to="/contact"
                class="fadein-bot nav-link block ps-3 pe-4 py-2 md:p-0 transition-colors duration-300">{{ $t('nav.contact') }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="md:mt-[100px]">
      <!-- Pages cross-fade with a slight rise (see motion.css); the scroll
           to the top waits for the old page to leave (router scrollBehavior). -->
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </router-view>
    </div>
  </div>
  <footer class="block md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl border bg-opacity-80 backdrop-blur-md backdrop-opacity-90 z-[99]" style="border-color: var(--surface-bc); background-color: var(--nav-surface);">
    <nav class="flex justify-around py-4 text-xs">
      <router-link to="/" class="nav-link-mobile">{{ $t('nav.home') }}</router-link>
      <router-link to="/about" class="nav-link-mobile">{{ $t('nav.about') }}</router-link>
      <router-link to="/experience" class="nav-link-mobile">{{ $t('nav.experience') }}</router-link>
      <router-link to="/portfolio" class="nav-link-mobile">{{ $t('nav.portfolio') }}</router-link>
      <router-link to="/contact" class="nav-link-mobile">{{ $t('nav.contact') }}</router-link>
    </nav>
  </footer>
</template>

<script>
import { Analytics } from '@vercel/analytics/vue'
import CustomCursor from './components/CustomCursor.vue'
import CommandPalette from './components/CommandPalette.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import ThemePanel from './components/ThemePanel.vue'

export default {
  components: {
    Analytics,
    CustomCursor,
    CommandPalette,
    LanguageSwitcher,
    ThemePanel
  },
  methods: {
    redirectToHome() {
      this.$router.push('/')
    }
  },
}
</script>

<style>
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: var(--scrollbar-thumb);
  border-radius: 5px;
}

::-webkit-scrollbar-button { width: 20px; }

body {
  font-family: 'Poppins', sans-serif;
  background: var(--bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text-muted);
  height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Hide the default cursor on desktop while the custom one is active. Visitors
   who ask for reduced motion keep the native cursor (see CustomCursor.vue). */
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  body * {
    cursor: none !important;
  }
}

nav {
  padding: 30px;
}

/* The frosted blur lives on a pseudo-element rather than the nav itself: an
   element with backdrop-filter becomes the backdrop root for everything
   inside it, which would leave the language and theme popovers unable to
   blur the page behind them. */
.site-nav::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav-link {
  font-weight: bold;
  color: var(--nav-link);
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--text-muted);
}

.nav-link-mobile {
  color: var(--text-muted);
  transition: color 0.3s;
}

.nav-link-mobile:hover {
  color: var(--text);
}

/* The GitHub mark is black on transparent; flip it on dark schemes. */
[data-mode="dark"] .gh-icon {
  filter: invert(1);
}

nav a.router-link-exact-active {
  display: inline-flex;
  flex-direction: column;
  color: var(--nav-link-active);
  transition: color 0.3s;
}

nav a.router-link-exact-active::after {
  display: inline-block;
  content: "";
  margin-top: 0.08em;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: var(--accent);
}

nav a.router-link-exact-active:hover {
  color: var(--nav-link-active);
}
</style>
