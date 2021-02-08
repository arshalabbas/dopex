const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');

module.exports.run = (bot, message, args) => {
    const properUsage = `Proper Usage: \`${bot.config.PREFIX}warn <user> <reason>\``
    if (!args.length) return message.reply(properUsage);

    const user = message.mentions.users.first();

    if (!user) return message.reply(properUsage);
    reason = null;
    if (args[0].startsWith("<@") && args[0].endsWith(">")) {
        if (!args[1]) return message.reply(properUsage);
        var reg = args;
        reg.shift();
        reason = reg;
    } else {
        var reg = args;
        reg.pop();
        reason = reg;
    }
    const warnEmb = new MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
        .setTitle(`⚠️ You have been warned from ${message.guild.name}...`)
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .addField("Warning Reason", reason.join(" "))
        .setFooter(`By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp();

    user.send(warnEmb).then(() => {
        const chEmb = new MessageEmbed()
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            .setTitle(`⚠️ ${user.username} has been warned...`);
        message.channel.send(chEmb);
    }).catch(err => {
        console.log(err);
        message.author.send("Something went wrong when I'm tried to warn the user.");
        message.react("796611167459606528");
    });
}

module.exports.help = {
    name: "warn",
    description: "Warn a given user",
    usage: "<user>",
    permissions: ["MANAGE_GUILD"],
    category: "Mod"
}