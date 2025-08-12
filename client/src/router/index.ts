import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

import WelcomePage from '../shared/ui/pages/WelcomePage.vue';
import DashboardPage from '../shared/ui/pages/DashboardPage.vue';
import LogPage from '../shared/ui/pages/LogPage.vue';
import ProjectionPage from '../shared/ui/pages/ProjectionPage.vue';
import UserPage from '../shared/ui/pages/UserPage.vue';

export const routes: RouteRecordRaw[] = [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', component: WelcomePage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/log', component: LogPage },
  { path: '/projection', component: ProjectionPage },
  { path: '/user', component: UserPage }
];

// Dev-only component gallery (not bundled in production)
if (import.meta.env.DEV) {
  routes.push({
    path: '/testing/components',
    component: () => import('../shared/ui/pages/testing/ComponentGallery.vue')
  });
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

if (import.meta.env.DEV) {
  router.beforeEach((to, from, next) => {
    console.log('[Route ->]', from.fullPath, '=>', to.fullPath);
    next();
  });
}

export default router;
