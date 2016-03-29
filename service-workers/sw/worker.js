// @source https://serviceworke.rs/json-cache_service-worker_doc.html
const CACHE_NAME = 'awesome-cache'

self.addEventListener('install', function(event) {
  console.log('[INSTALL] Service worker registration successfull')

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return fetch('files.json').then(function(response) {
          return response.json()
        })
        .then(function (files) {
          console.log('[INSTALL] Adding files from JSON: ', files)
          return cahes.addAll(files)
        })
      })
      .then(function() {
        console.log('[INSTALL] All required resources have been cached...')
        console.log('[INSTALL] Service worker successfully installed!')

        return self.skipWaiting()
      })
  )
})


self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if(response) {
          console.log('[FETCH] Returning from service worker cache: ', event.request.url)
          return response
        }

        console.log('[FETCH] Returning from server: ', event.request.url)
        return fetch(event.request)
      })
  )
})


self.addEventListener('activate', function(event) {
  console.log('[ACTIVATE] Activating service worker')
  console.log('[ACTIVATE] Claiming this service worker!')
  event.waitUntil(self.clients.claim())
})
