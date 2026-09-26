const VERSION = "cop31-v1";
const SHELL_CACHE = VERSION + "-shell";
const LIB_CACHE = VERSION + "-lib";
const TILE_CACHE = "cop31-tiles";
const MAX_TILES = 400;
const NETWORK_TIMEOUT_MS = 4000;

const SHELL = [
  "./",
  "index.html", "login.html", "map.html", "about.html", "culture.html", "events.html", "admin.html",
  "css/style.css",
  "js/data.js", "js/i18n.js", "js/translate.js", "js/auth.js", "js/pwa.js",
  "js/map.js", "js/trace.js", "js/admin.js", "js/events.js",
  "manifest.webmanifest",
  "img/icon-192.png", "img/icon-512.png", "img/icon-maskable-512.png",
  "img/icon-apple-180.png", "img/favicon-32.png"
];

const LIBS = [
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
  "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
  "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css",
  "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css",
  "https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"
];

self.addEventListener("install", function (event) {
  event.waitUntil((async function () {
    const shell = await caches.open(SHELL_CACHE);
    await shell.addAll(SHELL);

    const lib = await caches.open(LIB_CACHE);
    await Promise.all(LIBS.map(function (url) {
      return lib.add(new Request(url, { mode: "cors" })).catch(function () {});
    }));

    await self.skipWaiting();
  })());
});

self.addEventListener("activate", function (event) {
  event.waitUntil((async function () {
    const names = await caches.keys();
    await Promise.all(names.map(function (name) {
      const current = name === SHELL_CACHE || name === LIB_CACHE || name === TILE_CACHE;
      return current ? null : caches.delete(name);
    }));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", function (event) {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  if (url.hostname.endsWith("tile.openstreetmap.org")) {
    event.respondWith(tileFirst(req));
    return;
  }

  if (url.hostname === "unpkg.com") {
    event.respondWith(cacheFirst(req, LIB_CACHE, true));
    return;
  }

  if (url.origin === self.location.origin) {
    if (url.pathname.indexOf("/img/") !== -1) {
      event.respondWith(cacheFirst(req, SHELL_CACHE, false));
    } else {
      event.respondWith(networkFirst(req));
    }
  }
});

async function networkFirst(req) {
  const cache = await caches.open(SHELL_CACHE);

  const fromNetwork = fetch(req).then(function (res) {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  });
  fromNetwork.catch(function () {});

  const timeout = new Promise(function (resolve) {
    setTimeout(function () { resolve(null); }, NETWORK_TIMEOUT_MS);
  });

  try {
    const res = await Promise.race([fromNetwork, timeout]);
    if (res) return res;
  } catch (err) { }

  const saved = await cache.match(req, { ignoreSearch: true });
  if (saved) return saved;

  try { return await fromNetwork; }
  catch (err) {
    if (req.mode === "navigate") {
      const home = await cache.match("index.html");
      if (home) return home;
    }
    return new Response("Offline", { status: 503, statusText: "Offline" });
  }
}

async function cacheFirst(req, cacheName, refresh) {
  const cache = await caches.open(cacheName);
  const saved = await cache.match(req);

  function fetchAndSave() {
    return fetch(req).then(function (res) {
      if (res && res.ok) cache.put(req, res.clone());
      return res;
    }).catch(function () { return null; });
  }

  if (saved) {
    if (refresh) fetchAndSave();
    return saved;
  }
  const res = await fetchAndSave();
  return res || new Response("", { status: 504 });
}

async function tileFirst(req) {
  const cache = await caches.open(TILE_CACHE);
  const saved = await cache.match(req);
  if (saved) return saved;

  try {
    const res = await fetch(req);
    if (res && res.ok) {
      await cache.put(req, res.clone());
      trimTiles(cache);
    }
    return res;
  } catch (err) {
    return new Response("", { status: 504 });
  }
}

async function trimTiles(cache) {
  const keys = await cache.keys();
  const extra = keys.length - MAX_TILES;
  for (let i = 0; i < extra; i++) await cache.delete(keys[i]);
}
