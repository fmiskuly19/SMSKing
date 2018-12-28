const Attachment = require('discord.js');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {
    //do stuff
    if(!message.member.roles.some(r=>["Owner"].includes(r.name)))
        return message.reply("Sorry, you must have the 'Owner' role to use this command.");

    message.author.send("Here is the SMS csv file!",{file: 'sms.csv'});

    return message.reply(`Check your PMs!`);
}

module.exports.info = {
    name: "download",
    usage: "!download",
    description: "Sends pm to user containing collected"
};