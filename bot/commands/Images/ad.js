const dig = require('discord-image-generation');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!args.length) {
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png'});
        const image = await new dig.Ad().getImage(avatar);
        const attach = new MessageAttachment(image, 'ad.png');

        message.channel.send(attach);
    } else {
        const user = message.mentions.users.first();
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        const image = await new dig.Ad().getImage(avatar);
        const attach = new MessageAttachment(image, 'ad.png');

        message.channel.send(attach);
    }
}

module.exports.help = {
    name: "ad",
    description: "avatar image as ad",
    usage: "(user)",
    category: "Images"
}