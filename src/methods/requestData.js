const phin = require('phin')
const { Support, API } = require('../../constants.json');

module.exports = (Endpoint, Key, Type, Data) => new Promise(async (resolve) => {

    if (!Endpoint)
        throw Error("You must provide a valid API endpoint for your request." + Support);
    else if (!Key)
        throw Error("You must provide an API key in your request." + Support);

    if(Type && Data) {
        const Request = await phin({
            url: `${API}/${Endpoint}?${Type}=${Data}&key=${Key}`,
            parse: 'json'
        }).catch(() => {
            throw Error("An error occurred while trying to get data." + Support);
        });
        const Response = await Request.body;
        return resolve(Response);
    }
    else {
        const Request = await phin({
            url: `${API}/${Endpoint}?key=${Key}`,
            parse: 'json'
        }).catch(() => {
            throw Error("An error occurred while trying to get data." + Support);
        });
        const Response = await Request.body;
        return resolve(Response);
    }

});