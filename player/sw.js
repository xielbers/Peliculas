const CACHE_NAME = 'Peliculas';
let videoId = '';

self.addEventListener('message', function(event) {
    if (event.data.action === 'cacheVideo') {
        videoId = event.data.videoId;
        cacheVideo();
    }
});

async function cacheVideo() {
    const cache = await caches.open(CACHE_NAME);
    const videoUrl = 'https://drive.google.com/file/d/' + videoId + '/preview';

    try {
        const response = await fetch(videoUrl);
        if (response.ok) {
            await cache.put(videoUrl, response.clone());
            console.log('Video cached:', videoUrl);
        } else {
            console.error('Failed to cache video:', response.status);
        }
    } catch (error) {
        console.error('Error caching video:', error);
    }
}

self.addEventListener('install', function(event) {
    self.skipWaiting();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                return response || fetch(event.request);
            })
    );
});

self.addEventListener('activate', function(event) {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
