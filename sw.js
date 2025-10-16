const CACHE_NAME = 'mon-vehicule-cache-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/how-to-use.html',
  'https://i.postimg.cc/FhccT3BF/logo-mon-vehicule.jpg'
];

// Étape d'installation : mise en cache des ressources de l'application
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache ouvert');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Étape de fetch : servir les ressources depuis le cache si disponible
self.addEventListener('fetch', event => {
  // Nous ne mettons en cache que les requêtes GET
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si la ressource est dans le cache, on la retourne
        if (response) {
          return response;
        }
        // Sinon, on la récupère sur le réseau
        return fetch(event.request);
      })
  );
});