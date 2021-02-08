module.exports = (message) => {
    if (message.author.bot) return;
   message.client.snipes.set(message.channel.id, {
       content: message.content,
       author: message.author.tag,
       avatar: message.author.displayAvatarURL(),
       member: message.member,
       image: message.attachments.first() ? message.attachments.first().proxyURL : null
   });
}