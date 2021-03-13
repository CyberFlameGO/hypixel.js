const mc = require('minecraft-player');
const getMethod = require('../methods/getMethod');

/**
* Converts a player's username or UUID to the opposite or what is specified.
* @param {string} User - Provide a Username or UUID with or without dashes.
* @param {string} Convert - Provide either "username". or "uuid" to convert to.
*/

module.exports = async(User, Convert) => {

    if (!User)
        throw Error('You must provide a user in this method.');
    else if (!Convert) {
        switch(getMethod(User)) {
            case "uuid":
                Convert = "username";
                break;
            case "name":
                Convert = "uuid";
                break;
        }
    }
    else if(Convert !== "uuid" && Convert !== "name" && Convert !== "username")
        throw Error('You must specify either UUID or Username.');

    if (Convert === "name")
        Convert = "username";

    const data = await mc(User).catch(() => {
        throw Error("That player doesn't exist or another error occurred.");
    });

    return data[Convert];
}