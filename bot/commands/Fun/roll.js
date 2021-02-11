const { rollEmoji, rolling, expressions } = require("../../utils/tools");

module.exports.run = (bot, message, args) => {
    const expression = expressions[Math.floor(Math.random() * expressions.length)];
    if (args[0] === "1" || !args.length) {
        const number = Math.floor(Math.random() * 6) + 1;
        const die = rollEmoji(number);
        message.channel.send(rolling).then(msg => {
            setTimeout(() => {
                msg.edit(die).then(() => {
                    message.channel.send(`
                    **${message.author.username}** rolls a die.\n**${expression} It's ${number}!**
                    `);
                });
            }, 750);
        });
    } else {
        if (isNaN(args[0])) return message.reply("give a valid number!");
        if (args[0] >= 11) return message.reply(`It's too much dice (${args[0]}), I have only 10 dice :eyes:`);
        let rollDice = [];
        let numbers = [];
        let dice = [];
        for (i = 1; i <= args[0]; i++) {
            rollDice.push(rolling);
            numbers.push(Math.floor(Math.random() * 6) + 1);
        }

        numbers.forEach((die) => {
            dice.push(rollEmoji(die));
        });

        const sum = numbers.reduce((a, b) => {
            return a + b;
        });

        message.channel.send(rollDice.join(" ")).then(msg => {
            setTimeout(() => {
                msg.edit(dice.join(" ")).then(() => {
                    message.channel.send(`
                    **${message.author.username}** rolls ${args[0]} dice.\n**${expression} It's ${sum}!**
                    `);
                });
            }, 750);
        });
    }
}

module.exports.help = {
    name: "roll",
    description: "roll a die!",
    usage: "(number of dice)",
    category: "Fun"
}