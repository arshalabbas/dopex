module.exports.run = (bot, message, args) => {

    if (!args.length) return message.reply("❌ give me something to operate!")
        .then(msg => {
            msg.delete({ timeout: 3000 });
        })
        .catch(err => {
            console.log(err);
        });

    const question = args.join("");

    try {
        var result = eval(question);
        message.channel.send(`🧮 **${message.author.username}**, answer is **${result}**!`)
            .catch(err => console.log(err));
    } catch {
        message.reply("😑 I got wrong Syntax")
            .then((msg) => {
                msg.delete({ timeout: 3000 });
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports.help = {
    name: "math",
    description: "Add an expression for me to solve!",
    aliases: ["calc", "operate"],
    category: "Utility",
    usage: "<5+5>"
}