const { Support } = require('../../constants.json');

/**
* Added dashes to a UUID if they are not already added.
* @param {string} UUID - Provide a UUID with or without dashes.
*/

module.exports = UUID => {

    if (!UUID)
        throw new Error('You must provide a UUID to convert (add dashes).' + Support);
    else if (UUID.length === 36)
        return UUID;
    else if (UUID.length !== 32)
        throw new Error('You have not provided a valid UUID.' + Support);
    else return UUID.substr(0, 8) + "-" + UUID.substr(8, 4) + "-" + UUID.substr(12, 4) + "-" + UUID.substr(16, 4) + "-" + UUID.substr(20);

}