const dig = require('discord-image-generation');
const { MessageAttachment } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if(!args.length) {
        const avatar = message.author.displayAvatarURL({ dynamic: false, format: 'png'});
        const image = await new dig.Bobross().getImage(avatar);
        const attach = new MessageAttachment(image, 'bob.png');

        message.channel.send(attach);
    } else {
        const user = message.mentions.users.first();
        const avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
        const image = await new dig.Bobross().getImage(avatar);
        const attach = new MessageAttachment(image, 'bob.png');

        message.channel.send(attach);
    }
}

module.exports.help = {
    name: "bob",
    description: "generate a bobross drawing image",
    usage: "(user)",
    category: "Images"
}