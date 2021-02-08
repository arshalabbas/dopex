const { dare } = require('luhv');
const { truthEmoji } = require('../../utils/tools');

module.exports.run = (bot, message) => {
    dare(question => {
        const oneEmoji = truthEmoji[Math.floor(Math.random() * truthEmoji.length)];
        message.channel.send(`${oneEmoji} **${question}** ${oneEmoji}`);
    });
}

module.exports.help = {
    name: "dare",
    description: "Dare Challenge!",
    category: "Fun"
}