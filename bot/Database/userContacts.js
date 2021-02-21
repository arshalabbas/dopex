const db = require('./configDB');

module.exports = {
    saveContact: (userID, card) => {
        return new Promise(async (resolve, reject) => {
            const user = await db.get().collection(db.collections.CONTACTS).findOne({ userID: userID });
            if (user) {
                if (user.contacts.includes(card)) return reject();
                const contacts = user.contacts.push(card);
                await db.get().collection(db.collections.CONTACTS).updateOne({ userID: userID }, {
                    $set: { contacts: contacts }
                }).then(() => {
                    resolve();
                })
            }
            else {
                const contacts = [card];
                await db.get().collection(db.collections.CONTACTS).insertOne({ userID: userID, contacts }).then(() => {
                    resolve();
                });
            }
        });
    }
}