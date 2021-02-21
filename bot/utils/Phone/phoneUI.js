const { menu, contactOptions, messages, msgOptions } = require('./sections');

var index = 0;
var stages = ["Menu"];
var stage = menu;
var util = {};
var sub = false;
var options;
module.exports.util = util;

function contactsList() {
    let channelList = [];
    channelList.push("Global");
    util.channels.forEach(ch => {
        channelList.push(ch.channelID);
    });
    return channelList;
}

function checkStage() {
    var current = stages[stages.length - 1];
    if (current === 'Menu') {
        sub = false;
        stage = menu;
    }
    else if (current === 'Contacts') {
        sub = true;
        const contacts = contactsList();
        stage = contacts;
    }
    else if (current === 'Messages') {
        sub = true;
        stage = messages;
    }
    else if (current === 'Switched off') {
        sub = false;
        stages.pop();
        util.collector.stop();
    }
    else if (current === 'Options') {
        sub = false;
        stage = options;
    }
    return current;
}

function pass(index) {
    if (!sub) {
        if (index === 0) {
            stages.push("Contacts");
        }
        else if (index === 1) {
            stages.push("Messages");
        }
        else if (index === 3) {
            stages.push("Switched off");
        }
    }

    else if (sub) {
        const checker = stages[stages.length - 1];
        if (checker === 'Contacts') {
            options = contactOptions;
        }
        else if (checker === 'Messages') {
            options = msgOptions;
        }
        stages.push("Options");
    }

}


function hoverEffect(index) {
    let hoverOption = [];
    for (i = 0; i <= stage.length; i++) {
        if (stage[index] === stage[i]) {
            hoverOption.push(`[${stage[i]}](https://www.google.com)`);
        } else {
            hoverOption.push(stage[i]);
        }
    }
    return hoverOption;
}

function navigation(button) {
    if (!button) {
        index = 0;
        stages = ["Menu"];
        stage = menu;
        sub = false;
        options = "";
        const hover = hoverEffect(index);
        return hover.join("\n\n");
    }

    else if (button === '🔺') {
        index = index - 1;
        if (index <= -1) index = stage.length - 1;
        const hover = hoverEffect(index);
        return hover.join("\n\n");
    }

    else if (button === '🔻') {
        index = index + 1;
        if (index >= stage.length) index = 0;
        const hover = hoverEffect(index);
        return hover.join("\n\n");
    }

    else if (button === '🔴') {
        pass(index);
        const current = checkStage();
        index = 0;
        const hover = hoverEffect(index);
        const section = { title: current, options: hover.join("\n\n") };
        return section;
    }

    else if (button === '⬅️') {
        if (stages.length <= 1) return;
        stages.pop();
        const current = checkStage();
        index = 0;
        const hover = hoverEffect(index);
        const section = { title: current, options: hover.join("\n\n") };
        return section;
    }

    else if (button === '📞') {
        const current = stages[stages.length - 1];
        if (current !== "Contacts") return;
        if (index === 0) {
            return "global";
        }
    }
}

module.exports.navigation = navigation;