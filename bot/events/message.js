const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

module.exports = async message => {
    const content = message.content.toLowerCase();
    const prefix = message.client.config.PREFIX;
    const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(content)) return;
    const [, matchedPrefix] = content.match(prefixRegex);
    const args = content.slice(matchedPrefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command;

    if (message.author.bot || !message.guild) return;

    if (!message.member) message.member = await message.guild.fetchMember(message.author);

    if (!content.startsWith(matchedPrefix)) return;

    if (cmd.length === 0) return;
    if (message.client.commands.has(cmd)) command = message.client.commands.get(cmd);
    else if (message.client.aliases.has(cmd)) command = message.client.commands.get(message.client.aliases.get(cmd));
    if(!command) return;
    if(command.help.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.help.permissions)) {
			return message.reply("🚫 You can't use this command.");
		}
    }

    if (command) command.run(message.client, message, args);
}