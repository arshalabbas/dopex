const db = require('./configDB');

module.exports = {
    setChannel: (guildName, guildID, channelID) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection('callChannel').insertOne({ 
                 guildName: guildName,
                 guildID: guildID,
                 channelID: channelID
             }).then(data => {
                resolve();
            });
        });
    },
    getChannel: (guildID) => {
        return new Promise(async (resolve, reject) => {
            const channel = await db.get().collection('callChannel').findOne({ guildID: guildID });
            resolve(channel);
        });
    },
    updateChannel: (guildID, channelID) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection('callChannel').updateOne({ guildID: guildID }, {
                $set: { channelID: channelID }
            }).then(() => resolve());
        });
    },
    getAllChannels: async () => {
        const allChannels = await db.get().collection('callChannel').find().toArray();
        return allChannels;
    }
}