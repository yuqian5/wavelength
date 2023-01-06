var CACHE_NAME = 'wavelength-cache';
var urlsToCache = [
    '/side-projects/wavelength/build/',
    '/side-projects/wavelength/build/static/js/bundle.js',
    '/side-projects/wavelength/build/static/media/bootstrap-icons.b2e5aab643c6f0fd2da6.woff2',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                // Open a cache and cache our files
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});