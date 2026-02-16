<template>
  <div class="max-w-7xl mx-auto flex flex-col relative">

    <nav class="max-w-7xl px-5 md:fixed top-0 z-[98] w-screen backdrop-blur-md bg-th-bg/80">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <button @click="redirectToHome" class="flex">
          <span class="self-center text-lg text-th-fg font-semibold whitespace-nowrap fadein-bot hover:text-th-muted">haniHashmi();</span>
        </button>
        <div class="flex md:order-2 fadein-bot items-center gap-3">
          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="text-th-fg hover:text-th-accent transition-colors p-1" :title="isDark ? 'Switch to Light' : 'Switch to Dark'">
            <!-- Sun icon (shown in dark mode) -->
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon icon (shown in light mode) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <a href="https://github.com/hanihashmi786" target="_blank" rel="noopener" class="text-th-fg hover:text-th-accent transition-colors">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="22" width="22" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
          <a href="https://linkedin.com/in/hanihashmi333" target="_blank" rel="noopener" class="text-th-fg hover:text-th-accent transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        </div>
        <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
          <ul class="flex-col md:flex-row flex md:gap-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <router-link to="/"
                class="fadein-bot text-th-muted hover:text-th-fg border-b border-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0 transition-colors"
                aria-current="page">Home</router-link>
            </li>
            <li>
              <router-link to="/about"
                class="fadein-bot fadein-1 text-th-muted hover:text-th-fg border-b border-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0 transition-colors">About</router-link>
            </li>
            <li>
              <router-link to="/portfolio"
                class="fadein-bot fadein-2 text-th-muted hover:text-th-fg border-b border-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0 transition-colors">Portfolio</router-link>
            </li>
            <li>
              <router-link to="/contact"
                class="fadein-bot fadein-3 text-th-muted hover:text-th-fg border-b border-transparent md:border-0 block pl-3 pr-4 py-2 md:p-0 transition-colors">Contact</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="md:mt-[100px]">
      <router-view />
    </div>
  </div>
  <footer class="block md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl border border-th-border bg-th-bg/80 backdrop-blur-md backdrop-opacity-90 z-[99]">
  <nav class="flex justify-around py-4 text-xs">
    <router-link to="/" class="text-th-muted hover:text-th-fg transition-colors">Home</router-link>
    <router-link to="/about" class="text-th-muted hover:text-th-fg transition-colors">About</router-link>
    <router-link to="/portfolio" class="text-th-muted hover:text-th-fg transition-colors">Portfolio</router-link>
    <router-link to="/contact" class="text-th-muted hover:text-th-fg transition-colors">Contact</router-link>
  </nav>
</footer>
</template>

<script>
export default {
  data() {
    return {
      isDark: true
    }
  },
  mounted() {
    const saved = localStorage.getItem('theme');
    if (saved === 'mono') {
      this.isDark = false;
      document.documentElement.setAttribute('data-theme', 'mono');
    }
  },
  methods: {
    redirectToHome() {
      this.$router.push('/')
    },
    toggleTheme() {
      this.isDark = !this.isDark;
      if (this.isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'mono');
        localStorage.setItem('theme', 'mono');
      }
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
  color: var(--fg);
  height: 100vh;
  transition: background 0.3s ease, color 0.3s ease;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: var(--muted);
  transition: color 0.3s;
}

nav a.router-link-exact-active {
  display: inline-flex;
  flex-direction: column;
  color: var(--fg);
  transition: color 0.3s;
}

nav a.router-link-exact-active::after {
  display: inline-block;
  content: "";
  margin-top: 0.08em;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background-color: var(--highlight);
}

nav a.router-link-exact-active:hover {
  color: var(--fg);
}

@keyframes fadeInLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
