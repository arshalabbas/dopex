module.exports.run = (bot, message) => {
    const caller = bot.caller.get(message.channel.id);
    if (!caller) return message.channel.send("You are not in a call");
    const connection = bot.callConnection.get(message.channel.id);
    const callerConnection = bot.callConnection.get(caller);

    message.channel.send("You hang up the call").then(() => {
        if (connection) connection.stop();
        if (callerConnection) callerConnection.stop();
        bot.callConnection.delete(message.channel.id);
        bot.callConnection.delete(caller);
        const channel2 = bot.channels.cache.get(caller);
        channel2.send("They hang up the call...");
        bot.caller.delete(message.channel.id);
    });
}

module.exports.help = {
    name: "hangup",
    description: "hang up the the call",
    aliases: ["end"],
    category: "Developer"
}