var cacheName = 'pwa';
var filesToCache = [
  '/BelegInternetTechnologien/',
  '/BelegInternetTechnologien/index.html',
  '/BelegInternetTechnologien/css/normalize.css',
  '/BelegInternetTechnologien/css/main.css',
  '/BelegInternetTechnologien/js/main.js',
  '/BelegInternetTechnologien/js/plugins.js',
  '/BelegInternetTechnologien/js/View/View.js',
  '/BelegInternetTechnologien/js/Presenter/Presenter.js',
  '/BelegInternetTechnologien/js/Model/Model.js',
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
