self.addEventListener('install', function(event) {
    console.log('Service Worker instalado');
    
    event.waitUntil(
        caches.open('static-cache-v1').then(function(cache) {
            return cache.addAll([
                '../'
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('Service Worker activado');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== 'static-cache-v1') {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request).catch(function() {
                return caches.match('/offline.html');
            });
        })
    );
});