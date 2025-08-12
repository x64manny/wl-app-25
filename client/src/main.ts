import { createApp, type ComponentPublicInstance } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

const app = createApp(App);
app.config.errorHandler = (err: unknown, instance, info) => {
  console.error('[Vue Global Error]', err, info, instance as ComponentPublicInstance | null);
};

window.addEventListener('error', (e: ErrorEvent) => {
  console.error('[Window Error]', e.error || e.message, e);
});
window.addEventListener('unhandledrejection', (e: PromiseRejectionEvent) => {
  console.error('[Unhandled Promise Rejection]', e.reason);
});

app.use(router);
app.mount('#app');
console.log('[App Mounted]');

if (import.meta.env.DEV && 'serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations()
    .then(regs => {
      if (regs.length) {
        console.warn('[Dev] Service workers registered on dev origin (auto-unregistering):', regs);
        Promise.all(regs.map(r => r.unregister())).then(() => {
          console.warn('[Dev] Stale service workers unregistered. Purging wl-app caches…');
          if ('caches' in window) {
            caches.keys().then(keys => keys.filter(k => k.startsWith('wl-app-cache')).forEach(k => caches.delete(k)));
          }
        });
      }
    })
    .catch(err => console.warn('[Dev] SW check failed', err));
}

if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed', err));
  });
}
