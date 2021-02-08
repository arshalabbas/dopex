const { slap } = require('discord-emotes');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');

module.exports.run = (bot, message, args) => {
    if(!args.length) return message.reply("Who do you want to slap? 🤨");

    const user = message.mentions.users.first();

    slap().then((gif) => {
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} slapping ${user.username}`)
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .setImage(gif);

        if(args[1]) {
            const content = args;
            content.shift();
            embed.setDescription(`"${content.join(" ")}"`);
        }
        message.channel.send(embed);
    });
}

module.exports.help = {
    name: "slap",
    description: "slaps a given user",
    usage: "<user> (message)",
    category: "Emotes"
}