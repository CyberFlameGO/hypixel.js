const { Support } = require('../../constants.json');

/**
* Detect a Username or UUID provided.
* @param {string} User - Provide either a username or UUID with or without dashes.
*/

module.exports = User => {
    if (!User)
        throw new Error('You must provide a Username or UUID.' + Support);    
    if (User.length === 36 || User.length === 32)
        return "uuid";
    else return "name";
}