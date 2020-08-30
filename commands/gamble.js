const Discord = require("discord.js");
const money = require("../money.json");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

    var maxBet = 50000;

    if(!money[message.author.id] || money[message.author.id].money <= 0) return message.reply("you don't have any money.");

    if(!args[0]) return message.reply("please specify a bet.");

    if(args[0].toLowerCase() == "all") args[0] = money[message.author.id].money;

    try {
        var bet =  parseFloat(args[0]);
    } catch {
        return message.reply("please enter a whole number.");
    }

    if(bet != Math.floor(bet)) return message.reply("You can only enter whole numbers.");


    if(money[message.author.id].money < bet) return message.reply("You don't have enough money.");

    if(bet > maxBet) return message.reply(`The maximum bet amount is $${maxBet.toLocaleString()}`);

    let chances = ["win", "win",  "win",  "win",  "win",  "win",  "win",  "win",  "win", "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose",  "lose", ];
    var pick = chances[Math.floor(Math.random() * chances.length)];

    if(pick == "lose") {
        money[message.author.id].money -= bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });
        return message.reply(`You lost. New balance: $${money[message.author.id].money}`);
    } else {
        money[message.author.id].money += bet;
        fs.writeFile("./money.json", JSON.stringify(money), (err) => {
            if(err) console.log(err);
        });
        return message.reply(`You Win! New balance: $${money[message.author.id].money}`);
    }

}

module.exports.help = {
    name: "gamble",
    aliases: ["bet"]
}