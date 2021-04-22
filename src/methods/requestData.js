const phin = require('phin')
const { Support, API } = require('../../constants.json');

module.exports = (Endpoint, Key, Type, Data) => new Promise(async (resolve, reject) => {

    if (!Endpoint)
        throw Error("You must provide a valid API endpoint for your request." + Support);
    else if (!Key)
        throw Error("You must provide an API key in your request." + Support);

    if (Type === "uuid" && !Data)
        return resolve({
            success: false,
            cause: "Missing one or more fields [uuid]"
        });

    else if (Type && Data) {

        try {
            const Request = await phin({
                url: `${API}/${Endpoint}?${Type}=${Data}&key=${Key}`,
                parse: 'json'
            });
            const Response = await Request.body;
            return resolve(Response);
        } catch {
            return resolve({
                success: false,
                cause: "An error occurred accessing Hypixel API"
            });
        }
    } else {
        try {
            const Request = await phin({
                url: `${API}/${Endpoint}?key=${Key}`,
                parse: 'json'
            });
            const Response = await Request.body;
            return resolve(Response);
        } catch {
            return resolve({
                success: false,
                cause: "An error occurred accessing Hypixel API"
            });
        }
    }
});