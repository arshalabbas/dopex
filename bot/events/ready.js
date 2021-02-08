const { stat } = require('../utils/tools');
const { STAT_CHANNEL } = require('../utils/keysExport');

module.exports = client => {
    console.log(`${client.user.username} Online!`);
    client.user.setActivity(`${client.config.PREFIX} help | Dopex Bot`);
    const statChannel = client.channels.cache.get(STAT_CHANNEL);
    statChannel.bulkDelete(5, true);
    statChannel.send("Loading...").then(msg => {
        stat(client, result => {
            msg.edit(result);
        });
    });
}