const CACHE_NAME = 'wl-app-cache-v2'; // bump to invalidate old cached HTML/assets
const OFFLINE_URL = '/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/icons/icon-192.png',
      '/icons/icon-512.png',
      '/icons/maskable-icon-192.png',
      '/icons/maskable-icon-512.png'
    ])).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Ignore browser extension / dev server websocket / chrome-extension schemes
  if (url.protocol === 'chrome-extension:' || url.pathname.startsWith('/@vite') || url.pathname.includes('hmr') || url.protocol === 'ws:' || url.protocol === 'wss:') {
    return; // Let the browser handle
  }
  const isHTML = request.mode === 'navigate' || (request.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(()=>{});
          return response;
        })
        .catch(() => caches.match(request).then(c => c || caches.match(OFFLINE_URL)))
    );
    return;
  }
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request)
        .then(response => {
          if (response && response.status === 200 && (response.type === 'basic' || response.type === 'opaqueredirect')) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, copy)).catch(()=>{});
          }
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
