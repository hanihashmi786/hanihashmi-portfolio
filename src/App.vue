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
          <!-- Inline marks in the current text colour: right on every scheme,
               no CDN round trip, no invert filter for dark mode. -->
          <a href="https://github.com/hanihashmi786" target="_blank" rel="noopener" class="nav-icon" aria-label="GitHub" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
          <a href="https://linkedin.com/in/hanihashmi" target="_blank" rel="noopener" class="nav-icon" aria-label="LinkedIn" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
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
            <li>
              <router-link to="/cv"
                class="fadein-bot fadein-1 nav-link block ps-3 pe-4 py-2 md:p-0 transition-colors duration-300">{{ $t('nav.cv') }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="page-host md:mt-[100px]">
      <!-- Pages cross-fade with a slight rise (see motion.css); the scroll
           to the top waits for the old page to leave (router scrollBehavior). -->
      <router-view v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </router-view>
    </div>
  </div>
  <footer class="site-footer block md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl border bg-opacity-80 backdrop-blur-md backdrop-opacity-90 z-[99]" style="border-color: var(--surface-bc); background-color: var(--nav-surface);">
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

/* GitHub / LinkedIn in the nav: same footprint as the palette button. */
.nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  color: var(--text-secondary);
  transition: color 0.25s ease, background-color 0.25s ease;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
}

.nav-icon:hover {
  color: var(--accent);
  background: rgba(var(--accent-rgb), 0.1);
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
