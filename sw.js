/* ============================================================
   SERVICE WORKER — makes the app work with no internet.
   The first time the app is opened online, this file saves copies of every
   app file on the phone. After that, the app always loads from those saved
   copies, so it opens instantly and works in airplane mode.
   Splash images are saved the first time each one is shown, so a missing
   image never stops the app from installing.

   WHEN YOU UPDATE THE APP: change CACHE_VERSION below (e.g. v1 → v2).
   That tells phones there's a new version to download.
   ============================================================ */
const CACHE_VERSION = 'collection-tracker-v1.4';

// Every file the app needs. If you add a file to the app (such as a new game's
// data file), add it here too. Images don't need adding.
const APP_FILES = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data/resonance.js',
  './data/rebirth.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

/** Install: download and save every app file. */
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(function (cache) { return cache.addAll(APP_FILES); })
      // Start using this new version straight away rather than waiting for the app to close.
      .then(function () { return self.skipWaiting(); })
  );
});

/** Activate: delete saved copies from older versions so they don't waste space. */
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (names) {
        return Promise.all(names
          .filter(function (name) { return name !== CACHE_VERSION; })
          .map(function (name) { return caches.delete(name); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/** Fetch: whenever the app asks for a file, hand over the saved copy.
    Only if there's no saved copy does it try the internet, and it keeps what it gets
    (this is how splash images are saved). */
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(function (saved) {
      if (saved) return saved;
      return fetch(event.request).then(function (response) {
        if (response.ok && new URL(event.request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then(function (cache) { cache.put(event.request, copy); });
        }
        return response;
      }).catch(function () {
        // Offline and not saved: for a page request, show the app's main page instead.
        if (event.request.mode === 'navigate') return caches.match('./index.html');
        return Response.error();
      });
    })
  );
});
