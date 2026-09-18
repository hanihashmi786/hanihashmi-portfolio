<script>
import { localizedExperiences, localizedEducation } from '../data/experience.js'
import { localizedProjects } from '../data/projects.js'
import { skillGroups, certifications } from '../data/skills.js'
import { profile } from '../data/profile.js'

// The CV is rendered from the same records as the Experience, Portfolio and
// About pages, in whichever language the site is showing, and printed
// through the browser (Download PDF = the print dialog's "Save as PDF").
// The sheet keeps a fixed paper palette; only the accent tint follows the
// scheme, darkened so it reads on white.

const ICONS = {
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  phone: 'M5 4h3l2 5-2 1a11 11 0 006 6l1-2 5 2v3a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  pin: 'M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 6a2 2 0 100-4 2 2 0 000 4z',
  github: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 00-.9-2.6c3.1-.4 6.4-1.5 6.4-7A5.4 5.4 0 0020 4.8 5.1 5.1 0 0019.9 1S18.7.7 16 2.5a13.4 13.4 0 00-7 0C6.3.7 5.1 1 5.1 1A5.1 5.1 0 005 4.8a5.4 5.4 0 00-1.5 3.8c0 5.4 3.3 6.6 6.4 7A3.4 3.4 0 009 18.1V22',
  globe: 'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18'
}

export default {
  name: 'CvView',
  data() {
    return {
      p: profile,
      icons: ICONS,
      groups: skillGroups,
      certs: certifications,
      host: '',
      origin: ''
    }
  },
  computed: {
    experiences() {
      return localizedExperiences()
    },
    education() {
      return localizedEducation()
    },
    projects() {
      return localizedProjects()
    },
    contacts() {
      const p = this.p
      return [
        { icon: 'mail', text: p.email, href: 'mailto:' + p.email, ltr: true },
        { icon: 'phone', text: p.phoneDisplay, href: 'tel:' + p.phone, ltr: true },
        { icon: 'pin', text: this.$t('common.location') },
        { icon: 'linkedin', text: 'linkedin.com/in/hanihashmi', href: p.linkedin, ltr: true },
        { icon: 'github', text: 'github.com/hanihashmi786', href: p.github, ltr: true },
        { icon: 'globe', text: this.host, href: this.origin, ltr: true }
      ].filter((c) => c.text)
    }
  },
  mounted() {
    this.host = window.location.host
    this.origin = window.location.origin
  },
  methods: {
    print() {
      window.print()
    }
  }
}
</script>

<template>
  <div class="cv-page">
    <div class="cv-toolbar">
      <button type="button" class="ui-btn cv-btn" @click="print">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
        </svg>
        {{ $t('cv.download') }}
      </button>
      <p class="cv-hint">{{ $t('cv.hint') }}</p>
    </div>

    <article class="cv-paper">
      <header class="cv-head">
        <div class="cv-id">
          <h1 class="cv-name">{{ $t('home.name') }}</h1>
          <p class="cv-headline">{{ $t('cv.headline') }}</p>
        </div>
        <ul class="cv-contact">
          <li v-for="c in contacts" :key="c.icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="icons[c.icon]" /></svg>
            <a v-if="c.href" :href="c.href" :dir="c.ltr ? 'ltr' : null" target="_blank" rel="noopener">{{ c.text }}</a>
            <span v-else>{{ c.text }}</span>
          </li>
        </ul>
      </header>

      <section class="cv-section">
        <h2 class="cv-h">{{ $t('cv.summary') }}</h2>
        <p class="cv-p">{{ $t('about.p1') }}</p>
      </section>

      <section class="cv-section">
        <h2 class="cv-h">{{ $t('cv.experience') }}</h2>
        <article v-for="exp in experiences" :key="exp.id" class="cv-entry">
          <div class="cv-entry-head">
            <div class="cv-entry-title">
              <h3>{{ exp.role }}</h3>
              <p class="cv-org">{{ exp.company }} · {{ exp.location }}</p>
            </div>
            <p class="cv-period">{{ exp.period }}</p>
          </div>
          <p v-if="exp.note" class="cv-note">{{ exp.note }}</p>
          <p v-if="exp.summary" class="cv-p cv-entry-summary">{{ exp.summary }}</p>
          <p v-if="exp.products && exp.products.length" class="cv-products">
            <b>{{ $t('cv.products') }}:</b>
            <template v-for="(pr, i) in exp.products" :key="pr.id">
              <span class="cv-prod">{{ pr.name }}</span> ({{ pr.tagline }})<template v-if="i < exp.products.length - 1"> · </template>
            </template>
          </p>
          <ul class="cv-bullets">
            <li v-for="(r, i) in exp.responsibilities" :key="i">{{ r }}</li>
          </ul>
          <p v-if="exp.impact && exp.impact.length" class="cv-impact"><b>{{ $t('cv.impact') }}:</b> {{ exp.impact.join(' · ') }}</p>
          <p v-if="exp.stack && exp.stack.length" class="cv-stack">{{ exp.stack.join(' · ') }}</p>
        </article>
      </section>

      <section class="cv-section">
        <h2 class="cv-h">{{ $t('cv.skills') }}</h2>
        <dl class="cv-skills">
          <template v-for="g in groups" :key="g.key">
            <dt>{{ $t('cv.skillGroups.' + g.key) }}</dt>
            <dd>{{ g.items.join(' · ') }}</dd>
          </template>
        </dl>
      </section>

      <section class="cv-section">
        <h2 class="cv-h">{{ $t('cv.projects') }}</h2>
        <ul class="cv-projects">
          <li v-for="pr in projects" :key="pr.id">
            <span class="cv-proj-top">
              <span class="cv-proj-name">{{ pr.name }}</span>
              <span class="cv-proj-org">{{ pr.org }}</span>
            </span>
            <span class="cv-proj-tag">{{ pr.tagline }}</span>
            <span class="cv-proj-tech">{{ pr.tech }}</span>
          </li>
        </ul>
      </section>

      <section class="cv-section">
        <h2 class="cv-h">{{ $t('cv.education') }}</h2>
        <div class="cv-entry">
          <div class="cv-entry-head">
            <div class="cv-entry-title">
              <h3>{{ education.degree }}</h3>
              <p class="cv-org">{{ education.institution }} · {{ education.location }}</p>
            </div>
            <p class="cv-period">{{ education.period }}</p>
          </div>
          <ul class="cv-bullets">
            <li v-for="(h, i) in education.highlights" :key="i">{{ h }}</li>
          </ul>
        </div>
      </section>

      <section class="cv-section">
        <h2 class="cv-h">{{ $t('cv.certifications') }}</h2>
        <ul class="cv-certs">
          <li v-for="c in certs" :key="c.name">
            <span>{{ c.name }}</span>
            <span class="cv-cert-issuer">{{ c.issuer }}</span>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<style scoped>
.cv-page {
  padding: 0.5rem 0.75rem 7rem;
}

@media (min-width: 768px) {
  .cv-page {
    padding: 0 1rem 4rem;
  }
}

/* ---------- toolbar (screen only) ---------- */
.cv-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.6rem 1.25rem;
  max-width: 50rem;
  margin: 0 auto 1.25rem;
}

.cv-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.15rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--on-accent);
  background: var(--accent);
  border: var(--btn-bw) solid var(--accent);
}

.cv-btn svg {
  width: 16px;
  height: 16px;
}

.cv-btn:hover {
  opacity: 0.92;
  transform: translateY(-2px);
}

.cv-hint {
  font-size: 0.74rem;
  color: var(--text-muted);
  text-align: center;
}

/* ---------- the sheet ---------- */
.cv-paper {
  --ink: #16181d;
  --muted: #5d6472;
  --line: #e4e7ec;
  --tint: color-mix(in srgb, var(--accent) 62%, #1f2530);
  --tint-soft: color-mix(in srgb, var(--accent) 35%, #ffffff);
  max-width: 50rem;
  margin: 0 auto;
  padding: 2.4rem 2.6rem 2.6rem;
  background: #ffffff;
  color: var(--ink);
  border-radius: 6px;
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(0, 0, 0, 0.06);
  text-align: start;
  font-size: 0.84rem;
  line-height: 1.55;
}

@media (max-width: 640px) {
  .cv-paper {
    padding: 1.5rem 1.2rem 1.8rem;
    font-size: 0.8rem;
  }
}

.cv-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--tint);
}

.cv-name {
  font-size: 1.9rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--ink);
}

.cv-headline {
  margin-top: 0.3rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--tint);
}

.cv-contact {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, max-content));
  gap: 0.25rem 1.25rem;
  font-size: 0.74rem;
  color: var(--muted);
}

.cv-contact li {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}

.cv-contact svg {
  width: 12px;
  height: 12px;
  flex: none;
  color: var(--tint);
}

.cv-contact a {
  color: inherit;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cv-contact a:hover {
  color: var(--tint);
}

@media (max-width: 480px) {
  .cv-contact {
    grid-template-columns: minmax(0, 1fr);
  }
}

.cv-section {
  margin-top: 1.4rem;
}

.cv-h {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.7rem;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tint);
}

.cv-h::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--line);
}

.cv-p {
  color: var(--ink);
}

.cv-entry + .cv-entry {
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--line);
}

.cv-entry-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.2rem 1rem;
}

.cv-entry-title h3 {
  font-size: 0.98rem;
  font-weight: 700;
  color: var(--ink);
}

.cv-org {
  font-size: 0.78rem;
  color: var(--muted);
}

.cv-period {
  font-size: 0.74rem;
  font-weight: 600;
  white-space: nowrap;
  color: var(--tint);
}

.cv-note {
  margin-top: 0.2rem;
  font-size: 0.74rem;
  font-style: italic;
  color: var(--muted);
}

.cv-entry-summary {
  margin-top: 0.45rem;
}

.cv-products {
  margin-top: 0.45rem;
  font-size: 0.78rem;
  color: var(--muted);
}

.cv-products b,
.cv-impact b {
  margin-inline-end: 0.3em;
  font-weight: 600;
  color: var(--ink);
}

.cv-prod {
  font-weight: 600;
  color: var(--ink);
}

/* Tailwind's preflight strips list markers; a CV wants them back. */
.cv-bullets {
  list-style: disc;
  margin: 0.45rem 0 0;
  padding-inline-start: 1.1rem;
}

.cv-bullets li {
  margin-top: 0.18rem;
}

.cv-bullets li::marker {
  color: var(--tint);
}

.cv-impact {
  margin-top: 0.45rem;
  font-size: 0.8rem;
}

.cv-stack {
  margin-top: 0.45rem;
  font-size: 0.72rem;
  color: var(--muted);
}

.cv-skills {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  gap: 0.3rem 1rem;
  margin: 0;
}

.cv-skills dt {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--ink);
}

.cv-skills dd {
  margin: 0;
  font-size: 0.78rem;
  color: var(--muted);
}

@media (max-width: 520px) {
  .cv-skills {
    grid-template-columns: 1fr;
    gap: 0.1rem 0;
  }

  .cv-skills dd {
    margin-bottom: 0.4rem;
  }
}

.cv-projects {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.7rem 1.5rem;
}

.cv-projects li {
  display: flex;
  flex-direction: column;
  padding-inline-start: 0.7rem;
  border-inline-start: 2px solid var(--tint-soft);
  font-size: 0.76rem;
}

.cv-proj-top {
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0 0.5rem;
}

.cv-proj-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--ink);
}

.cv-proj-org {
  font-size: 0.64rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--tint);
}

.cv-proj-tag {
  color: var(--ink);
}

.cv-proj-tech {
  margin-top: 0.1rem;
  font-size: 0.7rem;
  color: var(--muted);
}

.cv-certs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem 1.5rem;
  font-size: 0.78rem;
}

.cv-certs li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid var(--line);
}

.cv-cert-issuer {
  white-space: nowrap;
  color: var(--muted);
}

@media (max-width: 640px) {
  .cv-projects,
  .cv-certs {
    grid-template-columns: 1fr;
  }
}

/* Nastaliq needs taller lines than the sheet's defaults. */
html[lang="ur"] .cv-paper {
  line-height: 1.9;
}

/* ---------- print ---------- */
@media print {
  .cv-page {
    padding: 0;
  }

  .cv-toolbar {
    display: none;
  }

  /* Tighter rhythm on paper: the same content that breathes on screen
     should land on three A4 pages, not four. */
  .cv-paper {
    max-width: none;
    margin: 0;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    font-size: 9pt;
    line-height: 1.42;
  }

  .cv-head {
    padding-bottom: 0.6rem;
    gap: 0.6rem 1.5rem;
  }

  .cv-name {
    font-size: 1.7rem;
  }

  .cv-contact {
    grid-template-columns: repeat(3, minmax(0, max-content));
    gap: 0.15rem 1.1rem;
  }

  .cv-section {
    margin-top: 0.95rem;
  }

  .cv-h {
    margin-bottom: 0.45rem;
  }

  .cv-entry + .cv-entry {
    margin-top: 0.7rem;
    padding-top: 0.6rem;
  }

  .cv-entry-summary,
  .cv-products,
  .cv-bullets,
  .cv-impact,
  .cv-stack {
    margin-top: 0.3rem;
  }

  .cv-bullets li {
    margin-top: 0.1rem;
  }

  .cv-projects {
    gap: 0.45rem 1.25rem;
  }

  .cv-entry,
  .cv-projects li,
  .cv-certs li,
  .cv-skills {
    break-inside: avoid;
  }

  .cv-h {
    break-after: avoid;
  }

  .cv-contact a {
    color: inherit;
  }
}
</style>
