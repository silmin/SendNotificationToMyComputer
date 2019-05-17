'use strict';

const webpush = require('web-push');

const keys = require('./application-server-keys.json');
webpush.setVapidDetails(
    "mailto:silvestmint@gmail.com",
    keys.publicKey,
    keys.privateKey
);

const subscribers = require('./subscription.json');

let title, msg;
if (3 <= process.argv.length) title = process.argv[2];
else title = 'Sample title';

if (4 <= process.argv.length) msg = process.argv[3];
else msg = 'Sample message';

const icon = './img/icon.png';

const params = {
    title: title,
    msg: msg,
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
