module.exports.run = (bot, message) => {
    const connection = bot.callConnection.get(message.channel.id);
    if (connection) return message.channel.send("You guys already in a call");
    const caller = bot.caller.get(message.channel.id);
    if (!caller) return message.channel.send("You didn't have any call to take");

    const channel1 = bot.channels.cache.get(message.channel.id);
    const channel2 = bot.channels.cache.get(caller);

    channel2.send("They took the call **say hello**").then(() => {
        bot.caller.set(channel2.id, channel1.id);
        channel1.send("You took the call... **say hello**");

        const filter = msg => {
            if (msg.author.bot) return;
            return  msg.content;
        }
        const collector = channel1.createMessageCollector(filter);
        bot.callConnection.set(channel1.id, collector);

        collector.on('collect', msg => {
            channel2.send(`**${msg.author.username}**: ${msg.content}`);
        });
    });
}

module.exports.help = {
    name: "pickup",
    description: "take the incoming call",
    aliases: ["take"],
    category: "Phone"
}