const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!args.length) {
        const avatar = message.author.displayAvatarURL({ dynamic: true });
        const attach = new MessageAttachment(avatar);

        message.channel.send(attach);
    } else {
        const user = message.mentions.users.first();
        const avatar = user.displayAvatarURL({ dynamic: true });
        const attach = new MessageAttachment(avatar);

        message.channel.send(attach);
    }
}

module.exports.help = {
    name: "avatar",
    description: "I will show your avatar",
    usage: "(user)",
    category: "Images"
}