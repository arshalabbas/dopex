const { MessageEmbed } = require("discord.js");
const { colors } = require('../../utils/tools');
module.exports.run = (bot, message) => {
    const guild = message.guild;

    const embed = new MessageEmbed()
        .setTitle(guild.name)
        .setThumbnail(guild.iconURL())
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .addFields(
            { name: "Owner", value: `<@${guild.ownerID}>` },
            { name: "ID", value: guild.id },
            { name: "Region", value: guild.region, inline: true },
            { name: "Total Members", value: guild.memberCount, inline: true },
            { name: "Members", value: guild.members.cache.filter(m => !m.user.bot).size, inline: true },
            { name: "Bots", value: guild.members.cache.filter(m => m.user.bot).size, inline: true },
            { name: "Roles Count", value: guild.roles.cache.size, inline:true },
            { name: "Emoji Count", value: guild.emojis.cache.size, inline: true }
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