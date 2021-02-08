const { dir } = require("../..");

module.exports.run = async (bot, message) => {
    const channel = message.member.voice.channel;

    const permissions = channel.permissionsFor(bot.user);
    if (!permissions.has("CONNECT"))
        return message.reply("Cannot connect to voice channel, missing permissions");
    if (!permissions.has("SPEAK"))
        return message.reply("I cannot speak in this voice channel, make sure I have the proper permissions!");

    if (channel) {
        const connection = await channel.join();
        message.react("🔊");
        const dispatcher = connection.play(`${dir}/utils/soundboards/cj.mp3`);


        dispatcher.on('finish', async () => {
            await channel.leave();
        });
    } else {
        message.reply("Need to join vc to use this command");
    }
}

module.exports.help = {
    name: "cj",
    description: "play 'Here we go again' meme sound in vc",
    category: "Soundboard"
}