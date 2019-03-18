const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let channelType = message.channel.type;
    
    if(channelType == "text"){
        return message.reply('Please use this command in DM channels only.');
    }

    if(args.length < 3){
        return message.reply("Please provide the proper parameters. Command should be in format !donate 'eventname' 'place in line' 'link'");
    }
    let link = args.pop();
    let place = args.pop();
    let eventName = args.join(" ");
    
    let ticketkings = bot.guilds.find(guild => guild.id == 522054475444125706);
    let channel = ticketkings.channels.find(channel => channel.id == 550416553376481301);
    let adminChannel = ticketkings.channels.find(channel => channel.id == 550832298543546389);

    //if no one reacts to a queue position and another one is generated with the same ID before the previous is removed, we will have a problem.
    //there is a 1/10000 chance this will happen, as most queues will be removed before a new one is created.
    var queueID = Math.floor(Math.random() * 10000);

    bot.queue.push({id: queueID, event: eventName, place: place, link: link});

    var embed = new Discord.RichEmbed()
                    .setColor(13828351)
                    .addField('Event name: ', eventName)
                    .addField('Place in queue', place)
                    .addField('TicketKings queue ID: ', queueID);

    channel.send("React to me to secure this spot!",{embed}).then(message => {
        const emoji = message.guild.emojis.find(e => e.name == "ticketkings");
        message.react(emoji.id);
    });
    adminChannel.send("<@" + message.author.id + "> donated a queue position for " + eventName);
}

module.exports.info = {
    name: "donate",
    usage: "!donate 'event name' 'position' link'",
    description: "Use this command to donate your unwanted queue links."
};