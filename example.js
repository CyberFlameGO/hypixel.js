const Hypixel = require('./src/index');
const client = new Hypixel.Client("");

(async () => {
    const data = await client.getStatus('cactive');
    console.log(data);
})();