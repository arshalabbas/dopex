module.exports.colors = ["#050505", "#f36c74", "#6c494c", "#ab5659", "#2e2729", "#cb6c6d", "#383636", "#f7f7f7", "#868586", "#c5a8ab"];
module.exports.emojies = ["🥰", "🎉", "💖", "💞", "💓", "💕", "💘"];
module.exports.truthEmoji = ["👀", "🙄", "😜", "😶", "🤐", "🤭", "🙈", "🙊", "🙉"];
module.exports.rolling = "<a:diceRoll:809316052001226764>";
module.exports.expressions = ["Wow...", "Hurray!", "Nice!", "Oh My...", "Aw...", "Awesome!", "Perfect!", "Lucky!"];

module.exports.rollEmoji = (number) => {
    if (number == '1') {
        return "<:dice1:809316446907793449>";
    } else if (number == '2') {
        return "<:dice2:809316489000648734>";
    } else if (number == '3') {
        return "<:dice3:809316536896585728>";
    } else if (number == '4') {
        return "<:dice4:809316570043121674>";
    } else if (number == '5') {
        return "<:dice5:809316594097717269>"
    } else if (number == '6') {
        return "<:dice6:809316618915151893>"
    }
}

const os = require('os');

module.exports.stat = (client, stats) => {
    index = 0;
    setInterval(() => {
        const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
        if (index > 8) {
            index = 0;
        } else {
            index++
        }
        const element = index;
        const loadingFrame = frames[element];
        const ping = Math.round(client.ws.ping);
        var finalPing;
        if (ping > 149) {
            finalPing = `- Bot Latency: ${ping} ms`;
        } else {
            finalPing = `+ Bot Latency: ${ping} ms`;
        }

        const serverCount = client.guilds.cache.size;
        let seconds = Math.floor(client.uptime / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        seconds %= 60;
        minutes %= 60;
        hours %= 24;

        var cpu = os.cpus();
        var tMem = (os.totalmem() / 1024) / 1024;
        var fMem = (os.freemem() / 1024) / 1024;
        var uMem = ((os.totalmem() - os.freemem()) / 1024) / 1024;

        stats(`
\`\`\`diff
${loadingFrame} ${client.user.username} Stats

${finalPing}
! Active in ${serverCount} servers.
! Uptime: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.

=====================

${loadingFrame} System Stats

- CPU
! CPU: ${cpu[0].model}
! CPU Speed: ${cpu[0].speed / 1000} GHz

- Memory
! Total Memory: ${parseInt(tMem)} MB
! Used Memory:  ${parseInt(uMem)} MB
! Free Memory:  ${parseInt(fMem)} MB

- Platform
! OS: ${os.type()}
! Version: ${os.version()}
\`\`\`
            `);
    }, 1000);
}