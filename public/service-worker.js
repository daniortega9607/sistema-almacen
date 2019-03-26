importScripts("/precache-manifest.ae7edc598217d8e8ac0ffdb7f938eb5c.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/* eslint-disable */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener('message', (e) => {
  if (e.data.action == 'skipWaiting') self.skipWaiting();
});

