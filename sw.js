const CACHE_NAME = "travelnest-v16";

const ASSETS = [
  "./index.html",
  "./explorer.html",
  "./budgetPlanner.html",
  "./TravelMood.html",
  "./recommender.html",
  "./feedback.html",
  "./style/style.css",
  "./style/reset.css",
  "./style/Java/script.js",
  "./style/Java/planner.js",
  "./style/Java/travelmood.js",
  "./style/Java/recommend.js",
  "./images/bird_logo.png",
  "./images/srilanka.webp"
];

// INSTALL — cache all assets
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// ACTIVATE — clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH — serve from cache, fall back to network
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});