const db = require('./configDB');

module.exports = {
    setChannel: (guildName, guildID, channelID) => {
        return new Promise(async (resolve, reject) => {
            db.get().collection(db.collections.CALL_CHANNEL).insertOne({ 
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
            const channel = await db.get().collection(db.collections.CALL_CHANNEL).findOne({ guildID: guildID });
            resolve(channel);
        });
    },
    removeChannel: (guildID) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(db.collections.CALL_CHANNEL).removeOne({ guildID: guildID }).then(() => {
                resolve();
            });
        });
    },
    updateChannel: (guildID, channelID) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(db.collections.CALL_CHANNEL).updateOne({ guildID: guildID }, {
                $set: { channelID: channelID }
            }).then(() => resolve());
        });
    },
    getAllChannels: async () => {
        const allChannels = await db.get().collection(db.collections.CALL_CHANNEL).find().toArray();
        return allChannels;
    }
}