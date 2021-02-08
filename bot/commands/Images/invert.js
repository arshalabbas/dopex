const dig = require('discord-image-generation');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!args.length) {
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png'});
        const image = await new dig.Invert().getImage(avatar);
        const attach = new MessageAttachment(image, 'invert.png');

        message.channel.send(attach);
    } else {
        const user = message.mentions.users.first();
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        const image = await new dig.Invert().getImage(avatar);
        const attach = new MessageAttachment(image, 'invert.png');

        message.channel.send(attach);
    }
}

module.exports.help = {
    name: "invert",
    description: "generate inverted avatar image",
    usage: "(user)",
    category: "Images"
}