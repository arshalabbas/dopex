const { eightBall } = require('luhv');

module.exports.run = (bot, message, args) => {
    if(!args.length) return message.reply("😑 How can I answer your question in your mind?")
    eightBall(answer => {
        message.channel.send(`🎱 **${answer}**`)
    })
}

module.exports.help = {
    name: "eightball",
    description: "Ask a question and get an answer!",
    aliases: ["8ball","ask", "8b"],
    usage: "<question>",
    category: "Fun"
}