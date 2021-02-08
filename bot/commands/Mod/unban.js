const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');
index = 1;

module.exports.run = (bot, message, args) => {
    const usersID = [];
    message.guild.fetchBans().then(bans => {
        const list = bans.array();
        if (!list.length) return message.reply("No one in banned list.");
        list.forEach(ID => {
            usersID.push(ID.user.id);
        });
        if (!args.length) {
            const listEmb = new MessageEmbed()
                .setTitle(`${message.guild.name}'s Banned Members list`)
                .setDescription(`use \`${bot.config.PREFIX}unban (index)\` to unban.`)
                .setColor(colors[Math.floor(Math.random() * colors.length)])
                .setTimestamp();
            list.forEach(unban => {
                listEmb.addField(
                    `${index++}) ${unban.user.username}`,
                    unban.user.id
                );
            });
            message.channel.send(listEmb).then(() => {
                index = 1;
            });
        } else {
            if (!isNaN(args[0])) {
                const indexOne = args[0] - 1;
                if (indexOne > usersID.length) return message.reply("No user in this index.");
                message.guild.members.unban(usersID[indexOne]).then(() => {
                    const unbanEmb = new MessageEmbed()
                        .setTitle(`The selected user has been unbaned...`)
                        .setColor(colors[Math.floor(Math.random() * colors.length)])
                        .setTimestamp();
                    message.channel.send(unbanEmb);
                }).catch(() => {
                    message.reply("I can't able to unban this user :cry:")
                });
            }
        }
    });
}

module.exports.help = {
    name: "unban",
    description: "Unban a user from unbanned list",
    usage: "(index)",
    permissions: ["BAN_MEMBERS"],
    category: "Mod"
}