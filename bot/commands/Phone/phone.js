const { MessageEmbed } = require('discord.js');
const { getAllChannels } = require('../../Database/phoneChannel');
const { getPrefix } = require('../../Database/prefixes');

const { navigation, util } = require("../../utils/Phone/phoneUI");

const { colors } = require('../../utils/tools');

module.exports.run = async (bot, message) => {
    const prefix = await getPrefix(message.guild.id) || bot.config.PREFIX;
    const connection = bot.callConnection.get(message.channel.id);
    if (connection) return message.channel.send("You guys are in a call...\n*So can't able to use phone right now...*");
    var status = false;
    util.channels = await getAllChannels();
    const active = await bot.phone.get(message.author.id);
    if (active) active.stop();
    util.client = bot;
    const phoneEmb = new MessageEmbed()
        .setAuthor("Dopex Phone")
        .setColor(colors[Math.floor(Math.random() * colors.length)]);
    phoneEmb.setImage("https://i.ibb.co/X8pcm8k/dopex-logo.jpg");
    phoneEmb.setTitle("Loading...");
    function footer() {
        //date
        var d = new Date();

        //time objects
        var hour = d.getHours();
        if (hour < 10) {
            hour = `0${hour}`;
        }
        var minute = d.getMinutes();
        if (minute < 10) {
            minute = `0${minute}`;
        }

        //date objects
        var day = d.getDate();
        if (day < 10) {
            day = `0${day}`;
        }
        var month = d.getMonth() + 1;
        if (month < 10) {
            month = `0${month}`;
        }
        var year = d.getFullYear();

        //final time
        var time = `${hour}:${minute}`;
        //final date
        var date = `${day}/${month}/${year}`;
        //latency
        var ping = Math.round(bot.ws.ping);

        phoneEmb.setFooter(`📶 ${ping}ms  🕓 ${time}  📅 ${date}`, message.author.displayAvatarURL());
    }

    function errorFooter(errorMessage) {
        phoneEmb.setFooter(errorMessage, message.author.displayAvatarURL());
        phoneUI.edit(phoneEmb);
        setTimeout(() => {
            footer();
            phoneUI.edit(phoneEmb);
        }, 2500);
    }

    footer();
    const phoneUI = await message.channel.send(phoneEmb);
    var items = navigation();
    phoneEmb.setTitle("Menu");
    phoneEmb.setDescription(items);
    setTimeout(() => {
        phoneEmb.setImage("");
        phoneUI.edit(phoneEmb);
    }, 1500);
    await phoneUI.react("⬅️");
    await phoneUI.react("🔺");
    await phoneUI.react("🔴");
    await phoneUI.react("🔻");
    await phoneUI.react("📞");

    const filter = (reaction, user) => user.id !== bot.user.id;
    const collector = phoneUI.createReactionCollector(filter, { time: 60000 });

    collector.on('collect', async (reaction, user) => {
        await bot.phone.set(message.author.id, collector);
        util.collector = collector;
        if (user.id !== message.author.id) {
            reaction.users.remove(user);
            return;
        }
        switch (reaction.emoji.name) {

            case ("🔺"):
                reaction.users.remove(user);
                var items = navigation("🔺");
                footer();
                phoneEmb.setDescription(items);
                phoneUI.edit(phoneEmb);
                break;

            case ("🔻"):
                reaction.users.remove(user);
                var items = navigation("🔻");
                footer();
                phoneEmb.setDescription(items);
                phoneUI.edit(phoneEmb);
                break;

            case ("🔴"):
                reaction.users.remove(user);
                var items = navigation("🔴", collector);
                footer();
                phoneEmb.setTitle(items.title);
                phoneEmb.setDescription(items.options);
                phoneUI.edit(phoneEmb);
                break;

            case ("⬅️"):
                reaction.users.remove(user);
                var items = navigation("⬅️");
                if (!items) return;
                footer();
                phoneEmb.setTitle(items.title);
                phoneEmb.setDescription(items.options);
                phoneUI.edit(phoneEmb);
                break;

            case ("📞"):
                reaction.users.remove(user);
                const call = navigation("📞");
                footer();
                function callFunction(reciever) {
                    const channel1 = bot.channels.cache.get(message.channel.id);
                    const channel2 = bot.channels.cache.get(reciever);
                    status = true;
                    collector.stop();
                    phoneEmb.setTitle("Ringing...");
                    phoneEmb.setDescription(`Calling to ${channel2.guild.name}`);
                    phoneEmb.setFooter("Wait for there responds...");
                    phoneUI.edit(phoneEmb).then(async () => {
                        const callerPrefix = await getPrefix(channel2.guild.id) || bot.config.PREFIX;
                        const recieverEmb = new MessageEmbed()
                            .setAuthor("Dopex Phone")
                            .setTitle("You have a call...")
                            .setDescription(`${channel1.guild.name}\n${channel1.guild.region}`)
                            .setFooter(`Pickup: ${callerPrefix} pickup\nHangup: ${callerPrefix} hangup`);

                        channel2.send(recieverEmb).then(() => {
                            bot.caller.set(channel2.id, channel1.id);
                            const filter = msg => {
                                if (msg.author.bot) return;
                                return msg.content;
                            }

                            const collect = channel1.createMessageCollector(filter, { time: 600000 });

                            collect.on('collect', msg => {
                                const connection = bot.callConnection.get(channel2.id);
                                if (!connection) return;
                                bot.callConnection.set(channel1.id, collect);
                                channel2.send(`**${msg.author.username}**: ${msg.content}`);
                            });

                            collect.on('end', () => {
                                message.channel.send(`Call Ended\nYou can save this contact by using \`${prefix} save\``);
                            });
                        });
                    });
                }
                if (call === 'global') {
                    const allChannels = util.channels.filter(ch => ch.guildID !== message.guild.id);
                    if (!allChannels.length) return errorFooter("No channels were found");
                    callFunction(allChannels[Math.floor(Math.random() * allChannels.length)].channelID);
                }
                break;
            default:
                reaction.users.remove(user);
        }
        collector.on('end', () => {
            phoneUI.reactions.removeAll();
            bot.phone.delete(message.author.id);
            if (status) return;
            setTimeout(() => {
                phoneEmb.setTitle("Switched off");
                phoneEmb.setDescription("👋🏻 Good Bye");
                phoneUI.edit(phoneEmb);
            }, 1000);
        });
    });
}

module.exports.help = {
    name: "phone",
    description: "A dopex phone with calling feature",
    category: "Phone"
}