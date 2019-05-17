window.addEventListener('load', () => {
    console.log('hi');
    if (!('serviceWorker' in navigator)) {
        console.log('This browser does not support ServiceWorker.')
        return;
    }
    navigator.serviceWorker.register("./serviceWorker.js")
    .then(() => {
        if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
            console.log('This browser does not support Web-Push.')
            return;
        }

        if (Notification.permission == 'denied') {
            console.log('Permission denied');
            return;
        }

        if (!('PushManager' in window)) {
            console.log('PushManager does not exist');
            return;
        }

        return navigator.serviceWorker.ready;
    })
    .then(serviceWorkerRegistration => {
        return serviceWorkerRegistration.pushManager.getSubscription();
    })
    .then(subscription => {
        if (!subscription) {
            console.log('Already subscribed');
        } else {
            console.log(subscription.toJSON());
        }
    });

    const keys = require('./application-server-keys.json');
    const vapidPublickey = urlBase64ToUint8Array(keys.publicKey);

    navigator.serviceWorker.ready
    .then(serviceWorkerRegistration => {
        return serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: vapidPublickey
        });
    })
    .then(subscription => {
        const subscription_json = subscription.toJSON();
        //fs.writeFile('subscription.json', subscription_json);
        console.log(subscription_json);
    });
});

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
