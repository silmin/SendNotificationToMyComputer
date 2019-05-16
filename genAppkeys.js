const webpush = require("web-push");
const fs = require('fs');

var keys_json = JSON.stringify(webpush.generateVAPIDKeys());
fs.writeFile('application-server-keys.json', keys_json);
