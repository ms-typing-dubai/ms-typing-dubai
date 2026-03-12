const CACHE_NAME = 'ms-typing-v20';
const ASSETS = [
  './index.html',
  './manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Activate new SW immediately
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim(); // Take control of all open pages immediately
});

self.addEventListener('fetch', e => {
  // Network first — always try to get latest from server
  // Fall back to cache only if offline
  e.respondWith(
    fetch(e.request)
      .then(response => {
        // Save fresh copy to cache
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return response;
      })
      .catch(() => {
        // Offline — use cache
        return caches.match(e.request).then(cached => cached || caches.match('./index.html'));
      })
  );
});
