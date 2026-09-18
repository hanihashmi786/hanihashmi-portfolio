<script>
import ExperienceCard from '../components/ExperienceCard.vue'
import { localizedExperiences, localizedEducation } from '../data/experience.js'

export default {
  components: { ExperienceCard },
  data() {
    return {
      expandedIndex: 0
    };
  },
  computed: {
    experiences() {
      return localizedExperiences();
    },
    education() {
      return localizedEducation();
    }
  },
  methods: {
    toggleExpand(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    },
    delayClass(index) {
      return 'fadeins-' + Math.min(index + 1, 5);
    }
  }
}
</script>

<template>
  <div class="px-4 py-5 md:px-8 md:py-10 mx-3">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-2" style="color: var(--text);">{{ $t('experience.title') }}</h2>
      <p class="text-sm" style="color: var(--text-muted);">{{ $t('experience.subtitle') }}</p>
    </div>

    <!-- Work Experience Section -->
    <div class="mb-16">
      <div class="text-2xl font-bold mb-10 flex items-center fadein-bot" style="color: var(--text);">
        <div class="h-[1px] w-10 md:w-20" style="background-color: var(--accent);"></div>
        &nbsp; {{ $t('experience.work') }}
      </div>

      <!-- Zigzag Timeline (Desktop) -->
      <div class="hidden md:block relative">
        <!-- Center vertical line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" style="background-color: var(--accent);"></div>

        <div v-for="(exp, index) in experiences" :key="index" class="relative mb-12" :class="['fadein-left', delayClass(index)]">
          <!-- Timeline dot -->
          <div class="absolute left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
            style="background-color: var(--accent);"
            :style="exp.current ? { boxShadow: '0 0 0 5px rgba(var(--accent-rgb), 0.25)' } : {}">
          </div>

          <!-- Start-side card (even index); the columns mirror under RTL -->
          <div v-if="index % 2 === 0" class="flex items-start">
            <div class="w-[47%] pe-8">
              <ExperienceCard :exp="exp" :expanded="expandedIndex === index" @toggle="toggleExpand(index)" />
            </div>
            <div class="w-[6%]"></div>
            <div class="w-[47%]"></div>
          </div>

          <!-- End-side card (odd index) -->
          <div v-else class="flex items-start">
            <div class="w-[47%]"></div>
            <div class="w-[6%]"></div>
            <div class="w-[47%] ps-8">
              <ExperienceCard :exp="exp" :expanded="expandedIndex === index" @toggle="toggleExpand(index)" />
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Timeline (stacked) -->
      <div class="md:hidden relative">
        <div class="absolute start-4 top-0 bottom-0 w-[2px]" style="background-color: rgba(var(--accent-rgb), 0.3);"></div>
        <div v-for="(exp, index) in experiences" :key="'m'+index" class="relative mb-6 ms-10" :class="['fadein-left', delayClass(index)]">
          <div class="absolute -start-[1.75rem] top-4 w-3 h-3 rounded-full" style="background-color: var(--accent);"
            :style="exp.current ? { boxShadow: '0 0 0 4px rgba(var(--accent-rgb), 0.2)' } : {}"></div>
          <ExperienceCard :exp="exp" :expanded="expandedIndex === index" compact @toggle="toggleExpand(index)" />
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div class="mb-32">
      <div class="text-2xl font-bold mb-10 flex items-center fadein-bot" style="color: var(--text);">
        {{ $t('experience.education') }} &nbsp;
        <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
      </div>

      <div class="surface rounded-card p-6 md:p-8 fadein-left fadeins-1">
        <div class="flex flex-col md:flex-row md:items-start gap-5">
          <!-- Education icon -->
          <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div class="flex-grow">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 class="text-xl font-bold" style="color: var(--text);">{{ education.degree }}</h3>
                <p class="text-sm mt-1" style="color: var(--accent);">{{ education.institution }}</p>
              </div>
              <div class="text-start md:text-end mt-2 md:mt-0">
                <span class="inline-block px-3 py-1 text-xs rounded-full" style="background-color: rgba(var(--accent-rgb), 0.1); color: var(--accent);">{{ education.period }}</span>
                <p class="text-xs mt-1 flex items-center gap-1 md:justify-end" style="color: var(--text-muted);">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {{ education.location }}
                </p>
              </div>
            </div>
            <!-- Key Highlights heading -->
            <div class="pt-6 mt-4" style="border-top: 1px solid var(--border);">
              <div class="flex items-center justify-center gap-2 mb-6 fadein-left fadeins-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
                <h4 class="text-base font-bold" style="color: var(--text);">{{ $t('experience.keyHighlights') }}</h4>
              </div>
              <!-- Highlight cards grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="(h, hi) in education.highlights" :key="hi"
                  :class="['rounded-card p-5 text-center transition-all duration-300 hover:-translate-y-1 fadein-left', hi === 0 ? 'fadeins-3' : hi === 1 ? 'fadeins-4' : 'fadeins-5']"
                  style="background-color: var(--bg); border: 1px solid rgba(var(--accent-rgb), 0.2);">
                  <!-- Medal/ribbon icon -->
                  <div class="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3" style="background-color: rgba(var(--accent-rgb), 0.1);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                      <circle cx="12" cy="8" r="6" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8.5 14l-1.5 8 5-3 5 3-1.5-8" />
                    </svg>
                  </div>
                  <p class="text-sm leading-relaxed" style="color: var(--text-muted);">{{ h }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
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

@keyframes fadeInLeftAboutRtl {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

[dir="rtl"] .fadein-left {
  animation-name: fadeInLeftAboutRtl;
}

.fadein-bot {
  opacity: 0;
  animation: fadeInBot 0.5s forwards;
}

/* Same keyframes as HomeView; ends on `transform: none` so the nav's
   popovers can still blur the page (see the note there). */
@keyframes fadeInBot {
  from {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.fadeins-1 {
  animation-delay: 300ms;
}

.fadeins-2 {
  animation-delay: 600ms;
}

.fadeins-3 {
  animation-delay: 900ms;
}

.fadeins-4 {
  animation-delay: 1200ms;
}

.fadeins-5 {
  animation-delay: 1500ms;
}
</style>
