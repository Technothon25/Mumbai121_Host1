const CACHE_NAME = 'mumbai121-v4'

const STATIC_ASSETS = [
  '/',
  '/fresher',
  '/pwbd',
  '/company',
  '/volunteer',
  '/donor',
  '/about',
  '/faq',
  '/contact',
  '/download',
]

// Install — cache all pages
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

// Activate — delete OLD cache versions automatically
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  )
  self.clients.claim()
})

// Fetch — NETWORK FIRST strategy
// Always fetches fresh content from network, falls back to cache when offline
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url)

  // Skip non-GET requests
  if (e.request.method !== 'GET') return

  // Skip chrome-extension and non-http requests
  if (!url.protocol.startsWith('http')) return

  // Skip API calls — both Next.js internal and FastAPI external
  if (url.pathname.startsWith('/api/')) return
  if (url.port === '8000') return

  // Skip _next internal files
  if (url.pathname.startsWith('/_next/')) return

  // Network-first — always try network, fallback to cache offline
  e.respondWith(
    fetch(e.request).then((response) => {
      if (!response || response.status !== 200 || response.type !== 'basic') {
        return response
      }
      // Update cache with fresh response
      const responseClone = response.clone()
      caches.open(CACHE_NAME).then((cache) => {
        cache.put(e.request, responseClone)
      })
      return response
    }).catch(() => {
      // Network failed — serve from cache (offline fallback)
      return caches.match(e.request).then((cached) => {
        return cached || caches.match('/')
      })
    })
  )
})