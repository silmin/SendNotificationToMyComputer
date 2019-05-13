self.addEventListener('install', () => {
    console.log("[Installed] ServiceWorker");
});

self.addEventListener('fetch', event => {
    event.respondWith(
        new Response('[active] service worker')
    );
});

self.addEventListener('push', event => {
    console.log('Received a push message', event);

    let {title, msg, icon} = event.data.json();

    self.registration.showNotification(title, {
        body: msg,
        icon: icon,
        tag: 'push-notification-tag'
    });
    self.registration.pushManager.getSubscription().then(subscription => {
        console.log(subscription);
    }, err => console.log(err));
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    clients.openWindow("/");
}, false);
