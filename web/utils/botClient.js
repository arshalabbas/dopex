const { readdirSync } = require('fs');
const { join } = require('path');
const { dir, length } = require('../../bot');
index = 0;
module.exports = {
    commands(client) {
        let commandsList = [];
        const categories = readdirSync(join(dir, "commands"), 'utf-8');
        categories.forEach(category => {
            const dir = client.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
            const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

            try {
                if (dir.size === 0) return;
                else if (category !== "Developer") {
                    commandsList.push({ category: capitalise, command: dir.map(c => c.help.name) });
                }
            }
            catch (err) {
                console.log(err);
            }
        });
        return commandsList;
    },

    gatherDetails(client) {
        const details = {
            name: client.user.username,
            image: client.user.displayAvatarURL(),
            clientID: client.user.id,
            latency: client.ws.ping,
            servers: client.guilds.cache.size,
            commandLength: length.length
        }
        return details;
    }
}