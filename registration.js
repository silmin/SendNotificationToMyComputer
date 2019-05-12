window.addEventListener('load', function() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register("./serviceWorker.js")
            .then(function(registration) {
                console.log("serviceWorker registed.");
            }).catch(function(error) {
                console.log("serviceWorker error.", error);
            });

        navigator.serviceWorker.ready
            .then(function (registration) {
                return registration.pushManager.subscribe({ userVisibleOnly: true; });
            })
            .then(function (subscription) {
                var endpoint = subscription.endpoint;
                console.log('FCM EndPoint is: ' + endpoint);
                var auth = subscription.getKey('auth') 
                    ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('auth'))))
                    : '';
                console.log('User Auth is: ' + auth);
                var publicKey = subscription.getKey('p256dh')
                    ? btoa(String.fromCharCode.apply(null, new Uint8Array(subscription.getKey('p256dh'))))
                    : '';
                console.log('User PublicKey is: ' + publicKey);
            })
            .catch(console.error.bind(console));
    }
});
