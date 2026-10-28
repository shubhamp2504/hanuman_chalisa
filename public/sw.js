/**
 * Service Worker for Hanuman Chalisa — The Living Temple
 * Caches core app shell, fonts, assets, and offline text.
 */

const CACHE_NAME = 'hanuman-chalisa-v4';

const PRECACHE_ASSETS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Allow media audio to stream directly from network with native Range header support
  if (event.request.url.includes('/audio/')) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Network-first for navigation (HTML) so users always get fresh updates
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request).then((res) => res || caches.match('/')))
    );
    return;
  }

  // Cache-first for static assets (CSS, JS, Fonts, Images)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200) {
          return networkResponse;
        }

        const url = event.request.url;
        const shouldCache =
          url.includes('fonts.googleapis.com') ||
          url.includes('fonts.gstatic.com') ||
          url.includes('/assets/') ||
          url.endsWith('.css') ||
          url.endsWith('.js') ||
          url.endsWith('.svg') ||
          url.endsWith('.jpg') ||
          url.endsWith('.png');

        if (shouldCache) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }

        return networkResponse;
      });
    })
  );
});
