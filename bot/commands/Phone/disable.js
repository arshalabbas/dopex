const { MessageEmbed } = require("discord.js");
const { getChannel, removeChannel } = require("../../Database/phoneChannel");
const { getPrefix } = require('../../Database/prefixes');
const { colors } = require("../../utils/tools");

module.exports.run = async (bot, message) => {
    const prefix = await getPrefix(message.guild.id) || bot.config.PREFIX;
    const channel = await getChannel(message.guild.id);
    if (!channel) {
        const embed = new MessageEmbed()
        .setTitle("Bruhh...")
        .setDescription("Didn't added a incoming channel yet")
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .setFooter(`${prefix} set, to set new channel`);

        message.channel.send(embed);
        return;
    }

    await removeChannel(message.guild.id).then(() => {
        const embed = new MessageEmbed()
        .setTitle("Disabled")
        .setDescription("Successfully disabled incoming calls")
        .setColor(colors[Math.floor(Math.random * colors.length)])
        .setFooter(`${prefix} set, to set new channel`);

        message.channel.send(embed);
    });

}

module.exports.help = {
    name: "disable",
    description: "disable the incoming call",
    aliases: ["remove"],
    permissions: ["MANAGE_GUILD"],
    category: "Phone"
}