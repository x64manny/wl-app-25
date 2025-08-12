import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

// Create app separately so we can attach a global errorHandler for diagnostics
const app = createApp(App);
app.config.errorHandler = (err, instance, info) => {
	console.error('[Vue Global Error]', err, info, instance);
};
window.addEventListener('error', e => {
	console.error('[Window Error]', e.error || e.message, e);
});
window.addEventListener('unhandledrejection', e => {
	console.error('[Unhandled Promise Rejection]', e.reason);
});

app.use(router);
app.mount('#app');
console.log('[App Mounted]');

// Dev helper: warn if service workers are still registered (can cause stale cache / blank screens)
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

// Register service worker only in production build and when supported
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed', err));
	});
}
