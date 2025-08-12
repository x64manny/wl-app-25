import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

createApp(App).mount('#app');

// Register service worker only in production build and when supported
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').catch(err => console.error('SW registration failed', err));
	});
}
