const { truth } = require('luhv');
const { truthEmoji } = require('../../utils/tools');

module.exports.run = (bot, message) => {
    truth(question => {
        const oneEmoji = truthEmoji[Math.floor(Math.random() * truthEmoji.length)];
        message.channel.send(`${oneEmoji} **${question}** ${oneEmoji}`);
    });
}

module.exports.help = {
    name: "truth",
    description: "Truth question",
    category: "Fun"
}