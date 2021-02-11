const { readdirSync, rm } = require('fs');
const { join } = require('path');
const { dir, client } = require('../../bot');
module.exports.getCategory = (categoryName) => {
    let commandDetails = [];
    const commands = readdirSync(join(dir, "commands", categoryName)).filter(files => files.endsWith(".js"));
    commands.forEach(command => {
        const rmExt = command.slice(0, -3);
        const cmd = client.commands.get(rmExt).help;
        commandDetails.push(cmd);
    });
    return commandDetails;
}