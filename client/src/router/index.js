import { createRouter, createWebHistory } from 'vue-router';

// Eager imports (diagnostic: avoid async component load issues during Edge blank screen investigation)
import WelcomePage from '../shared/ui/pages/WelcomePage.vue';
import DashboardPage from '../shared/ui/pages/DashboardPage.vue';
import LogPage from '../shared/ui/pages/LogPage.vue';
import ProjectionPage from '../shared/ui/pages/ProjectionPage.vue';
import UserPage from '../shared/ui/pages/UserPage.vue';

export const routes = [
  { path: '/', redirect: '/welcome' },
  { path: '/welcome', component: WelcomePage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/log', component: LogPage },
  { path: '/projection', component: ProjectionPage },
  { path: '/user', component: UserPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Diagnostic route logging
if (import.meta.env.DEV) {
  router.beforeEach((to, from, next) => {
    console.log('[Route ->]', from.fullPath, '=>', to.fullPath);
    next();
  });
}

export default router;
