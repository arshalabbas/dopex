const { MessageEmbed } = require("discord.js");
const { colors } = require('../../utils/tools');
module.exports.run = (bot, message) => {

    const msg = bot.snipes.get(message.channel.id);

    if(!msg) return message.reply("I didn't detect any deleted message in this channel :cry:").then(msg => {
        msg.delete({ timeout: 3000 }).then(() => {
            message.delete();
        });
    });

    const embed = new MessageEmbed()
    .setAuthor(msg.author, msg.avatar)
    .setColor(colors[Math.floor(Math.random() * colors.length)])
    .setDescription(`Message: ${msg.content}`)
    .setFooter("Message get Sniped, LoL")
    .setTimestamp();

    message.channel.send(embed);
}

module.exports.help = {
    name: "snipe",
    description: "To detect last deleted message in a channel",
    category: "Fun"
}