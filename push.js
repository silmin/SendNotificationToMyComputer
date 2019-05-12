'use strict';

const push = require('web-push');

const GCM_API_KEY = 'AIzaSyDDTUZzzAUqX3dg0J2Rong3IK0s9pyBRj4';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/dQlqh1Fq6HY:APA91bHKQWmhaN0f-DIgyUJz2XPXlEkbRCaRSW_mmO1kIQmh8qh6tB5n5PoVM7q97FDMeMrNSA1OwLes7T3K9M4Y0hlINdeEBIgWRyRIBP9ZYo2cyMoCI21jOS_lfMVbOHlh9Ljs2OVC',
    'userAuth': '7aI+EM+f2xo8Tln9CqbXoQ==',
    'userPublicKey': 'BBcKSr4mmSgJc/BFIN3RtlCAtSm+7gewje/vEgxqheSpToiqwEatAMKFTIrQIBEZUHTtQ2DJt9f+cKGs7PJz+50='
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
