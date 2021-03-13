# hypixel-javascript

## About:

hypixel-javascript is a new and powerful Hypixel [Node.js](https://nodejs.org/) module to interact with [Hypixel](https://hypixel.net).

- 100% coverage of the Hypixel API.
- Adapt inputs and methods and converts whenever possible.
- Helpful addons that reduce your workload.

## Support & Bug Reporting:

hypixel-javascript is a  new module created by CactiveNetwork, you can get support on your code, report any issues and more by joining the discord at  [discord.gg/NeqVuSy](https://discord.gg/NeqVuSy). 

## Installation & Usage:

In your project run `npm install hypixel-javascript`.

Next enter the following in your main file (`index.js` by default).

```js
const Hypixel = require('hypixel-javascript');
const client = new Hypixel.Client("YOUR_API_KEY");
```

You need a Hypixel API key in order to use this library, join [mc.hypixel.net](https://hypixel.net) and run /api new to get one.

## Example Usage:

```js
const Hypixel = require('hypixel-javascript');
const client = new Hypixel.Client("YOUR_API_KEY"); // API Key

client.getPlayer('caykie') // Get player automatically
    .then(console.log);

// or you can do;

(async () => {
    const data = await client.getPlayer('caykie', 'username');
    console.log(data.player);
})();
```

# Queries:
## General:

#### Fetch Player Data:

You can either put in a **username** or **uuid** with or without dashes without any method without losing any performance from additional fetches. However, you can still request with the 'username' or 'uuid' method.

```js
client.getPlayer('caykie')
    .then(console.log);

client.getPlayer('eea2d4fd-a8b8-413b-9439-f06faaf7e109', 'uuid')
    .then(console.log);
```

#### Fetch Player Friends:

This method technically only supports UUIDs, and we do recommend using them. You can still supply a player username, however it will take slightly longer to fetch data from the Mojang API.

```js
// Better to use
client.getFriends('eea2d4fd-a8b8-413b-9439-f06faaf7e109')
    .then(console.log);

// Slightly slower
client.getFriends("caykie")
    .then(console.log);
```

#### Fetch Player Recent Games:

The player that you are requesting to get must have their recent games settings in the /settings menu on Hypixel enabled, otherwise you will not be able to see their recent games.

Again you can specify a username if you want, however we strongly recommend using a UUID if you can as it reduces wait time from additional requests.

```js
// Better to use
client.getRecentGames('eea2d4fd-a8b8-413b-9439-f06faaf7e109')
    .then(console.log);

// Slightly slower
client.getRecentGames('caykie')
    .then(console.log);
```

#### Fetch Player Status:

If the player specified is online and they have the setting to show player status enabled in /settings on Hypixel, this information will show, it is on by default for all players except for staff.

Again you can specify a username if you want, however we strongly recommend using a UUID if you can as it reduces wait time from additional requests.

```js
// Better to use
client.getStatus('eea2d4fd-a8b8-413b-9439-f06faaf7e109')
    .then(console.log);

// Slightly slower
client.getStatus('caykie')
    .then(console.log);
```

#### Fetch Guild:

You **MUST** provide a method on the Guild, depending on if you do it by the ID, Guild Member or Name.

```js
client.getGuild("CactiveNetwork", "name")
    .then(console.log);
```

#### Fetch SkyBlock Profile:

For this, you must specify a profile ID or player UUID to get multiple.

If you enter a username, it will still convert but slightly slower than normal.

```js
client.getSkyBlockProfile("eea2d4fd-a8b8-413b-9439-f06faaf7e109", "uuid")
    .then(console.log);
```

#### Fetch SkyBlock Auctions on Player:

Specify a Player, Profile or UUID then provide a method of 'uuid', 'player', or 'profile'.

You can provide a username, as said before it is slightly slower than normal.

```js
client.getSkyBlockAuctions("eea2d4fd-a8b8-413b-9439-f06faaf7e109", "uuid")
    .then(console.log);
```

#### Get Active SkyBlock Auctions:

Optionally specify a page, defaulting to 0 and see the active SkyBlock auctions.

```js
client.getActiveSkyBlockAuctions(0)
    .then(console.log);
```

## Resources:

#### Get Player Count:

You can get the Player Count of all of Hypixel or just certain gamemodes.

```js
client.getPlayerCounts
    .then(console.log);
```

#### Get Leaderboards:

Get all of the different gamemode leaderboards.

```js
client.getLeaderboards
    .then(console.log);
```

#### Get Punishment Statistics:

Get total and recent punishment statistics by staff & watchdog.

```js
client.getPunishmentStatistics
    .then(console.log);
```

#### Get Active Network Boosters:

Get the currently active network boosters that apply to all players.

```js
client.getActiveBoosters
    .then(console.log);
```

#### Get List of Achievements:

Get a list of all the achievements and related information.

```js
client.resourceAchievements
    .then(console.log);
```

#### Get List of Challenges:

Get a list of all the challenges and related information.

```js
client.resourceChallenges
    .then(console.log);
```

#### Get List of Quests:

Get a list of all the quests and related information.

```js
client.resourceQuests
    .then(console.log);
```

#### Get List of Guild Achievements:

Get a list of all the guild achievements and related information.

```js
client.resourceGuildAchievements
    .then(console.log);
```

#### Get List of Guild Permissions:

Get a list of all the guild permissions and related information.

```js
client.resourceGuildPermissions
    .then(console.log);
```

#### Get List of SkyBlock Collections:

Get a list of all the SkyBlock collections and related information.

```js
client.resourceSkyBlockCollections
    .then(console.log);
```

#### Get List of SkyBlock Skills:

Get a list of all the SkyBlock skills and related information.

```js
client.resourceSkyBlockSkills
    .then(console.log);
```

#### Get SkyBlock News:

Get a list of the SkyBlock news pages on the forums for game updates and bug fixes.

```js
client.getSkyBlockNews
    .then(console.log);
```

#### Get Ended SkyBlock Auctions:

Get a list of the ended SkyBlock auctions on the Hypixel Network.

```js
client.getEndedSkyBlockAuctions
    .then(console.log);
```

#### Get SkyBlock Bazaar:

Get SkyBlock Bazaar information.

```js
client.getSkyBlockBazaar
    .then(console.log);
```

## Additional Resources:

#### Convert Username or UUID to either:

Sends a request to Mojang to get the Username and or UUID.

```js
Hypixel.convertUser("eea2d4fd-a8b8-413b-9439-f06faaf7e109")
    .then(console.log); // caykie

// If you want to force something to be a UUID or Username do;

Hypixel.convertUser("eea2d4fd-a8b8-413b-9439-f06faaf7e109", "uuid")
    .then(console.log); // eea2d4fd-a8b8-413b-9439-f06faaf7e109
```

#### Added Dashes to UUID:

Does not send any requests and instantly adds dashes to a UUID if not done already.

```js
Hypixel.fixUUID("eea2d4fda8b8413b9439f06faaf7e109")
    .then(console.log); // eea2d4fd-a8b8-413b-9439-f06faaf7e109
```

#### Get Method of Converting to Name or UUID:

This will respond with either `uuid` or `name`.

```js
Hypixel.getMethod("eea2d4fda8b8413b9439f06faaf7e109")
    .then(console.log); // uuid

Hypixel.getMethod("eea2d4fd-a8b8-413b-9439-f06faaf7e109")
    .then(console.log); // uuid

Hypixel.getMethod("caykie")
    .then(console.log); // name
```
