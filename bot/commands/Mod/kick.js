const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');

module.exports.run = async (bot, message, args) => {
    const user = message.mentions.users.first();
        const member = message.guild.member(user);
        const missMsg = `mention a user to kick!\nUsage: \`${bot.config.PREFIX}kick <user> (reason)\``;
        if (!args.length) return message.reply(missMsg);
        if (!user) return message.reply(missMsg);
        if (!member) return message.reply("The mentioned user is not in this guild.");
        const informEmb = new MessageEmbed()
            .setAuthor(user.username, user.displayAvatarURL({ dynamic: true }))
            .setTitle(`I'm going to Kick you from ${message.guild.name} Server`)
            .setColor(colors[Math.floor(Math.random() * colors.length)])
            .setFooter(`By ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true }));
        reason = null;
        if (!args[1]) {
            reason = "";
        } else {
            var content = args;
            content.shift();
            reason = content.join(" ");
            informEmb.addField("Reason", reason);
        }
        await user.send(informEmb)
        .catch(() => {

        });
        member.kick(reason)
            .then(() => {
                const chEmb = new MessageEmbed()
                    .setColor(colors[Math.floor(Math.random() * colors.length)])
                    .setTitle(`:wave: ${user.username} has been kicked...`)
                    .setTimestamp();

                    if(args[1]) chEmb.addField("Reason", reason);
                message.channel.send(chEmb);
            }).catch(err => {
                console.log(err);
                message.reply("I can't able to kick this user :cry:");
            });
}

module.exports.help = {
    name: "kick",
    description: "Kick a given user",
    usage: "<user> (reason)",
    permissions: ["KICK_MEMBERS"],
    category: "Mod"
}