const { getPrefix } = require("../../Database/prefixes");

module.exports.run = async (bot, message, args) => {
    const prefix = await getPrefix(message.guild.id) || bot.config.PREFIX;
    if(!args.length) return message.reply(`give a message after this command.\neg: \`${prefix}say hello\``)
        .then(msg => {
            msg.delete({ timeout: 3000 });
        });
        const msg = args.join(" ");
        message.channel.send(msg)
        .then(() => {
            message.delete().catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
}

module.exports.help = {
    name: "say",
    description: "To send something with me.",
    permission: ["MANAGE_MESSAGES"],
    usage: "<content>",
    category: "Mod"
}