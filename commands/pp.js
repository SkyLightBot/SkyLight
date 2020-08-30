const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let pp = [
        "8D",
        "8=D",
        "8==D",
        "8===D",
        "8====D",
        "8=====D",
        "8======D",
        "8=======D",
        "8========D",
        "8=========D",
        "8==========D",
        "8===========D",
        "8============D",
        "8=============D",
        "8==============D",
        "8===============D",
        "8================D",
        "8=================D",
        "8==================D",
        
        
    ];
    let pick = pp[Math.floor(Math.random() * pp.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.green);
    embed.setTitle(`${message.author.username}'s PP size!`);
    embed.setDescription(pick);

    if(args[0]) {
        let user = message.mentions.members.first();
        embed.setColor(colors.green);
        embed.setTitle(`${bot.users.cache.get(user.id).username}'s PP size!`);
        embed.setDescription(pick);
    }

    message.channel.send(embed);

}

module.exports.help = {
    name: "pp",
    aliases: []
}