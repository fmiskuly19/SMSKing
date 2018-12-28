const fs = require('fs');
const csvWriter = require('csv-write-stream')

module.exports.run = async (bot, message, args) => {
    if (!args[0] || !args[1]) {
        return message.reply(`Please include a name and phone number. Type !help for more information on how to use this command.`);
    }

    let name = args[0];
    let number = args[1];

    //match phone number on 10 digit with country code
    var reg = /^([+]?\d{1,3})?\d{10}$/;

    if (!reg.test(number)) {
        return message.reply(`Phone number was an invalid format! Please enter the phone number with no delimiters (ie: 1234567890).`);
    }

    var writer = csvWriter({sendHeaders: false})
    writer.pipe(fs.createWriteStream('sms.csv',{flags: 'a'}))
    writer.write({ first_name: name, phone_number: number})
    writer.end();

    return message.reply('You have been added to our SMS notifications system!')
}

module.exports.info = {
    name: "sms",
    usage: "!sms name phonenumber",
    description: "Stores user provided name and phone number in csv file format"
};