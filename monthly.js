const Discord = require("discord.js");
const fs = require("fs");
const money = require("../money.json");
const ms  = require("parse-ms");
const cooldowns = require("../monthlycooldowns.json");

module.exports.run = async (bot, message, args) => {

    let timeout  = 2592000000;
    let reward  = 25000;

    let embed = new Discord.MessageEmbed();
    embed.setTitle("Monthly Reward!");

    if (!money[message.author.id]) {

            money[message.author.id] = {
                name: await bot.users.fetch(message.author.id).tag,
                money: reward
            }
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            });

            if(!cooldowns[message.author.id]) {
                cooldowns[message.author.id] = {
                    name: bot.users.cache.get(message.author.id).tag,
                    monthly: Date.now()
                }
                fs.writeFile("./monthlycooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });
            } else {
                cooldowns[message.author.id].weekly = Date.now();
                fs.writeFile("./monthlyooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });
            }

            embed.setDescription(`You collected your monthly reward of **${reward}**. Current balance is $${money[message.author.id].money.toLocaleString()}.`);
            embed.setColor("00ff00");
            return message.channel.send(embed);

    } else {

        if(!cooldowns[message.author.id]) {
            cooldowns[message.author.id] = {
                name: bot.users.cache.get(message.author.id).tag,
                monthly: Date.now()
            }
            fs.writeFile("./monthlycooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);
            });

            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            });

            embed.setDescription(`You collected your monthly reward of **${reward}**. Current balance is $${money[message.author.id].money.toLocaleString()}.`);
            embed.setColor("00ff00");
            return message.channel.send(embed);

        } else {
            
            if(timeout - (Date.now() - cooldowns[message.author.id].monthly) > 0) {

                let time = ms(timeout - (Date.now() - cooldowns[message.author.id].monthly))

                embed.setColor("ff0000");
                embed.setDescription(`**You already collected your monthly reward!**`);
                embed.addField(`Collect again in`, `**${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**`);
                return message.channel.send(embed);
                
            } else {

                money[message.author.id].money += reward;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if(err) console.log(err);
                });

                cooldowns[message.author.id].monthly = Date.now();
                fs.writeFile("./monthlycooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });

                embed.setDescription(`You collected your monthly reward of **${reward}**. Current balance is $${money[message.author.id].money.toLocaleString()}.`);
                embed.setColor("00ff00");
                return message.channel.send(embed);

            }

        }

    }

}

module.exports.help = {
    name: "monthly",
    aliases: ["30d"]
}