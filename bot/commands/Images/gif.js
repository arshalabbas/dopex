const { GIPHY_TOKEN } = require('../../utils/keysExport');

const Giphy = require('giphy-js-sdk-core');

const { MessageEmbed } = require('discord.js');
const { colors } = require('../../utils/tools');

const giphy = Giphy(GIPHY_TOKEN);

module.exports.run = (bot, message, args) => {
    if(!args.length) return message.reply("Give gif search query after the command");
    const query = args.join(" ");

    giphy.search('gifs', { q: query}).then((response) => {

        var totalResponse = response.data.length;
        var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponse;
        var responseFinal = response.data[responseIndex];
        var gifURL = responseFinal.images.fixed_height.url;
        const embed = new MessageEmbed()
        .setTitle(`result for ${query}`)
        .setURL(gifURL)
        .setImage(gifURL)
        .setColor(colors[Math.floor(Math.random() * colors.length)])
        .setFooter("Gifs by GIPHY", "https://i.ibb.co/F8CRT6D/giphy-461796.webp");

        message.channel.send(embed);
    }).catch(err => {
        message.reply("Something went wrong when try to generate gif :cry:");
        console.log(err);
    });

}

module.exports.help = {
    name: "gif",
    description: "search gifs from giphy",
    usage: "<search query>",
    category: "Images"
}