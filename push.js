'use strict';

const webpush = require('web-push');

const keys = require('./application-server-keys.json');
webpush.setVapidDetails(
    "mailto:silvestmint@gmail.com",
    keys.publicKey,
    keys.privateKey
);

const subscribers = require('./subscription.json');

const icon = './img/icon.png';
const params = {
    title: 'This is Push!',
    msg: 'This is msg',
    icon: icon
};

Promise.all(subscribers.map(subscription => {
    return webpush.sendNotification(subscription, JSON.stringify(params), {});
}))
.then(res => {
    console.log("Success!");
    console.log(res);
})
.catch(err => {
    console.log("Fail!");
    console.error(err);
});
