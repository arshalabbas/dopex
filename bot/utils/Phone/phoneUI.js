const { menu, contactOptions, messages, msgOptions, confirm } = require('./sections');
const { deleteContact } = require('../../Database/userContacts');

var index = 0;
var stages = ["Menu"];
var stage = menu;
var util = {};
var sub = false;
var options;
var optionType;
var select;
module.exports.util = util;

function contactsList() {
    let channelList = [];
    channelList.push("🌐 Global call");
    util.contacts.forEach(ch => {
        channelList.push(ch.name);
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
        sub = "subMenu";
        const contacts = contactsList();
        stage = contacts;
    }
    else if (current === 'Messages') {
        sub = "subMenu";
        stage = messages;
    }
    else if (current === 'Switched off') {
        sub = false;
        stages.pop();
        util.collector.stop();
    }
    else if (current === 'Options') {
        sub = 'confirm';
        stage = options;
    }
    else if (current === 'Confirm') {
        select = index - 1; 
        sub = 'end';
        stage = confirm;
    }
    return current;
}

async function pass(index) {
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

    else if (sub === 'subMenu') {
        const checker = stages[stages.length - 1];
        if (checker === 'Contacts') {
            if (index === 0) return;
            options = contactOptions;
            optionType = "call";
        }
        else if (checker === 'Messages') {
            options = msgOptions;
            optionType = "msg";
        }
        stages.push("Options");
    }
    else if (sub === 'confirm') {
        // if (optionType === 'call' && index == 0) {

        // }
        if (optionType === "call" && index == 1) {
            stages.push("Confirm");
        }
    }
    else if (sub === 'end') {
        if (index == 0) {
            console.log(`index: ${index}`);
            console.log(`select: ${select}`);
            await deleteContact(util.message.author.id, util.contacts[select]);
            const command = await util.message.client.commands.get("phone");
            command.run(util.message.client, util.message);
        }
        else if (index == 1) {
            stages.pop();
            sub === 'confirm';
        }
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
        select = "";
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
        else {
            return index - 1;
        }
    }
}

module.exports.navigation = navigation;