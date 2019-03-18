const Discord = require('discord.js');

module.exports = async (bot, messageReaction) => {

    if(messageReaction.message.author.id == 527962850552184883 && 
        messageReaction.message.embeds[0].message.content === "React to me to secure this spot!"){

        //ignore initial bot reaction to queue message
        if(messageReaction.users.size === 1 && messageReaction.me){
            console.log("bot reaction, returning");
            return;
        }

        let queueID = messageReaction.message.embeds[0].fields[2].value;
        let queue = bot.queue.find(q => q.id = queueID);
        
        if(!queue){
            console.log("queue position was already claimed");
            return;
        }

        //get user that reacted to queue message
        let users = Array.from(messageReaction.users.entries());
        let lastUser = users[users.length-1][1];

        var embed = new Discord.RichEmbed()
                    .setColor(13828351)
                    .addField('Event name: ', queue.event)
                    .addField('Place in queue', queue.place)
                    .addField('Link:', queue.link);

        lastUser.send("Here is your queue position!",{embed});

        //remove this queue from list to prevent others from receiving the info
        var index = bot.queue.indexOf(queue);
        if (index > -1) {
            bot.queue.splice(index, 1);
        }
        else{
            console.log("Something went wrong when deleting the queue from list");
        }

        console.log('queue removed');

        console.log(bot.queue);

    }   
}