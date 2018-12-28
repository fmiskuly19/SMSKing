const { Client, Attachment } = require('discord.js');
const bot = new Client();
const fs = require("fs");

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    //bind events to module
    bot.on(eventName, event.bind(null, bot));
  });
});

bot.commands = [];
fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let mod = require(`./commands/${file}`);
    bot.commands.push(mod);
    let commandName = file.split(".")[0];
    console.log(`Loaded command ${commandName}`);
  });
});

bot.login(process.env.DISCORD_TOKEN);