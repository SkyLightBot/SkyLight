const Discord = require("discord.js");
const fs = require("fs");
const money = require("../money.json");
const ms  = require("parse-ms");
const cooldowns = require("../weeklycooldowns.json");

module.exports.run = async (bot, message, args) => {

    let timeout  = 604800000;
    let reward  = 2500;

    let embed = new Discord.MessageEmbed();
    embed.setTitle("Weekly Reward!");

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
                    weekly: Date.now()
                }
                fs.writeFile("./weeklycooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });
            } else {
                cooldowns[message.author.id].weekly = Date.now();
                fs.writeFile("./weeklycooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });
            }

            embed.setDescription(`You collected your weekly reward of **${reward}**. Current balance is $${money[message.author.id].money.toLocaleString()}.`);
            embed.setColor("00ff00");
            return message.channel.send(embed);

    } else {

        if(!cooldowns[message.author.id]) {
            cooldowns[message.author.id] = {
                name: bot.users.cache.get(message.author.id).tag,
                weekly: Date.now()
            }
            fs.writeFile("./weeklycooldowns.json", JSON.stringify(cooldowns), (err) => {
                if(err) console.log(err);
            });

            money[message.author.id].money += reward;
            fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                if(err) console.log(err);
            });

            embed.setDescription(`You collected your weekly reward of **${reward}**. Current balance is $${money[message.author.id].money.toLocaleString()}.`);
            embed.setColor("00ff00");
            return message.channel.send(embed);

        } else {
            
            if(timeout - (Date.now() - cooldowns[message.author.id].weekly) > 0) {

                let time = ms(timeout - (Date.now() - cooldowns[message.author.id].weekly))

                embed.setColor("ff0000");
                embed.setDescription(`**You already collected your weekly reward!**`);
                embed.addField(`Collect again in`, `**${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s**`);
                return message.channel.send(embed);
                
            } else {

                money[message.author.id].money += reward;
                fs.writeFile("./money.json", JSON.stringify(money), (err) => {
                    if(err) console.log(err);
                });

                cooldowns[message.author.id].weekly = Date.now();
                fs.writeFile("./weeklycooldowns.json", JSON.stringify(cooldowns), (err) => {
                    if(err) console.log(err);
                });

                embed.setDescription(`You collected your weekly reward of **${reward}**. Current balance is $${money[message.author.id].money.toLocaleString()}.`);
                embed.setColor("00ff00");
                return message.channel.send(embed);

            }

        }

    }

}

module.exports.help = {
    name: "weekly",
    aliases: ["7d"]
}