import Observer from '../../controller/observer';

const CACHE_NAME = 'v2';

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
        '/dist'
      ])
    ));
})

self.addEventListener('fetch', function(event) {

  let apiUrls = new RegExp('(\\/api.*)|(\\/upload.*)');
  let url = new URL(event.request.url)

  if (!apiUrls.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then(function (cachedResponse) {

          if (cachedResponse && !navigator.onLine) {
            return cachedResponse;
          }
          return fetch(event.request);
        })
    );

    event.waitUntil(update(event.request));
  } else {
    if (!navigator.onLine) {
      event.respondWith(
        new Response('Offline')
      )
    }
  }
});


const update = (request) => {
  return caches.open(CACHE_NAME)
    .then((cache) =>
      fetch(request)
        .then((response) =>
          cache.put(request, response)
        )
    );
};
