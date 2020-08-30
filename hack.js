module.exports.run = async (bot, message, args) => {

    const m = await message.channel.send("Preparing to hack user");
    m.edit("Stealing IP address").then(msg => msg.edit({timeout: 300}));
    m.edit("Getting their bank info").then(msg => msg.edit({timeout: 300}));
    m.edit("Email: Cockisgood@fuckmail.com").then(msg => msg.edit({timeout: 300}));
    m.edit("Passwork: I love cocks 4 life!").then(msg => msg.edit({timeout: 300}));
    m.edit("Leaking their nudes").then(msg => msg.edit({timeout: 300}));
    m.edit("Finished hacking user");

}

module.exports.help = {
    name: "hack",
    aliases: []
}