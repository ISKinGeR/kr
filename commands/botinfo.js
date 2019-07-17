const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("معلومات هن البوت")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("اسم البوت", bot.user.username)
    .addField("صنع في", bot.user.createdAt)

    message.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}