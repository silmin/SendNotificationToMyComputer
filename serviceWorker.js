self.addEventListener('fetch', function(event) {
    event.respondWith(
        new Response('[active] service worker')
    );
});

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
    
    var title = "push title";
    var body = "push body";

    event.waitUntil(
        self.registration.showNotification(title, {
            body: body,
            icon: './img/icon.png',
            tag: 'push-notification-tag'
        })
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    clients.openWindow("./");
}, false);
