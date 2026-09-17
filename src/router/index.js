import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import { track } from '@vercel/analytics'
import HomeView from '../views/HomeView.vue'
import { i18n, t } from '../i18n/index.js'
import en from '../i18n/locales/en.js'

// `title` is a key into `titles.*` in the locale files.
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'home' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'about' }
  },
  {
    path: '/experience',
    name: 'experience',
    component: () => import('../views/ExperienceView.vue'),
    meta: { title: 'experience' }
  },
  {
    path: '/portfolio',
    name: 'portfolio',
    component: () => import('../views/PortfolioView.vue'),
    meta: { title: 'portfolio' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'contact' }
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('../views/BusinessCardView.vue'),
    meta: { title: 'card' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFoundView.vue'),
    meta: { title: 'notFound' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

function applyTitle(route) {
  document.title = t('titles.' + route.meta.title) + ' - ' + t('siteName');
}

router.beforeEach((to, from, next) => {
  applyTitle(to);
  next();
});

// Switching language re-titles the page the visitor is already on.
watch(() => i18n.locale, () => applyTitle(router.currentRoute.value));

// Track page views with Vercel Analytics. Always the English title so the
// dashboard groups a page as one row whichever language it was viewed in.
router.afterEach((to) => {
  track('pageview', {
    page: to.path,
    title: en.titles[to.meta.title] || 'Unknown'
  });
});

export default router
