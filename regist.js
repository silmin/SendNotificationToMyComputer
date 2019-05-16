(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports={"publicKey":"BFv-c87PUREhWnMjwYWPJrYqBIM3N1U4prCG377I4ACrMAEo3L9VJLNfM1uFx4Kz_qQJY9P6fRwGmvafG6v6rSI","privateKey":"n3_mu0HAHJFfr_sTjF0zIFUQX3qvAnjnFs9YWTSQbkM"}
},{}],2:[function(require,module,exports){
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

},{"./application-server-keys.json":1}]},{},[2]);
