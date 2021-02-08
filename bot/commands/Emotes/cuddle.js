const { cuddle } = require('discord-emotes');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');

module.exports.run = (bot, message, args) => {
    if(!args.length) return message.reply("Who do you want to cuddle? 🤨");

    const user = message.mentions.users.first();

    cuddle().then((gif) => {
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} cuddles ${user.username}`)
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
    name: "cuddle",
    description: "cuddles a given user",
    usage: "<user> (message)",
    category: "Emotes"
}