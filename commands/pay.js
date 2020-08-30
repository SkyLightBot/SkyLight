const money = require ("../money.json");
const fs = require("fs");
const { parse } = require("path");

module.exports.run = async (bot, message, args) => {

    let user  = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.reply("Sorry, counldn't find that user.");

    if(!args[1]) return message.reply("Please specify the amount you want to pay.");

    if(!money[message.author.id]) return message.reply("Sorry, you don't any money.");

    if(user.id === message.author.id) return message.reply("You can't pay yourself.");

    if(parseInt(args[1]) > money[message.author.id].money) return message.reply("Sorry, you do not have that much money.");
    if(parseInt(args[1]) < 1) return message.reply("You cannot pay less than $1.");
    if(isNaN(args[1])) return message.reply("```-pay (user) (amount)```");

    if(!money[user.id]) {

        money[user.id] = {
            name: bot.users.cache.get(user.id).tag,
            money: parseInt(args[1])
        }

        money[message.author.id].money -= parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

    } else {

        money[user.id].money += parseInt(args[1]);

        money[message.author.id].money -= parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

    }

    return message.channel.send(`${message.author.username} paid $${args[1]} to ${bot.users.cache.get(user.id).username}`);


}

module.exports.help = {
    name: "pay",
    aliases: ["give", "share"]
}