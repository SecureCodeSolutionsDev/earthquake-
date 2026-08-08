/* =====================================================================
   TAYRIPAGES — PUSH SERVICE WORKER (lock-screen alerts)
   Lives next to index.html on GitHub Pages. 100% free with Firebase Spark.
   Nothing to edit here — it reads your keys from tayri-config.js.
   ===================================================================== */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('tayri-config.js');

try {
  if (typeof TAYRI_CONFIG !== 'undefined' && TAYRI_CONFIG.firebase
      && !String(TAYRI_CONFIG.firebase.apiKey).startsWith('PASTE')) {
    firebase.initializeApp(TAYRI_CONFIG.firebase);
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      const n = (payload && payload.notification) || {};
      const d = (payload && payload.data) || {};
      const title = n.title || d.title || 'Tayripages';
      const options = {
        body: n.body || d.body || 'Someone likes you — open Tayripages 💛',
        icon: 'icon.png',
        badge: 'icon.png',
        vibrate: [80, 40, 80],
        data: { url: d.url || './index.html' }
      };
      self.registration.showNotification(title, options);
    });
  }
} catch (e) { /* config still has PASTE placeholders — stay silent */ }

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || './index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((cs) => {
      for (const c of cs) { if ('focus' in c) return c.focus(); }
      return clients.openWindow(url);
    })
  );
});
