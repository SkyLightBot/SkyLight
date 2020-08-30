const money = require ("../money.json");
const fs = require("fs");
const { parse } = require("path");

module.exports.run = async (bot, message, args) => {

    if(message.author.id != "337031340853559297") return;

    let user  = message.mentions.members.first() || bot.users.cache.get(args[0]);
    if(!user) return message.reply("Sorry, counldn't find that user.");

    if(!args[1]) return;

    if(isNaN(args[1])) return;

    if(!money[user.id]) {

        money[user.id] = {
            name: bot.users.cache.get(user.id).tag,
            money: parseInt(args[1])
        }

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

    } 

    if(!args[1]) return;

    if(isNaN(args[1])) return;

    if(!money[user.id]) {

        money[user.id] = {
            name: bot.users.cache.get(user.id).tag,
            money: parseInt(args[1])
        }

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

    }
    else {

        money[user.id].money += parseInt(args[1]);

        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });

    }

    return message.channel.send(`${message.author.username} admin paid $${args[1]} to ${bot.users.cache.get(user.id).username}`);


}

module.exports.help = {
    name: "adminpay",
    aliases: ["ap"]
}