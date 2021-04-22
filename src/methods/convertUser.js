const phin = require('phin');
const getMethod = require('../methods/getMethod');
const { Support, MojangAPI } = require('../../constants.json');

/**
* Converts a player's username or UUID to the opposite or what is specified.
* @param {string} User - Provide a Username or UUID with or without dashes.
* @param {string} [Convert] - Provide either "username". or "uuid" to convert to.
*/

module.exports = async(User, Cache, Convert) => new Promise(async (resolve, reject) => {
    if (!User)
        throw Error('You must provide a user in this method.');
    else if (!Convert) {
        switch (getMethod(User)) {
            case "uuid":
                Convert = "username";
                break;
            case "name":
                Convert = "uuid";
                break;
        }
    }
    else if (Convert !== "uuid" && Convert !== "name" && Convert !== "username")
        throw Error('You must specify either UUID or Username.');

    else {
        const Request = await phin({
            url: MojangAPI + User,
            parse: 'json'
        }).catch(() => {
            reject("An error occurred while trying to get data." + Support);
        });
        const Response = await Request.body[Convert];
        return resolve(Response);
    }

});