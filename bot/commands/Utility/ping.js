const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');
module.exports.run = (bot, message) => {
    message.channel.send("**Pinging...**")
        .then(msg => {
            const ping = Math.round(bot.ws.ping);
            const pingEmb = new MessageEmbed()
                .setAuthor("Bot Latency")
                .setTitle(`📈 ${ping} ms`)
                .setColor(colors[Math.floor(Math.random() * colors.length)]);
            msg.edit("🏓 **Pong**", pingEmb);
        })
        .catch(err => console.log(err));
}

module.exports.help = {
    name: "ping",
    description: "Show the bot average latency",
    category: "Utility",
}