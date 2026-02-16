<template>
  <div class="px-5 py-5 md:px-12 md:py-10 text-left text-mono-fg mx-3 min-h-[70vh]">
    <article>
      <header>
        <div class="text-2xl font-bold text-mono-fg mb-3 fadein-bot title-section flex items-center justify-center flex-col">
          <h4>Get In Touch</h4>
          <p class="text-base font-normal text-mono-muted mt-2 text-center max-w-lg">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
        </div>
      </header>

      <section class="mt-10">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          <!-- Email -->
          <a href="mailto:hanimhashmi121@gmail.com"
            class="contact-card bg-mono-card border border-mono-border rounded-xl p-6 hover:bg-mono-card-hover transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group">
            <div class="w-14 h-14 rounded-full bg-mono-fg/10 flex items-center justify-center group-hover:bg-mono-fg/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-mono-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="text-mono-fg font-semibold">Email Me</h3>
            <p class="text-mono-accent text-sm">hanimhashmi121@gmail.com</p>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/966539429379" target="_blank" rel="noopener"
            class="contact-card bg-mono-card border border-mono-border rounded-xl p-6 hover:bg-mono-card-hover transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group">
            <div class="w-14 h-14 rounded-full bg-mono-fg/10 flex items-center justify-center group-hover:bg-mono-fg/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-mono-fg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <h3 class="text-mono-fg font-semibold">WhatsApp</h3>
            <p class="text-mono-accent text-sm">+966 539 429 379</p>
          </a>

          <!-- Phone -->
          <a href="tel:+966539429379"
            class="contact-card bg-mono-card border border-mono-border rounded-xl p-6 hover:bg-mono-card-hover transition-all duration-300 flex flex-col items-center text-center gap-3 cursor-pointer group">
            <div class="w-14 h-14 rounded-full bg-mono-fg/10 flex items-center justify-center group-hover:bg-mono-fg/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-mono-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-mono-fg font-semibold">Call Me</h3>
            <p class="text-mono-accent text-sm">+966 539 429 379</p>
          </a>
        </div>

        <!-- Social Links -->
        <div class="mt-12 text-center">
          <h3 class="text-lg font-semibold text-mono-fg mb-6">Connect With Me</h3>
          <div class="flex justify-center gap-4 flex-wrap">
            <a href="https://github.com/hanihashmi786" target="_blank" rel="noopener"
              class="flex items-center gap-2 px-5 py-3 bg-mono-card border border-mono-border rounded-xl text-mono-muted hover:text-mono-fg hover:border-mono-accent transition-all duration-300">
              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
              <span class="text-sm font-medium">GitHub</span>
            </a>
            <a href="https://linkedin.com/in/hanihashmi333" target="_blank" rel="noopener"
              class="flex items-center gap-2 px-5 py-3 bg-mono-card border border-mono-border rounded-xl text-mono-muted hover:text-mono-fg hover:border-mono-accent transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
              <span class="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
        </div>

        <!-- Location -->
        <div class="mt-12 text-center pb-32">
          <div class="inline-flex items-center gap-2 px-6 py-3 bg-mono-card border border-mono-border rounded-full text-mono-muted">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-mono-fg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm">Riyadh, Saudi Arabia</span>
          </div>
        </div>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  name: 'ContactView'
}
</script>

<style scoped>
.contact-card:hover {
  transform: translateY(-4px);
}
</style>
