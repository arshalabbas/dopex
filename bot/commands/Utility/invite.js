const { MessageEmbed } = require('discord.js');
const { colors, emojies } = require('../../utils/tools');

module.exports.run = (bot, message) => {
    const invite = `https://discord.com/oauth2/authorize?client_id=${bot.user.id}&scope=bot&permissions=8`

    const inviteEmb = new MessageEmbed()
        .setTitle("Invite Me")
        .setURL(invite)
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .setDescription("I hope I can be useful to you in your server!")
        .addFields(
            { name: "Invite me", value: `[Click Here...](${invite})` }
        )
        .setThumbnail(bot.user.displayAvatarURL())
        .setFooter("Thank You!");

    message.author.send(inviteEmb)
        .then(() => {
            message.react(emojies[Math.floor(Math.random() * emojies.length)]);
        })
        .catch(() => {
            message.reply("I can't able to dm you", inviteEmb);
        });
}

module.exports.help = {
    name: "invite",
    description: "for invite me to your server",
    category: "Utility"
}