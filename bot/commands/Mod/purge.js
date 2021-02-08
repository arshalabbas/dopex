module.exports.run = (bot, message, args) => {
    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount)) {
        return message.reply('that doesn\'t seem to be a valid number.');
    } else if (amount <= 1 || amount > 100) {
        return message.reply('you need to input a number between 1 and 99.');
    }

    message.channel.bulkDelete(amount, true)
        .then(() => {
            message.channel.send(`**Cleared \`${args[0]}\` message(s)**`)
                .then(msg => {
                    msg.delete({ timeout: 3000 });
                });
        })
        .catch(err => {
            console.error(err);
            message.channel.send('there was an error trying to prune messages in this channel!');
        });
}

module.exports.help = {
    name: "purge",
    description: "To purge channel's chats",
    aliases: ["clear", "delete", "prune"],
    usage: "<amount>",
    permissions: ["MANAGE_MESSAGES"],
    category: "Mod"
}