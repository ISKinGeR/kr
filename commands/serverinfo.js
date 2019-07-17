const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("معلومات عن السيرفر")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("اسم السيرفر", message.guild.name)
    .addField("صنع السيرفر في", message.guild.createdAt)
    .addField("وقت دخولك للسيرفر", message.member.joinedAt)
    .addField("عدد اعضاء السيرفر", message.guild.memberCount);

    message.channel.send(serverembed);
}

module.exports.help = {
  name:"info"
}