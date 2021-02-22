const { contacts } = require('../utils/Phone/sections');
const db = require('./configDB');

module.exports = {
    saveContact: (userID, card) => {
        return new Promise(async (resolve, reject) => {
            const user = await db.get().collection(db.collections.CONTACTS).findOne({ userID: userID });
            if (user) {
                const contact = user.contacts.some(cont => cont.channelID === card.channelID);
                if (contact) return reject();
                await db.get().collection(db.collections.CONTACTS).updateOne({ userID: userID }, {
                    $push: { contacts: card }
                }).then(() => {
                    resolve();
                });
            }
            else {
                const contacts = [card];
                await db.get().collection(db.collections.CONTACTS).insertOne({ userID: userID, contacts: contacts }).then(() => {
                    resolve();
                });
            }
        });
    },
    getContact: (userID) => {
        return new Promise(async (resolve, reject) => {
            const user = await db.get().collection(db.collections.CONTACTS).findOne({ userID: userID });
            resolve(user.contacts);
        });
    },
    deleteContact: (userID, channelID) => {
        return new Promise(async (resolve, reject) => {
            await db.get().collection(db.collections.CONTACTS).updateOne({ userID: userID }, {
                $pull: { contacts: { channelID: channelID } }
            });
        });
    }
}