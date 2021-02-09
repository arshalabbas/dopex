const { flames } = require('luhv');

module.exports.run = (bot, message, args) => {
    if (!args.length) return message.reply("please provide names");

    function subStr(string, character, position) {
        if (position == 'b')
            return string.substring(string.indexOf(character) + 1);
        else if (position == 'a')
            return string.substring(0, string.indexOf(character));
        else
            return string;
    }

    function userMention(mention) {
        if(!mention) return;
        if(mention.startsWith('<@') && mention.endsWith('>')) {
            mention = mention.slice(2, -1);

            if(mention.startsWith('!')) {
                mention = mention.slice(1);
            }

            const user = bot.users.cache.get(mention);
            return user.name;
        } else {
            return mention;
        }
    }

    function checkFl(give, name, author) {
        if (give === 'friends') {
            return `🤗 **${name} is ${author}'s Friend** 🤗`;
        } else if (give === 'lover') {
            return `💗 **${name} loves ${author}** 💗`;
        } else if (give === 'affection') {
            return `💖 **${name} attracted towards ${author}** 💖`;
        } else if (give === 'marriage') {
            return `💍 **${author} will get Married to ${name}** 💍`
        } else if (give === 'enemy') {
            return `👿 **${name} is ${author}'s sworn Enemy** 👿`
        } else if (give === 'sister') {
            return `👧 **${name} is ${author}'s sister** 👧`;
        }
    }

    if (!args.includes("|")) {
        const mention = message.mentions.users.first();
        if (mention) {
            const name = mention.username;
            flames(message.author.username, name, (result) => {
                const final = checkFl(result, name, message.author.username);
                message.channel.send(final);
            }, err => {
                message.reply("😑 The given names are same");
            });
        } else {
            const name = args.join(" ");
            flames(message.author.username, name, (result) => {
                const final = checkFl(result, name, message.author.name);
                message.channel.send(final);
            }, err => {
                message.reply("😑 The given names are same");
            });
        }
    } else {
        const content = args.join(" ");

        const mention1 = subStr(content, '|', 'a');
        const mention2 = subStr(content, '|', 'b');

        const user1 = userMention(mention1);
        const user2 = userMention(mention2);

        flames(user1, user2, result => {
            const final = checkFl(result, user2, user1);
            message.channel.send(final);
        }, err => {
            message.reply("😑 The given names are same");
        });

    }
}

module.exports.help = {
    name: "flames",
    description: "Play flames game",
    usage: "<user1> | <user2>",
    category: "Fun"
}