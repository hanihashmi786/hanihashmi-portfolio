<script>
export default {
  data() {
    return {
      expandedIndex: null,
      experiences: [
        {
          role: 'Full Stack Developer',
          company: 'Freelancing',
          period: 'Oct 2025 - Present',
          location: 'Riyadh, Saudi Arabia',
          current: true,
          responsibilities: [
            'Developed the mobile app "Rujo-illalah" using React Native',
            'Currently working on "Motorek" web using Next.js and mobile app using React Native, with Django backend',
            'Developed the frontend of "Gogo Sports" using Next.js'
          ],
          impact: [
            'Building production-grade cross-platform applications serving real users',
            'End-to-end ownership from frontend to backend deployment'
          ]
        },
        {
          role: 'Full Stack Developer',
          company: 'Mars BPO Pvt. Ltd.',
          period: 'Jul 2024 - Aug 2025',
          location: 'Rawalpindi, Pakistan',
          current: false,
          responsibilities: [
            'Developed & maintained 5+ web apps using React and mobile apps using React Native & Python (Flask/Django)',
            'Used PostgreSQL for data management, improving deployment time by 30%',
            'Collaborated with cross-functional teams to build scalable solutions'
          ],
          impact: [
            '25% increase in system reliability through scalable architecture',
            'Reduced issue resolution time by 40% via optimized debugging processes'
          ]
        },
        {
          role: 'Full Stack Developer',
          company: 'Freelancing',
          period: 'Sep 2023 - Jul 2024',
          location: 'Islamabad, Pakistan',
          current: false,
          responsibilities: [
            'Developed a UI/UX dashboard using React.js',
            'Built a mobile app for online clothing sales using React Native',
            'Created an e-commerce store for an international student project with MERN stack'
          ],
          impact: [
            'Delivered multiple client projects independently on time',
            'Built a voice changer website using Python as a final year project'
          ]
        },
        {
          role: 'JavaScript Developer - Internship',
          company: 'SOFTOO Pvt. Ltd.',
          period: 'Jul 2023 - Sep 2023',
          location: 'Islamabad, Pakistan',
          current: false,
          responsibilities: [
            'Completed intensive Node.js training during the internship',
            'Enhanced logical thinking & problem-solving by independently tackling coding challenges'
          ],
          impact: [
            'Contributed to a collaborative team culture by sharing solutions',
            'Improved peer review quality through active participation'
          ]
        }
      ],
      education: {
        degree: 'BS Software Engineering',
        institution: 'Capital University of Science & Technology',
        period: '2020 - 2024',
        location: 'Islamabad, Pakistan',
        highlights: [
          'Final Year Project: Detection of Brain Tumor using MR Images (Python, TensorFlow/Keras, OpenCV)',
          'Focused on Full Stack Development, AI/ML, and Mobile App Development',
          'Strong foundation in Data Structures, Algorithms, and System Design'
        ]
      }
    };
  },
  methods: {
    toggleExpand(index) {
      this.expandedIndex = this.expandedIndex === index ? null : index;
    }
  }
}
</script>

<template>
  <div class="px-4 py-5 md:px-8 md:py-10 mx-3">
    <!-- Page Header -->
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-2" style="color: var(--text);">Experience & Education</h2>
      <p class="text-sm" style="color: var(--text-muted);">My professional journey and academic background</p>
    </div>

    <!-- Work Experience Section -->
    <div class="mb-16">
      <div class="text-2xl font-bold mb-10 flex items-center" style="color: var(--text);">
        <div class="h-[1px] w-10 md:w-20" style="background-color: var(--accent);"></div>
        &nbsp; Work Experience
      </div>

      <!-- Zigzag Timeline (Desktop) -->
      <div class="hidden md:block relative">
        <!-- Center vertical line -->
        <div class="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2" style="background-color: var(--accent);"></div>

        <div v-for="(exp, index) in experiences" :key="index" class="relative mb-12">
          <!-- Timeline dot -->
          <div class="absolute left-1/2 top-6 w-3 h-3 rounded-full -translate-x-1/2 z-10"
            style="background-color: var(--accent);"
            :style="exp.current ? { boxShadow: '0 0 0 5px rgba(var(--accent-rgb), 0.25)' } : {}">
          </div>

          <!-- LEFT card (even index) -->
          <div v-if="index % 2 === 0" class="flex items-start">
            <div class="w-[47%] pr-8">
              <div class="rounded-xl p-5 transition-all duration-300 cursor-pointer"
                style="background-color: var(--bg-card); border: 1px solid var(--border);"
                @click="toggleExpand(index)">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <p class="text-xs font-medium" style="color: var(--accent);">{{ exp.period }}</p>
                    <h3 class="text-base font-bold mt-0.5" style="color: var(--text);">{{ exp.role }}</h3>
                    <p class="text-xs mt-1 flex items-center gap-1" style="color: var(--text-muted);">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {{ exp.company }} | {{ exp.location }}
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 transition-transform duration-300" :class="expandedIndex === index ? 'rotate-180' : ''" style="color: var(--text-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <!-- Expanded content -->
                <div v-if="expandedIndex === index" class="mt-4 pt-4" style="border-top: 1px solid var(--border);">
                  <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: var(--accent);">Key Responsibilities</h4>
                  <ul class="flex flex-col gap-1.5 mb-3">
                    <li v-for="(r, ri) in exp.responsibilities" :key="ri" class="text-sm leading-relaxed flex items-start gap-2" style="color: var(--text-muted);">
                      <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent);"></span>
                      {{ r }}
                    </li>
                  </ul>
                  <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: var(--accent);">Executive Impact</h4>
                  <ul class="flex flex-col gap-1.5">
                    <li v-for="(i, ii) in exp.impact" :key="ii" class="text-sm leading-relaxed flex items-start gap-2" style="color: var(--text-muted);">
                      <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent);"></span>
                      {{ i }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="w-[6%]"></div>
            <div class="w-[47%]"></div>
          </div>

          <!-- RIGHT card (odd index) -->
          <div v-else class="flex items-start">
            <div class="w-[47%]"></div>
            <div class="w-[6%]"></div>
            <div class="w-[47%] pl-8">
              <div class="rounded-xl p-5 transition-all duration-300 cursor-pointer"
                style="background-color: var(--bg-card); border: 1px solid var(--border);"
                @click="toggleExpand(index)">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style="background-color: rgba(var(--accent-rgb), 0.1);">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" style="color: var(--accent);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div class="flex-grow">
                    <p class="text-xs font-medium" style="color: var(--accent);">{{ exp.period }}</p>
                    <h3 class="text-base font-bold mt-0.5" style="color: var(--text);">{{ exp.role }}</h3>
                    <p class="text-xs mt-1 flex items-center gap-1" style="color: var(--text-muted);">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {{ exp.company }} | {{ exp.location }}
                    </p>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 flex-shrink-0 transition-transform duration-300" :class="expandedIndex === index ? 'rotate-180' : ''" style="color: var(--text-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <!-- Expanded content -->
                <div v-if="expandedIndex === index" class="mt-4 pt-4" style="border-top: 1px solid var(--border);">
                  <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: var(--accent);">Key Responsibilities</h4>
                  <ul class="flex flex-col gap-1.5 mb-3">
                    <li v-for="(r, ri) in exp.responsibilities" :key="ri" class="text-sm leading-relaxed flex items-start gap-2" style="color: var(--text-muted);">
                      <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent);"></span>
                      {{ r }}
                    </li>
                  </ul>
                  <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: var(--accent);">Executive Impact</h4>
                  <ul class="flex flex-col gap-1.5">
                    <li v-for="(i, ii) in exp.impact" :key="ii" class="text-sm leading-relaxed flex items-start gap-2" style="color: var(--text-muted);">
                      <span class="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style="background-color: var(--accent);"></span>
                      {{ i }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile Timeline (stacked) -->
      <div class="md:hidden relative">
        <div class="absolute left-4 top-0 bottom-0 w-[2px]" style="background-color: rgba(var(--accent-rgb), 0.3);"></div>
        <div v-for="(exp, index) in experiences" :key="'m'+index" class="relative mb-6 ml-10">
          <div class="absolute -left-[1.75rem] top-4 w-3 h-3 rounded-full" style="background-color: var(--accent);"
            :style="exp.current ? { boxShadow: '0 0 0 4px rgba(var(--accent-rgb), 0.2)' } : {}"></div>
          <div class="rounded-xl p-4 cursor-pointer"
            style="background-color: var(--bg-card); border: 1px solid var(--border);"
            @click="toggleExpand(index)">
            <div class="flex items-start justify-between">
              <div>
                <p class="text-xs font-medium" style="color: var(--accent);">{{ exp.period }}</p>
                <h3 class="text-sm font-bold mt-0.5" style="color: var(--text);">{{ exp.role }}</h3>
                <p class="text-xs mt-1" style="color: var(--text-muted);">{{ exp.company }} | {{ exp.location }}</p>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 flex-shrink-0 transition-transform duration-300" :class="expandedIndex === index ? 'rotate-180' : ''" style="color: var(--text-muted);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div v-if="expandedIndex === index" class="mt-3 pt-3" style="border-top: 1px solid var(--border);">
              <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: var(--accent);">Key Responsibilities</h4>
              <ul class="flex flex-col gap-1.5 mb-3">
                <li v-for="(r, ri) in exp.responsibilities" :key="ri" class="text-xs leading-relaxed flex items-start gap-2" style="color: var(--text-muted);">
                  <span class="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style="background-color: var(--accent);"></span>
                  {{ r }}
                </li>
              </ul>
              <h4 class="text-xs font-bold uppercase tracking-wider mb-2" style="color: var(--accent);">Executive Impact</h4>
              <ul class="flex flex-col gap-1.5">
                <li v-for="(i, ii) in exp.impact" :key="ii" class="text-xs leading-relaxed flex items-start gap-2" style="color: var(--text-muted);">
                  <span class="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style="background-color: var(--accent);"></span>
                  {{ i }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Education Section -->
    <div class="mb-32">
      <div class="text-2xl font-bold mb-10 flex items-center fadein-bot" style="color: var(--text);">
        Education &nbsp;
        <div class="h-[1px] w-32 md:w-96" style="background-color: var(--accent);"></div>
      </div>

      <div class="rounded-xl p-6 md:p-8 fadein-left fadeins-1" style="background-color: var(--bg-card); border: 1px solid var(--border);">
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
              <div class="text-left md:text-right mt-2 md:mt-0">
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
                <h4 class="text-base font-bold" style="color: var(--text);">Key Highlights</h4>
              </div>
              <!-- Highlight cards grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div v-for="(h, hi) in education.highlights" :key="hi"
                  :class="['rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-1 fadein-left', hi === 0 ? 'fadeins-3' : hi === 1 ? 'fadeins-4' : 'fadeins-5']"
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
