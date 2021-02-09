const { MessageEmbed } = require('discord.js');
const { getPrefix, setPrefix, resetPrefix } = require('../../Database/prefixes');
const { colors } = require('../../utils/tools');

module.exports.run = async (bot, message, args) => {
    const prefix = await getPrefix(message.guild.id) || bot.config.PREFIX;
    const embed = new MessageEmbed()
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .setFooter(`Set new: ${prefix} prefix <new prefix>\nReset: ${prefix} prefix reset`);

    if (!args.length) {
        embed.setDescription(`The currennt prefix is \`${prefix}\``);

        return message.channel.send(embed);
    }

    if (args[0].startsWith('do')) return message.reply(`Sorry, can't use a prefix that starts with \`${bot.config.PREFIX}\``);

    if (args[0] === 'reset') {
        await resetPrefix(message.guild.id);
        embed.setDescription(`Successfully reset the prefix\nNow the prefix is \`${bot.config.PREFIX}\``);
        return message.channel.send(embed);
    }

    if (args[0].length >= 5) return message.reply(`Prefix length (${args[0].length}) should be less than 5 characters`);

    const newPrefix = args[0];

    await setPrefix(message.guild.id, newPrefix);
    embed.setDescription(`Successfully set prefix to \`${args[0]}\``);

    message.channel.send(embed);
}

module.exports.help = {
    name: "prefix",
    description: "To set new Prefix for a server",
    usage: "<new Prefix (less than 5 characters)> | <reset>",
    category: "Settings",
    permissions: ["MANAGE_GUILD"]
}