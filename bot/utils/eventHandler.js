const { client } = require("..");

const reqEvent = (event) => require(`../events/${event}`);

module.exports = client => {
    client.once("ready", () => { reqEvent("ready") (client) });
    client.on("message", (message) => { reqEvent("message") (message) });
    client.on("messageDelete", (message) => { reqEvent("messageDelete") (message) });
}