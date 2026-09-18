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
          {{ $t('notFound.title') }}
        </h2>
        <p class="text-lg mb-6" style="color: var(--text-muted);">
          {{ $t('notFound.desc') }}
        </p>
        <p class="text-sm mb-8" style="color: var(--text-muted);">
          {{ $t('notFound.hint') }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center fadein-left fadeins-2">
        <router-link
          to="/"
          class="ui-btn px-6 py-3 rounded-btn font-semibold border hover:opacity-80 hover:-translate-y-1"
          style="background-color: var(--accent); border-color: var(--accent); color: var(--on-accent);"
        >
          {{ $t('notFound.home') }}
        </router-link>
        <button
          @click="goBack"
          class="surface px-6 py-3 rounded-btn font-semibold hover:opacity-80 hover:-translate-y-1"
          style="color: var(--text);"
        >
          {{ $t('notFound.back') }}
        </button>
      </div>

      <!-- Quick Links -->
      <div class="mt-12 fadein-left fadeins-3">
        <p class="text-sm mb-4" style="color: var(--text-muted);">{{ $t('notFound.quickLinks') }}</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/about"
            class="surface text-sm px-4 py-2 rounded-btn hover:opacity-80"
            style="color: var(--text-muted);"
          >
            {{ $t('nav.about') }}
          </router-link>
          <router-link
            to="/experience"
            class="surface text-sm px-4 py-2 rounded-btn hover:opacity-80"
            style="color: var(--text-muted);"
          >
            {{ $t('nav.experience') }}
          </router-link>
          <router-link
            to="/portfolio"
            class="surface text-sm px-4 py-2 rounded-btn hover:opacity-80"
            style="color: var(--text-muted);"
          >
            {{ $t('nav.portfolio') }}
          </router-link>
          <router-link
            to="/contact"
            class="surface text-sm px-4 py-2 rounded-btn hover:opacity-80"
            style="color: var(--text-muted);"
          >
            {{ $t('nav.contact') }}
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
  }
}
</script>

<!-- Entrance animations (.fadein-bot, .fadein-left, .fadeins-*) live in
     src/assets/motion.css. -->
