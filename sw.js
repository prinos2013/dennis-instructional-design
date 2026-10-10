const CACHE_NAME = 'mit601-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './mit601_part1.html',
  './mit601_part2.html',
  './mit601_part3.html',
  './mit601_part4.html',
  './mit601_part5.html',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './images (1).jpg',
  './images (2).jpg',
  './principles.jpg',
  './discussion.jpg',
  './project.jpg',
  './cooperative.jpg',
  './activity.jpg',
  './experiment.jpg',
  './simulation.jpg',
  './peer teaching.jpg'
];

// Install the service worker and cache all necessary files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return the cached response if found, otherwise fetch from the network
        return response || fetch(event.request);
      })
  );
});

// Update the service worker and remove old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});