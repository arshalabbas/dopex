const { MessageEmbed } = require("discord.js");
const { getPrefix } = require("../../Database/prefixes");
const { colors } = require('../../utils/tools');

module.exports.run = async (bot, message) => {
    const prefix = await getPrefix(message.guild.id) || bot.config.PREFIX;
    const guild = message.guild;

    const embed = new MessageEmbed()
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL())
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .addFields(
            { name: "MY PREFIX HERE", value: `\`${prefix}\`` },
            { name: "OWNER", value: `<@${guild.ownerID}>` },
            { name: "GUILD ID", value: guild.id },
            { name: "REGION", value: guild.region, inline: true },
            { name: "TOTAL MEMBERS", value: guild.memberCount, inline: true },
            { name: "MEMBERS", value: guild.members.cache.filter(m => !m.user.bot).size, inline: true },
            { name: "BOTS", value: guild.members.cache.filter(m => m.user.bot).size, inline: true },
            { name: "ROLES COUNT", value: guild.roles.cache.size, inline: true },
            { name: "EMOJIES COUNT", value: guild.emojis.cache.size, inline: true }
        )
        .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL())
        .setTimestamp();

    message.channel.send(embed);
}

module.exports.help = {
    name: "server",
    description: "To get server details",
    category: "Utility"
}