module.exports.run = (bot, message, args) => {
    if(!args.length) return message.reply(`give a message after this command.\neg: \`${bot.config.PREFIX}say hello\``)
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