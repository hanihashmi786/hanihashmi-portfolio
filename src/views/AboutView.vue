<script>
import { tech, tools, certifications } from '../data/skills.js'

export default {
  data() {
    return {
      activeTab: 1,
      // Shared with the CV page; see src/data/skills.js.
      tech,
      tools,
      certifications
    };
  }
}
</script>
<template>
  <!-- One root element: the page transition in App.vue needs it. -->
  <div>
  <!-- About Me Section -->
  <div class="surface px-5 py-5 md:px-12 md:py-10 text-start mx-3 mb-5 rounded-card-lg">
    <article>
      <header>
        <div class="text-2xl font-bold mb-5 fadein-bot title-section flex items-center" style="color: var(--text);">
          {{ $t('about.title') }} &nbsp;
          <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
        </div>
      </header>
      <section class="text-sm md:text-base text-justify flex flex-col md:flex-row gap-6">
        <div class="flex-shrink-0 flex justify-center md:justify-start">
          <div class="w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-2" style="border-color: var(--accent);">
            <img src="/images/profile-about.jpeg" :alt="$t('home.name')" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="flex flex-col gap-4">
          <p class="leading-relaxed fadein-left fadeins-1" style="color: var(--text-muted);">
            {{ $t('about.p1') }}
          </p>
          <p class="leading-relaxed fadein-left fadeins-2" style="color: var(--text-muted);">
            {{ $t('about.p2') }}
          </p>
        </div>
      </section>
    </article>
  </div>



  <!-- Skills Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-start mx-3 mb-5">
    <article>
      <header>
        <div class="text-2xl font-bold mb-5 fadein-bot title-section flex items-center" style="color: var(--text);">
          <div class="h-[1px] w-10 md:w-20" style="background-color: var(--accent);"></div>
          &nbsp; {{ $t('about.skills') }}
        </div>
      </header>
      <section>
        <div>
          <ul class="flex flex-wrap text-sm font-medium text-center mb-5" style="color: var(--text-muted);">
            <li class="me-2">
              <button class="inline-block px-4 py-3 rounded-lg transition-colors"
                :style="activeTab === 1 ? { color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' } : {}" @click="activeTab = 1">{{ $t('about.techStack') }}</button>
            </li>
            <li class="me-2">
              <button class="inline-block px-4 py-3 rounded-lg transition-colors"
                :style="activeTab === 2 ? { color: 'var(--accent)', backgroundColor: 'rgba(var(--accent-rgb), 0.1)' } : {}" @click="activeTab = 2">{{ $t('about.tools') }}</button>
            </li>
          </ul>
        </div>
        <div v-show="activeTab === 1">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tech" :key="item.id">
              <div class="item-tech surface flex cursor-pointer items-center gap-2 rounded-btn px-2 py-2 md:gap-3 lg:px-3"
                style="border-color: var(--accent);">
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl" style="color: transparent;">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium transition-all duration-300 translate-y-0" style="color: var(--text-secondary);">{{ item.name }}</div>
                  <div class="status-tech opacity-0 absolute mt-5 text-[10px] transition-all duration-300 md:text-xs lg:text-sm" style="color: var(--accent);">{{ $t('about.level.' + item.level) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="activeTab === 2">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8 xl:grid-cols-4 xl:gap-10 2xl:gap-12">
            <div v-for="item in tools" :key="item.id">
              <div class="item-tech surface flex cursor-pointer items-center gap-2 rounded-btn px-2 py-2 md:gap-3 lg:px-3"
                style="border-color: var(--accent);">
                <div class="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2 zoom-in">
                  <img :alt="item.name" loading="lazy" width="32" height="32" decoding="async"
                    class="img-tech drop-shadow-xl transition-all duration-300 h-[65%] w-[65%] lg:h-[85%] lg:w-[85%]"
                    :src="item.imageUrl" style="color: transparent;">
                </div>
                <div class="flex items-center text-sm md:text-base lg:text-lg">
                  <div class="tech font-medium transition-all duration-300 translate-y-0" style="color: var(--text-secondary);">{{ item.name }}</div>
                  <div class="status-tech opacity-0 absolute mt-5 text-[10px] transition-all duration-300 md:text-xs lg:text-sm" style="color: var(--accent);">{{ $t('about.toolType.' + item.type) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>

  <!-- Certifications Section -->
  <div class="px-5 py-5 md:px-12 md:py-10 text-start mx-3 mb-32">
    <article>
      <header>
        <div class="text-2xl font-bold mb-8 fadein-bot title-section flex items-center" style="color: var(--text);">
          {{ $t('about.certifications') }} &nbsp;
          <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
        </div>
      </header>
      <section>
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <div v-for="(cert, index) in certifications" :key="index"
            class="cert-card surface surface-hover rounded-card p-5">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div class="flex-grow">
                <h3 class="text-sm font-semibold" style="color: var(--text);">{{ cert.name }}</h3>
                <p class="text-xs mt-1" style="color: var(--accent);">{{ cert.issuer }}</p>
                <div class="flex items-center justify-between mt-2">
                  <span class="inline-block px-2 py-0.5 text-[10px] rounded-full" style="background-color: rgba(var(--accent-rgb), 0.1); color: var(--accent); opacity: 0.8;">{{ $t('about.certCategory.' + cert.category) }}</span>
                  <a v-if="cert.url" :href="cert.url" target="_blank" rel="noopener"
                    class="transition-opacity hover:opacity-100 flex items-center justify-center w-7 h-7 rounded-md" style="color: var(--accent); opacity: 0.6; background-color: rgba(var(--accent-rgb), 0.1);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  </div>
  </div>
</template>

<style>
/* Entrance animations (.fadein-left, .fadein-bot, .fadeins-*) live in
   src/assets/motion.css and play when the element scrolls into view. */

.img-tech,
.tech {
  transition: transform 0.3s ease;
}

.item-tech:hover .img-tech {
  transform: scale(1.3);
}

.item-tech:hover .tech {
  transform: translateY(-12px);
}

.item-tech:hover .status-tech {
  opacity: 1;
}
</style>
