const { tickle } = require('discord-emotes');
const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');

module.exports.run = (bot, message, args) => {
    if(!args.length) return message.reply("Who do you want to tickle? 🤨");

    const user = message.mentions.users.first();

    tickle().then((gif) => {
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username} tickling ${user.username}`)
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
    name: "tickle",
    description: "tickles a given user",
    usage: "<user> (message)",
    category: "Emotes"
}