const CACHE_NAME = 'version-tracker-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  // Per le chiamate API esterne (controllo versioni web) usa sempre la rete
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  event.request.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
