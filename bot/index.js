const { Client, Collection } = require("discord.js");

const { readdirSync } = require("fs");

const { sep, join } = require("path");

const { success, error, warning } = require("log-symbols");

const config = require('./utils/keysExport');

const client = new Client();

let commandNumber = [];
module.exports.run = () => {
    client.snipes = new Collection();
    client.config = config;
    client.phone = new Collection();
    client.caller = new Collection();
    client.callConnection = new Collection();

    ["commands", "aliases"].forEach(x => client[x] = new Collection());

    require('./utils/eventHandler') (client);

    const load = (dir = join(__dirname, "commands")) => {

        readdirSync(dir).forEach(dirs => {

            const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));


            for (const file of commands) {

                const pull = require(`${dir}/${dirs}/${file}`);

                if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
                    if (client.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}.`);

                    client.commands.set(pull.help.name, pull);

                    console.log(`${success} Loaded command ${pull.help.name}.`);
                    commandNumber.push(pull.help.name);

                }
                else {

                    console.log(`${error} Error loading command in ${dir}${dirs}. you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);

                    continue;
                }

                if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
                    pull.help.aliases.forEach(alias => {

                        if (client.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases ${alias}`);
                        client.aliases.set(alias, pull.help.name);
                    });
                }
            }

        });
    };

    load();
    client.login(config.TOKEN);
}

module.exports.client = client;
module.exports.length = commandNumber;
module.exports.dir = __dirname;