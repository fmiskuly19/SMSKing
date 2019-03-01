const Discord = require('Discord.js');

module.exports = async (bot, messageReaction) => {
    if(messageReaction.message.author.id == 527962850552184883){

        //user that reacted to the queue
        let user = messageReaction.users.entries().next().value[1];

        let queueID = messageReaction.message.embeds[0].fields[2].value;

        //find queue in list
        let queue = bot.queue.find(q => q.id = queueID);
        
        if(!queue){
            return messageReaction.message.channel.send(
                "<@" + user.id + ">, I could not find the queue position you reacted to! " + 
                "That queue spot has already been claimed or does not exist.");
        }

        var embed = new Discord.RichEmbed()
                    .setColor(13828351)
                    .addField('Event name: ', queue.event)
                    .addField('Place in queue', queue.place)
                    .addField('Link:', queue.link);

        user.send("Here is your queue position!",{embed});

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