'use strict';

const push = require('web-push');

const GCM_API_KEY = '**GCM_API_KEY**';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
    'endpoint': '*endpoint*',
    'userAuth': '*userAuth*',
    'userPublicKey': '*userPulicKey*'
};

const pushSubscription = {
    endpoint: data.endpoint,
    keys: {
        auth: data.userAuth,
        p256dh: data.userPublicKey
    }
};

push.sendNotification(pushSubscription, "Hi! I'm push.js")
    .then(function(result) {
        console.log("Success!");
        console.log(result);
    })
    .catch(function(err) {
        console.log("Fail!");
        console.error(err);
    });
