const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("لا استطيع اجاد المستخدم");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("لا يمكنك");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("الشخص الذي اخترته لا يمكن حظره");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("حظر")
    .setColor("#bc0000")
    .addField("المحظور هو", `${bUser} with ID ${bUser.id}`)
    .addField("تم الحظر من", `<@${message.author.id} with ID ${message.author.id}`)
    .addField("وقت الحظر", message.createdAt)
    .addField("السبب", bReason);
    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("لا استطيع اجاد شات ال #logs");
    message.delete().catch(O_o=>{});
    logs.send(banEmbed);

    message.guild.member(bUser).ban(bReason);
    logs.send(banEmbed);
}

module.exports.help = {
  name:"ban"
}