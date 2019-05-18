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

    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth()+1;
    let day = get.date();
    let hour = get.Hour();
    let minute = getMinutes();
    let sec = getSeconds();
    let millisec = getMilliseconds();

    let tag = year+"/"+month+"/"+day+"_"+hour+":"+minute+":"+sec+"."+millisec;

    self.registration.showNotification(title, {
        body: msg,
        icon: icon,
        tag: tag
    });
    self.registration.pushManager.getSubscription().then(subscription => {
        console.log(subscription);
        return;
    }, err => {
        console.log(err));
        return;
    }
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    clients.openWindow("/");
}, false);
