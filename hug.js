const Discord = require("discord.js");
const colors = require("../colors.json");

module.exports.run = async (bot, message, args) => {

    let gifs = [
        "https://i.pinimg.com/originals/f2/80/5f/f2805f274471676c96aff2bc9fbedd70.gif",
        "https://media2.giphy.com/media/l2QDM9Jnim1YVILXa/source.gif",
        "https://thumbs.gfycat.com/BlueDecimalAardwolf-small.gif"
    ];
    let pick = gifs[Math.floor(Math.random() * gifs.length)];

    let embed = new Discord.MessageEmbed();
    embed.setColor(colors.red);
    embed.setImage(pick);

    if(args[0]) {
        let user = message.mentions.members.first();
        embed.setTitle(`${message.author.username} hugs ${bot.users.cache.get(user.id).username}!`);
    } else{
        embed.setTitle(`${message.author.username} hugs his imaginary friend.`)
    }

    message.channel.send(embed);

}

module.exports.help = {
    name: "hug",
    aliases: []
}