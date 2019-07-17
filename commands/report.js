const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("لا استطيع اجاد المستخدم");
  let reason = args.join(" ").slice(22);

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("الشكاوي")
  .setColor("#15f153")
  .addField("تم الاشتكاء على", `${rUser} with ID: ${rUser.id}`)
  .addField("من قبل", `${message.author} with ID ${message.author.id}`)
  .addField("الشات", message.channel)
  .addField("الوقت", message.createdAt)
  .addField("السبب", reason);

  let reportschannel = message.guild.channels.find(`name`, "الشكاوي");
  if(!reportschannel) return message.channel.send("لا استطيع اجاد شات الشكاوي");
  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
}
 
module.exports.help = {
  name: "report"
}