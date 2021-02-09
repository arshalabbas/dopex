const { MONGO_DB } = require('../utils/keysExport');

const Keyv = require('keyv');

const prefixes = new Keyv(`sqlite://${__dirname}/prefixdb.sqlite`);

prefixes.on('error', err => console.log(`Can't able to connect Database\n${err}`));

module.exports = {
    getPrefix: async (guildID) => {
            const prefix = await prefixes.get(guildID);
            return prefix;
    },
    setPrefix: async (guildID, newPrefix) => {
           const guildPrefix = await prefixes.set(guildID, newPrefix);
           return guildPrefix;
    },
    resetPrefix: async (guildID) => {
        await prefixes.delete(guildID);
    }
}