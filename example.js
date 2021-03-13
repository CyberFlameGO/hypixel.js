const Hypixel = require('./src/index');
const client = new Hypixel.Client("API KEY");

client.getPlayer('caykie')
    .then(console.log);