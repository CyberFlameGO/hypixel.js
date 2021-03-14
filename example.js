const Hypixel = require('./src/index');
const client = new Hypixel.Client("API");

client.getPlayer('caykie')
    .then(console.log);