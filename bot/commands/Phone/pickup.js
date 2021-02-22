const { getPrefix } = require("../../Database/prefixes");

module.exports.run = async (bot, message) => {
    const prefix = await getPrefix(message.guild.id) || bot.config.PREFIX;
    const connection = bot.callConnection.get(message.channel.id);
    if (connection) return message.channel.send("You guys already in a call");
    const caller = bot.caller.get(message.channel.id);
    if (!caller) return message.channel.send("You didn't have any call to take");

    const channel1 = bot.channels.cache.get(message.channel.id);
    const channel2 = bot.channels.cache.get(caller);

    const card = {
        name: channel2.guild.name,
        channelID: channel2.id
    }

    bot.lastContact.set(message.author.id, card);

    channel2.send("They took the call **say hello**").then(() => {
        bot.caller.set(channel2.id, channel1.id);
        channel1.send("You took the call... **say hello**");

        const filter = msg => {
            if (msg.author.bot) return;
            return msg.content;
        }
        const collector = channel1.createMessageCollector(filter, { time: 600000 });
        bot.emit("pickup", done => {
            done(true);
        });
        bot.callConnection.set(channel1.id, collector);

        collector.on('collect', msg => {
            channel2.send(`**${msg.author.username}**: ${msg.content}`);
        });

        collector.on('end', () => {
            message.channel.send(`Call Ended\nYou can save this contact by using \`${prefix} save\``);
        });
    });
}

module.exports.help = {
    name: "pickup",
    description: "take the incoming call",
    aliases: ["take"],
    category: "Phone"
}