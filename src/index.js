'use strict';

const { Support } = require('../constants.json');

const getMethod = require('./methods/getMethod');
const fixUUID = require('./methods/fixUUID');
const requestData = require('./methods/requestData');
const convertUser = require('./methods/convertUser');

class Client {

    /**
    * Creates a new Hypixel Client instance.
    * @param {string} key - Hypixel API key obtained from Hypixel (mc.hypixel.net).
    */

    constructor(key) {
        if (!key)
            throw new Error('You must provide a Hypixel API key.' + Support);
        this.key = key;
    }
    
    /**
    * Gets the data of a player with no method required.
    * @param {string} user - Either a username or UUID with or without dashes.
    * @param {string} [method] - Optional field for either Name or UUID.
    */

    async getPlayer(user, method) {
        if (!user)
            throw new Error('You must provide a Username or UUID.' + Support);
        if (method) {
            method = method.toLowerCase();
            if (method === "username")
                method = "name";
            if (method !== "uuid" && method !== "name" && method !== "username")
                throw new Error('You must provide either \'name\' or \`uuid\` as a method.' + Support);
        }
        else method = getMethod(user);
        if (method === "uuid" && !user.indexOf("-") > -1)
            user = fixUUID(user);
            
        const player = await requestData("player", this.key, method, user);
        return {
            success: player.success,
            player: player.player
        }
    };

    /**
     * Get a SkyBlock Profile or multiple profiles depending on method.
     * @param {string} profile - Profile from a profile or UUID.
     * @param {string} method - Required method of 'profile'  or 'uuid'.
     */

    async getSkyBlockProfile(profile, method) {
        if (!profile)
            throw new Error('You must provide a UUID for the profile.' + Support);
        else if (!method)
            throw new Error('You must pick a method of either \'profile\' or \'uuid\'.' + Support);
        method = method.toLowerCase();
        if (method !== "profile" && method !== "uuid")
            throw new Error('You must provide either \'profile\' or \`uuid\` as a method.' + Support);
        if(method === "player" && getMethod(profile) !== "uuid") {
            method = await convertUser(profile, "uuid");
        }
        return await requestData("player", this.key, method, profile);
    };

    /**
     * Get's a guild from it's ID, Player or Name.
     * @param {string} guild - Guild from guild ID, Player (Username or UUID, UUID is faster) or Guild Name.
     * @param {string} method - Required method of 'id', 'player' or 'name'.
     */

    async getGuild(guild, method) {
        if (!guild)
            throw new Error('You must provide a Guild ID, Player Username or Guild Username.' + Support);
        else if (!method)
            throw new Error('You must provide either \'id\', \'player\' or \'name\' as a method.' + Support);
        else if (method !== "id" && method !== "player" && method !== "name")
            throw new Error('You must provide a valid method of \'id\', \'player\' or \'name\'.' + Support);
        method = method.toLowerCase();
        if(method === "player" && getMethod(guild) !== "uuid") {
            guild = await convertUser(guild, "uuid");
        }
        const guildReturn = await requestData("guild", this.key, method, guild);
        return {
            success: guildReturn.success,
            guild: guildReturn.guild
        }
    };

    /**
     * Get's the auction information by player, profile or UUID.
     * @param {string} player - Either a UUID, player or profile.
     * @param {string} method - Required method of 'uuid', 'player' or 'profile'.
     */

    async getSkyBlockAuctions(player, method) {
        if (!player)
            throw new Error('You must provide a UUID, Player or Profile.' + Support);
        else if (!method)
            throw new Error('You must provide either \'uuid\', \'player\' or \'profile\' as a method.' + Support);
        else if (method !== "uuid" && method !== "player" && method !== "profile")
            throw new Error('You must provide a valid method of \'uuid\', \'player\' or \'profile\'.' + Support);
        method = method.toLowerCase();
        if(method === "uuid" && getMethod(player) !== "uuid") {
            player = await convertUser(player, "uuid");
        }
        const SBReturn = await requestData("skyblock/auction", this.key, method, player);
        return {
            success: SBReturn.success,
            auctions: SBReturn.auctions
        }
    };

    /**
    * Gets the friends of the player provided.
    * @param {string} user - Either a username or UUID with or without dashes. (UUID is faster)
    */

    async getFriends(user) {
        if (!user)
            throw new Error('You must provide a Username or UUID.' + Support);
        if(getMethod(user) !== "uuid")
            user = await convertUser(user, "uuid");
        const friends = await requestData("friends", this.key, "uuid", user);
        return {
            success: friends.success,
            uuid: friends.uuid,
            records: friends.records
        }
    };

    /**
    * Gets the recent games of the player provided.
    * @param {string} user - Either a username or UUID with or without dashes. (UUID is faster)
    */

    async getRecentGames(user) {
        if (!user)
            throw new Error('You must provide a Username or UUID.' + Support);
        if(getMethod(user) !== "uuid")
            user = await convertUser(user, "uuid");
        const recentGames = await requestData("recentgames", this.key, "uuid", user);
        return {
            success: recentGames.success,
            uuid: recentGames.uuid,
            games: recentGames.games
        }
    };

    /**
     * Gets the current status of the player provided.
     * @param {string} user - Either a username or UUID with or without dashes. (UUID is faster)
     */

    async getStatus(user) {
        if (!user)
            throw new Error('You must provide a Username or UUID.' + Support);
        if(getMethod(user) !== "uuid")
            user = await convertUser(user, "uuid");
        const status = await requestData("status", this.key, "uuid", user);
        return {
            success: status.success,
            uuid: status.uuid,
            session: {
                online: status.session.online,
                gameType: status.session.gameType,
                mode: status.session.mode
            }
        }
    };

    /**
     * Find all of the active auctions on SkyBlock.
     * @param {number} page - Number of the page in the list of active auctions.
     */

    async getActiveSkyBlockAuctions(page) {
        if (!page) page = 0;
        return requestData("skyblock/auctions", this.key, "page", page);
    }

    get getPlayerCounts() {
        return requestData("counts", this.key);
    }
    
    get getLeaderboards() {
        return requestData("leaderboards", this.key);
    }
    
    get getPunishmentStatistics() {
        return requestData("punishmentstats", this.key);
    }
    
    get getActiveBoosters() {
        return requestData("boosters", this.key);
    }

    get resourceAchievements() {
        return requestData("resources/achievements", this.key);
    }

    get resourceChallenges() {
        return requestData("resources/challenges", this.key);
    }

    get resourceQuests() {
        return requestData("resources/quests", this.key);
    }

    get resourceGuildAchievements() {
        return requestData("resources/guilds/achievements", this.key);
    }

    get resourceGuildPermissions() {
        return requestData("resources/guilds/permissions", this.key);
    }

    get resourceSkyBlockCollections() {
        return requestData("resources/skyblock/collections", this.key);
    }

    get resourceSkyBlockSkills() {
        return requestData("resources/skyblock/skills", this.key);
    }

    get getSkyBlockNews() {
        return requestData("skyblock/news", this.key);
    }

    get getEndedSkyBlockAuctions() {
        return requestData("skyblock/auctions_ended", this.key);
    }

    get getSkyBlockBazaar() {
        return requestData("skyblock/bazaar", this.key);
    }

}

module.exports = {
    Client: Client,
    getMethod: getMethod,
    fixUUID: fixUUID,
    convertUser: convertUser
}