'use strict';

const push = require('web-push');

const GCM_API_KEY = 'AIzaSyDDTUZzzAUqX3dg0J2Rong3IK0s9pyBRj4';
push.setGCMAPIKey(GCM_API_KEY);

const data = {
    'endpoint': 'https://fcm.googleapis.com/fcm/send/dXmJcdCHy-Q:APA91bHa_m2O-H99LZ_Ss7sBbv081n7TFCPqOqgohOJUzdjJFpkZzmXdQM-m7UWCVlNLKzwhS1KrZC-r7zUcKEqzGqWVTDUq6UwSw5TofofhVDkkefz8-X8dMJrb0q7_Am5FZHTf07Lq',
    'userAuth': 'CYSNaBq8onvp8j6Un0CQ8Q==',
    'userPublicKey': 'BJ+RMaDBV3NQqsllol/UN2iU61XgWvfTXRfL7oxRU0OVfzlgG7Ur4pa/facMiPxJopolMr8WVVNsZFZgXwO73aQ='
};

const pushSubscription = {
    endpoint: data.endpoint,
    keys: {
        auth: data.userAuth,
        p256dh: data.userPublicKey
    }
}

push.sendNotification(pushSubscription, "Hi! I'm push.js")
    .then(function(result) {
        console.log("Success!");
        console.log(result);
    })
    .catch(function(err) {
        console.log("Fail!");
        console.error(err);
    });
