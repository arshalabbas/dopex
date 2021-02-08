const tts = require('discord-tts');

module.exports.run = async (bot, message, args) => {
    if (!args.length) return message.reply("what will I say? 😑, give something after this command");

    const broadcast = bot.voice.createBroadcast();
    var channelId = message.member.voice.channelID;
    if (!channelId) return message.reply("You need to join vc");

    var channel = bot.channels.cache.get(channelId);

    const permissions = channel.permissionsFor(bot.user);
    if (!permissions.has("CONNECT"))
        return message.reply("Cannot connect to voice channel, missing permissions");
    if (!permissions.has("SPEAK"))
        return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

    const content = args.join(" ");
    if (content.length > 200) return message.reply(`Text length (${content.length}) should be less than 200 characters`);
    await channel.join().then(connection => {
        message.react("🔊");
        broadcast.play(tts.getVoiceStream(content));
        const dispatcher = connection.play(broadcast);

        dispatcher.on('finish', async () => {
            await channel.leave();
        });
    });
}

module.exports.help = {
    name: "tts",
    description: "Text-To-Speech",
    usage: "<texts (less than 200 characters)>",
    category: "Soundboard"
}