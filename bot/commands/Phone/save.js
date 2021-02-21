const { saveContact } = require("../../Database/userContacts");

module.exports.run = async (bot, message) => {
    const card = bot.lastContact.get(message.author.id);
    if (!card) return message.reply("Sorry, I can't able to fetch the last call\n*Make a call and try again*");

    await saveContact(message.author.id, card).then(() => {
        message.reply("saved...");
    }).catch(() => {
        message.reply("this contact already in your contact list");
    });
}

module.exports.help = {
    name: "save",
    description: "save last calls details to your contacts",
    aliases: ["add"],
    category: "Phone"
}