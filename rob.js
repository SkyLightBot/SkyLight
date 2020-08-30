const Discord = require("discord.js");
const money = require("../money.json");
const fs = require("fs");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let rob = parseInt(args[0])
    let user = message.mentions.members.first();
    let targetuser  = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!targetuser) return message.reply("Please specify a user.");
    let author = message.author

    if(author < 250) return message.reply('You need atleast 250$ to rob somebody.')

    if(targetuser < 250) return message.reply(`${user.user.username} does not have anything to rob.`)

    let chances = ["win", "win",  "win",  "win",  "win",  "win",  "win",  "win",  "win", "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose", ];
    var pick = chances[Math.floor(Math.random() * chances.length)];

    if(pick == "lose") {
        money[user.id].money -= rob;
        money[message.author.id].money += rob;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });
        return message.reply(`You successfully robbed ${bot.users.cache.get(user.id).username}! You now have $${money[message.author.id].money}`);
    } else {
        money[message.author.id].money -= 250;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });
        return message.reply(`You got caught and paid a 250 fine! Your new balance is $${money[message.author.id].money}`);
    }
}

module.exports.help = {
    name: "rob",
    aliases: ["steal"]
}