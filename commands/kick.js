const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("لا استطيع اجاد المستخدم");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("لا يمكنك");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("الشخص الذي اخترته لا يمكن طرده");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("طرد")
    .setColor("#e56b00")
    .addField("المطرود هو", `${kUser} with ID ${kUser.id}`)
    .addField("طرد من قبل", `<@${message.author} with ID ${message.author.id}`)
    .addField("وقت الطرد", message.createdAt)
    .addField("السبب", kReason);
    let logs = message.guild.channels.find(`name`, "logs");
    if(!logs) return message.channel.send("لا استطيع اجاد شات ال #logs");
    message.delete().catch(O_o=>{});
    logs.send(kickEmbed);
    
    message.guild.member(kUser).kick(kReason);
    logs.send(kickEmbed);
}

module.exports.help = {
  name:"kick"
}