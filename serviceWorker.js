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
    
    var title = "this is push title";
    var msg = "this is push message";

    event.waitUntill(
        self.registration.showNotification(title, {
            body: msg,
            icon: './img/icon.png',
            tag: 'push-notification-tag'
        });
        self.registration.pushManager.getSubscription().then(subscription => {
            console.log(subscription);
        }, err => console.log(err);
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    clients.openWindow("/");
}, false);
