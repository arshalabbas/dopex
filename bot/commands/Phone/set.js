const { MessageEmbed } = require("discord.js");
const { setChannel, getChannel, updateChannel } = require("../../Database/phoneChannel");
const { colors } = require("../../utils/tools");

module.exports.run = async (bot, message, args) => {
    var status;
    var update;
    const embed = new MessageEmbed()
        .setTitle("Incoming call channel")
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .setFooter("There is 15 seconds...");

    if (!args.length) {
        const channelID = message.channel.id;
        embed.setDescription(`Can I take this channel for incoming calls?`);

        const confirm = await message.channel.send(embed);
        await confirm.react("✔️");
        await confirm.react("✖️");

        const filter = (reaction, user) => user.id !== bot.user.id;
        const collector = confirm.createReactionCollector(filter, { time: 10000 });

        collector.on("collect", async (reaction, user) => {
            if (user.id !== message.author.id) return reaction.users.remove(user);
            switch (reaction.emoji.name) {
                case ("✔️"):
                    status = "done";
                    const check = await getChannel(message.guild.id);
                    if (check) {
                        await updateChannel(message.guild.id, channelID).then(() => {
                            update = true;
                            collector.stop();
                        });
                    } else {
                        await setChannel(message.guild.name, message.guild.id, channelID).then(() => {
                            update = false;
                            collector.stop();
                        });
                    }
                    break;
                case ("✖️"):
                    status = "cancel";
                    collector.stop();
                    break;

                default:
                    reaction.users.remove(user);
                    break;
            }
        });

        collector.on("end", () => {
            if (status === 'cancel') {
                embed.setDescription("Operation Cancelled");
                confirm.edit(embed)
            }
            else if (status === 'done') {
                if (update) {
                    embed.setDescription(`Channel Updated to <#${channelID}>`);
                    confirm.edit(embed);
                } else {
                    embed.setDescription(`Channel set to <#${channelID}>`);
                    confirm.edit(embed);
                }
            }
            else {
                embed.setDescription("Times up :(");
                confirm.edit(embed);
            }
        });
    } else {
        function fixId(channelID) {
            if (!channelID) return;
            if (channelID.startsWith("<#") && channelID.endsWith(">")) {
                channelID = channelID.slice(2, -1);
                return channelID;
            } else {
                return channelID;
            }
        }

        const channelID = fixId(args[0]);

        const channel = bot.channels.cache.get(channelID);

        if (!channel || channel.guild.id !== message.guild.id || channel.deleted || channel.type !== 'text') {
            embed.setDescription("The given channel is invalid :(");
            message.channel.send(embed);
            return;
        }

        embed.setDescription(`Can I use the channel <#${channelID}> for incoming calls?`);

        const confirm = await message.channel.send(embed);
        await confirm.react("✔️");
        await confirm.react("✖️");

        const filter = (reaction, user) => user.id !== bot.user.id;
        const collector = confirm.createReactionCollector(filter, { time: 10000 });

        collector.on("collect", async (reaction, user) => {
            if (user.id !== message.author.id) return reaction.users.remove(user);
            switch (reaction.emoji.name) {
                case ("✔️"):
                    status = "done";
                    const check = await getChannel(message.guild.id);
                    if (check) {
                        await updateChannel(message.guild.id, channelID).then(() => {
                            update = true;
                            collector.stop();
                        });
                    } else {
                        await setChannel(message.guild.name, message.guild.id, channelID).then(() => {
                            update = false;
                            collector.stop();
                        });
                    }
                    break;
                case ("✖️"):
                    status = "cancel";
                    collector.stop();
                    break;

                default:
                    reaction.users.remove(user);
                    break;
            }
        });

        collector.on("end", () => {
            if (status === 'cancel') {
                embed.setDescription("Operation Cancelled");
                confirm.edit(embed)
            }
            else if (status === 'done') {
                if (update) {
                    embed.setDescription(`Channel Updated to <#${channelID}>`);
                    confirm.edit(embed);
                } else {
                    embed.setDescription(`Channel set to <#${channelID}>`);
                    confirm.edit(embed);
                }
            }
            else {
                embed.setDescription("Times up :(");
                confirm.edit(embed);
            }
        });
    }
}

module.exports.help = {
    name: "set",
    description: "set the incoming call channel",
    usage: "(channel)",
    aliases: ["channel", "ch"],
    permissions: ["MANAGE_GUILD"],
    category: "Phone"
}