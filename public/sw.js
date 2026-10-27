/**
 * Service Worker for Hanuman Chalisa — The Living Temple
 * Caches core app shell, fonts, assets, and offline text.
 */

const CACHE_NAME = 'hanuman-chalisa-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/assets/hanuman_darshan.jpg',
  '/src/main.js',
  '/src/content/chalisa-data.js',
  '/src/content/wisdom-data.js',
  '/src/services/storage-service.js',
  '/src/services/audio-service.js',
  '/src/components/verse-card.js',
  '/src/components/audio-dock.js',
  '/src/components/diya-canvas.js',
  '/src/components/petals-canvas.js',
  '/src/utils/icons.js',
  '/src/styles/tokens.css',
  '/src/styles/main.css',
  '/src/styles/reader.css',
  '/src/styles/audio.css',
  '/src/styles/sadhana.css',
  '/src/styles/wisdom.css',
  '/src/styles/darshan.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
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
  // Cache-first strategy for app assets
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache external fonts if requested
        if (
          event.request.url.includes('fonts.googleapis.com') ||
          event.request.url.includes('fonts.gstatic.com')
        ) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for html requests
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
