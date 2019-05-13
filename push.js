'use strict';

const webpush = require('web-push');

const keys = require('./application-server-keys.json');
webpush.setVapidDetails(
    "mailto:silvestmint@gmail.com",
    keys.publicKey,
    keys.privateKey
);

const subscription = require('./subscription.json');

const icon = './img/icon.png';
const params = {
    title: 'This is Push!',
    msg: 'This is msg',
    icon: icon
};

push.sendNotification(subscription, "Hi! I'm push.js")
.then(res => {
    console.log("Success!");
    console.log(res);
})
.catch(err => {
    console.log("Fail!");
    console.error(err);
});
