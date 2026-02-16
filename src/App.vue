<template>
  <div class="max-w-7xl mx-auto flex flex-col relative">

    <nav class="max-w-7xl px-5 md:fixed top-0 z-[98] w-screen backdrop-blur-md bg-opacity-80" style="background-color: var(--nav-bg);">
      <div class="container mx-auto flex flex-wrap items-center justify-between">
        <button @click="redirectToHome" class="flex">
          <span class="self-center text-lg font-semibold whitespace-nowrap fadein-bot hover:opacity-80 transition-opacity" style="color: var(--accent);">haniHashmi();</span>
        </button>
        <div class="flex md:order-2 fadein-bot items-center gap-3">
          <!-- Theme Toggle -->
          <button @click="toggleTheme" class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:opacity-80" style="color: var(--accent);" :title="isDark ? 'Switch to Mono theme' : 'Switch to Dark theme'">
            <!-- Sun icon (shown in dark mode) -->
            <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <!-- Moon icon (shown in mono/light mode) -->
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
          <a href="https://github.com/hanihashmi786" target="_blank" rel="noopener">
            <img class="w-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" :style="{ filter: isDark ? 'invert(1)' : 'none' }">
          </a>
          <a href="https://linkedin.com/in/hanihashmi" target="_blank" rel="noopener">
            <img class="w-8 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png" alt="LinkedIn">
          </a>
        </div>
        <div class="hidden md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-3">
          <ul class="flex-col md:flex-row flex md:gap-8 mt-4 md:mt-0 md:text-sm md:font-medium">
            <li>
              <router-link to="/"
                class="fadein-bot nav-link block pl-3 pr-4 py-2 md:p-0 transition-colors duration-300"
                aria-current="page">Home</router-link>
            </li>
            <li>
              <router-link to="/about"
                class="fadein-bot fadein-1 nav-link block pl-3 pr-4 py-2 md:p-0 transition-colors duration-300">About</router-link>
            </li>
            <li>
              <router-link to="/experience"
                class="fadein-bot fadein-2 nav-link block pl-3 pr-4 py-2 md:p-0 transition-colors duration-300">Experience</router-link>
            </li>
            <li>
              <router-link to="/portfolio"
                class="fadein-bot fadein-3 nav-link block pl-3 pr-4 py-2 md:p-0 transition-colors duration-300">Portfolio</router-link>
            </li>
            <li>
              <router-link to="/contact"
                class="fadein-bot nav-link block pl-3 pr-4 py-2 md:p-0 transition-colors duration-300">Contact</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="md:mt-[100px]">
      <router-view />
    </div>
  </div>
  <footer class="block md:hidden fixed bottom-0 left-0 right-0 rounded-t-3xl border bg-opacity-80 backdrop-blur-md backdrop-opacity-90 z-[99]" style="border-color: var(--border); background-color: var(--nav-bg);">
    <nav class="flex justify-around py-4 text-xs">
      <router-link to="/" class="nav-link-mobile">Home</router-link>
      <router-link to="/about" class="nav-link-mobile">About</router-link>
      <router-link to="/experience" class="nav-link-mobile">Experience</router-link>
      <router-link to="/portfolio" class="nav-link-mobile">Portfolio</router-link>
      <router-link to="/contact" class="nav-link-mobile">Contact</router-link>
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
  color: var(--text-muted);
  height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

nav {
  padding: 30px;
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
