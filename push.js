'use strict';

const push = require('web-push');

const GCM_API_KEY = 'AIzaSyDDTUZzzAUqX3dg0J2Rong3IK0s9pyBRj4';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
    'endpoint': endpoint,
    'userAuth': auth,
    'userPublicKey': publickey
};

const pushSubscription = {
    pendpoint: data.endpoint;
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
