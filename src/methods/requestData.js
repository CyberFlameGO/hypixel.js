const Fetch = require('node-fetch');
const { Support, API } = require('../../constants.json');

module.exports = (Endpoint, Key, Type, Data) => new Promise(async (resolve) => {

    if (!Endpoint)
        throw Error("You must provide a valid API endpoint for your request." + Support);
    else if (!Key)
        throw Error("You must provide an API key in your request." + Support);

    if(Type && Data) {
        const Request = await Fetch(`${API}/${Endpoint}?${Type}=${Data}&key=${Key}`).catch(() => {
            throw Error("An error occurred while trying to get data." + Support);
        });
        const Response = await Request.json();
        return resolve(Response);
    }
    else {
        const Request = await Fetch(`${API}/${Endpoint}?key=${Key}`).catch(() => {
            throw Error("An error occurred while trying to get data." + Support);
        });
        const Response = await Request.json();
        return resolve(Response);
    }

});