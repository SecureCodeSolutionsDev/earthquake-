/* =====================================================================
   ZWIN 🔥 — PUSH SERVICE WORKER (lock-screen alerts)
   Lives next to index.html on GitHub Pages. 100% free with Firebase Spark.
   Nothing to edit here — it reads your keys from zwin-config.js.
   ===================================================================== */
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
importScripts('zwin-config.js');

try {
  if (typeof ZWIN_CONFIG !== 'undefined' && ZWIN_CONFIG.firebase
      && !String(ZWIN_CONFIG.firebase.apiKey).startsWith('PASTE')) {
    firebase.initializeApp(ZWIN_CONFIG.firebase);
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      const n = (payload && payload.notification) || {};
      const d = (payload && payload.data) || {};
      const title = n.title || d.title || 'Zwin 🔥';
      const options = {
        body: n.body || d.body || 'Something warm happened — open Zwin 💛',
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
