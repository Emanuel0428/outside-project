const CACHE_NAME = 'outside-zone-cache-v2';
const STATIC_CACHE = 'outside-zone-static-v2';
const RUNTIME_CACHE = 'outside-zone-runtime-v2';
const IMAGE_CACHE = 'outside-zone-images-v2';

// URLs críticas para cachear inmediatamente
const urlsToCache = [
  '/',
  '/index.html',
  '/products',
  '/articles',
  '/favicon-96x96.png',
  '/web-app-manifest-192x192.png',
  '/web-app-manifest-512x512.png',
  '/apple-touch-icon.png',
  '/favicon.ico',
  '/logo.webp',
  '/site.webmanifest'
];

// URLs de imágenes de productos para cache prioritario
const productImages = [
  'https://i.postimg.cc/T1CDj1tS/outside-rifbar-turbo-x-portada.webp',
  'https://i.postimg.cc/HWR3gSQ9/outside-MTRX-portada.webp',
  'https://i.postimg.cc/525jD8r8/outside-portada-Ai-RMEZ-Mars.webp',
  'https://i.postimg.cc/k4YzQKpX/outside-taijizen-judo-portada.webp',
  'https://i.postimg.cc/4NGG335y/outside-priv-bar-smok-portada.webp'
];

// Instalación del service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(urlsToCache);
      }),
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.addAll(productImages);
      })
    ])
  );
  self.skipWaiting(); // Activar inmediatamente
});

// Estrategia de fetch con diferentes cachés
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estrategia Cache First para assets estáticos
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((fetchResponse) => {
            cache.put(request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
    return;
  }

  // Estrategia Cache First para imágenes con fallback
  if (request.destination === 'image' || url.hostname.includes('postimg.cc')) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((fetchResponse) => {
            // Solo cachear imágenes exitosas
            if (fetchResponse.status === 200) {
              cache.put(request, fetchResponse.clone());
            }
            return fetchResponse;
          }).catch(() => {
            // Imagen fallback si falla la carga
            return caches.match('/logo.webp');
          });
        });
      })
    );
    return;
  }

  // Estrategia Network First para navegación y API
  if (request.mode === 'navigate' || request.destination === 'document') {
    event.respondWith(
      fetch(request).then((response) => {
        // Cachear páginas visitadas
        const responseClone = response.clone();
        caches.open(RUNTIME_CACHE).then((cache) => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => {
        // Fallback a cache si no hay conexión
        return caches.match(request).then((response) => {
          return response || caches.match('/');
        });
      })
    );
    return;
  }

  // Estrategia por defecto
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request);
    })
  );
});

// Activación y limpieza de cachés antiguos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, STATIC_CACHE, RUNTIME_CACHE, IMAGE_CACHE];
  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              return caches.delete(cacheName);
            }
          })
        )
      ),
      self.clients.claim() // Tomar control inmediato
    ])
  );
});

// Sincronización en segundo plano
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Aquí puedes agregar lógica para sincronizar datos offline
      console.log('Background sync ejecutado')
    );
  }
});

// Notificaciones push (preparado para futuro)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/web-app-manifest-192x192.png',
        badge: '/favicon-96x96.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      })
    );
  }
});
