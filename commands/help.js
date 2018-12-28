module.exports.run = (bot, message, args) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var fields = [];

    let field = { "name": `\`\`\`!sms name phonenumber\`\`\``, "value": 'Adds user to SMS notification system' }
    fields.push(field);

    const embed = {
        "title": "Thanks for using SMSKing!",
        "description": "Below are a list of commands and how to use them!",
        "color": 51711,
        "timestamp": `${dateTime}`,
        "footer": {
            "icon_url": `${bot.user.displayAvatarURL}`,
            "text": "SMSKing"
        },
        "fields": fields
    };
    message.channel.send({ embed });
};

module.exports.info = {
    name: "help",
    usage: ".help",
    description: "List of commands, what they do, and how to use them"
};