<template>
  <div class="min-h-screen flex items-center justify-center px-4 py-16">
    <div class="text-center max-w-2xl mx-auto">
      <!-- 404 Number -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold mb-4 fadein-bot" style="color: var(--accent);">
          404
        </h1>
        <div class="h-1 w-32 mx-auto mb-6" style="background-color: var(--accent);"></div>
      </div>

      <!-- Error Message -->
      <div class="mb-8 fadein-left fadeins-1">
        <h2 class="text-3xl font-bold mb-4" style="color: var(--text);">
          Page Not Found
        </h2>
        <p class="text-lg mb-6" style="color: var(--text-muted);">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <p class="text-sm mb-8" style="color: var(--text-muted);">
          Don't worry, let's get you back on track!
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center fadein-left fadeins-2">
        <router-link
          to="/"
          class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:opacity-80 hover:-translate-y-1"
          style="background-color: var(--accent); color: var(--bg);"
        >
          Go to Home
        </router-link>
        <button
          @click="goBack"
          class="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:opacity-80 hover:-translate-y-1"
          style="background-color: var(--bg-card); border: 1px solid var(--border); color: var(--text);"
        >
          Go Back
        </button>
      </div>

      <!-- Quick Links -->
      <div class="mt-12 fadein-left fadeins-3">
        <p class="text-sm mb-4" style="color: var(--text-muted);">Quick Links:</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/about"
            class="text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-80"
            style="background-color: var(--bg-card); border: 1px solid var(--border); color: var(--text-muted);"
          >
            About
          </router-link>
          <router-link
            to="/experience"
            class="text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-80"
            style="background-color: var(--bg-card); border: 1px solid var(--border); color: var(--text-muted);"
          >
            Experience
          </router-link>
          <router-link
            to="/portfolio"
            class="text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-80"
            style="background-color: var(--bg-card); border: 1px solid var(--border); color: var(--text-muted);"
          >
            Portfolio
          </router-link>
          <router-link
            to="/contact"
            class="text-sm px-4 py-2 rounded-lg transition-all duration-300 hover:opacity-80"
            style="background-color: var(--bg-card); border: 1px solid var(--border); color: var(--text-muted);"
          >
            Contact
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundView',
  methods: {
    goBack() {
      if (window.history.length > 1) {
        this.$router.go(-1);
      } else {
        this.$router.push('/');
      }
    }
  },
  mounted() {
    document.title = '404 - Page Not Found | Hani Hashmi';
  }
}
</script>

<style scoped>
.fadein-left {
  opacity: 0;
  animation: fadeInLeftAbout 0.5s ease-out forwards;
}

@keyframes fadeInLeftAbout {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.fadein-bot {
  opacity: 0;
  animation: fadeInBot 0.5s forwards;
}

@keyframes fadeInBot {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.fadeins-1 {
  animation-delay: 200ms;
}

.fadeins-2 {
  animation-delay: 400ms;
}

.fadeins-3 {
  animation-delay: 600ms;
}
</style>
