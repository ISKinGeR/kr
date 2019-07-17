const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const sRole = require("./Roles.json")
const Eris = require("eris");
const prefix = require("./prefix.json")
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} Ready!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Server System", {type: "WATCHING"});

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});

bot.on('message', message => {

  if(!message.guild) return
  if(!sRole[message.guild.id]) sRole[message.guild.id] = {
      rolesAndMessages: []
  };

  var attentions = {};
  attentions[message.guild.id] = { };
  const role = sRole[message.guild.id].role
  if(message.content.startsWith ('setrole')) {
    if(!message.member.hasPermission(`MANAGE_GUILD`)) return;
    let args = message.content.split(/[ ]+/);
    message.channel.send( message.author + ', ** | قم بوضع اسم الرتبة الان**').then( (m) =>{
      m.channel.awaitMessages( m1 => m1.author == message.author,{ maxMatches: 1, time: 60*1000 }).then ( (m1) => {
          m1 = m1.first();
          attentions[message.guild.id]['role'] = m1.content;
          if (!message.guild.roles.find("name", m1.content)) return message.channel.send(`**⇏ | ${message.author}, لايوجد رتبة بهذا الاسم**`);;
      m.channel.send( message.author + ', ** | :writing_hand: قم بوضع الامر الذي تريد من الاعضاء كتابته للحصول على الرتبة **' )

      m.channel.awaitMessages( m2 => m2.author == message.author,{ maxMatches: 1, time: 60*1000 } ).then ( (m2) => {
      m2 = m2.first();
      attentions[message.guild.id]['msg'] = m2.content;

      message.channel.send(`** | هل تريد اكمال العملية ؟
الرتبة : ${attentions[message.guild.id]['role']}
الامر : ${attentions[message.guild.id]['msg']}  **`).then(msge => {
      msge.react('✅').then( r => {
      msge.react('❌')

      const oneFilterBB = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
      const threeFilterBB = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;
      const oneBY = msge.createReactionCollector(oneFilterBB, { time: 60000});
      const threeBY = msge.createReactionCollector(threeFilterBB, { time: 60000});
      oneBY.on('collect', r => {
          msge.delete();
          message.channel.send(`${message.author}  ** | تمت اضافة الرتبة والامر بنجاح **`)
          
      channel = attentions[message.guild.id]['role']
      msgx = attentions[message.guild.id]['msg'] = m2.content;
      sRole[message.guild.id].rolesAndMessages.push({msg : msgx, role: channel}); 

    fs.writeFile("./Roles.json", JSON.stringify(sRole, null, 2), (err) => {
      if(err) console.log(err)
    });

      })
      threeBY.on('collect', r => {
          msge.delete();
          message.reply("**⇏ | تم الغاء العملية**")
          })
      })
  })
      
      })
});
})
return;
  }

  for (let i = 0; i < sRole[message.guild.id].rolesAndMessages.length; i++) {
      let d = sRole[message.guild.id].rolesAndMessages[i];
      if (d.msg == message.content) {
          if (message.guild.member(message.author).roles.find("name", d.role)) return message.channel.send(`**⇏ | ${message.author}, انت تملك الرتبة بالفعل**`);;
          message.member.addRole(message.guild.roles.find('name',d.role));
        
              message.channel.send(`** | ${message.author} تم اعطائك رتبة ${d.role} بنجاح**`);
          break;
      };
  };
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}help`){

  let helpEmbed = new Discord.RichEmbed()
  .setDescription("Commands || Prefix is ` _ `")
  .setColor("#02a8c9")
  .addField("help", "⇏ show cmd and help")
  .addField("sinfo", "⇏ show info server")
  .addField("info", "⇏ show info")
  .addField("report", "⇏ report @(who you want report) reason")
  return message.channel.send(helpEmbed);
  }

  if(cmd === `${prefix}helpA`){
    let helpEmbed1 = new Discord.RichEmbed()
    .setDescription("Commands Admins || Prefix is ` _ `")
    .setColor("#02a8c9")
    .addField("bc", "⇏ to send brodcast in pm for all")
    .addField("offbc", "⇏ to send brodcast in pm for offline")
    .addField("ban", "⇏ ban  @(who you want ban him) reason")
    .addField("kick", "⇏ kick @(who you want kick him) reason")
    .addField("mute", "⇏ mute someone need mute")
    .addField("voic", "⇏ to know number in voic channels")
    .addField("voicesetup","⇏ to create voic channel to know number in voic channels")
    return message.channel.send(helpEmbed1);
  }

  
  if(cmd ===`${prefix}sinfo`){
      let sicon = message.guild.iconURL;
      let infoEmbed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setColor("#02a8c9")
      .setThumbnail(sicon)
      .addField("Server Name", message.guild.name)
      .addField("Created On", message.guild.createdAt)
      .addField("You Joined", message.member.joinedAt)
      .addField("Total Members", message.guild.memberCount)
      return message.channel.send(infoEmbed);
      }

 // if(cmd ===`${prefix}info`){
  //let infoEmbed = new Discord.RichEmbed()
  //.setDescription("OBOT Information")
  //.setColor("#02a8c9")
  //.addField("Bot Name", bot.user.username)
  //.addField("Created On", bot.user.createdAt);
 // return message.channel.send(infoEmbed);
 // }

  if(cmd === `${prefix}test`){
  let testEmbed = new Discord.RichEmbed()
  .addField("TEST", "The Bot is Online!")
  .setColor("#02a8c9");
  return message.channel.send(testEmbed);
  }
});

bot.on('message', function(msg) {
  if(msg.content.startsWith ('_voic')) {
     	        let foxembed = new Discord.RichEmbed()
				      .setColor('RANDOM') /// By KillerFox
    .setDescription(`Voice Online : [ ${msg.guild.members.filter(m => m.voiceChannel).size} ]`)
	msg.channel.send(foxembed)
  }
});

//bot.on('message', message => {
  //if (message.content.startsWith(prefix + 'accept')) {
    //  if (message.author.bot) return;
     // if (!message.guild) return;
     // let Room = message.guild.channels.find(`name`, 'تقديم اداري');
     // if (!Room) return message.reply(`You Must Create Room With Name **تقديم اداري**`);
     // let user = message.mentions.users.first();
     // let by = message.author
      //Room.send(`${user}` + "** You are acceptable in management By **" + `${by}`);
 // }
//});

//bot.on('message', message => {
 // if (message.content.startsWith(prefix + 'reject')) {
    //  if (message.author.bot) return;
   //   if (!message.guild) return;
    //  let Room = message.guild.channels.find(`name`, 'تقديم اداري')
    //  if (!Room) return message.reply(`You Must Create Room With Name **تقديم اداري**`);
    //  let user = message.mentions.users.first();
    //  let by = message.author
    //  Room.send(`${user}` + "** You are rejected in the administration By **" + `${by}`);
  //}
//});


bot.on('message', async message => {
  if(message.content.startsWith("_voicesetup", "@voicesetup")) {
  if(!message.guild.member(message.author).hasPermissions('MANAGE_CHANNELS')) return message.reply(':x: **ليس لديك الصلاحيات الكافية**');
  if(!message.guild.member(bot.user).hasPermissions(['MANAGE_CHANNELS','MANAGE_ROLES_OR_PERMISSIONS'])) return message.reply(':x: **ليس معي الصلاحيات الكافية**');
  var args = message.content.split(' ').slice(1).join(' ');
  if(args && !args.includes(0)) return message.channel.send(':negative_squared_cross_mark: » فشل اعداد الروم الصوتي .. __يجب عليك كتابة 0 في اسم الروم__');
  if(!args) args = `VoiceOnline: [ ${message.guild.members.filter(s => s.voiceChannel).size} ]`;
  message.channel.send(':white_check_mark: » تم عمل الروم الصوتي بنجاح');
  message.guild.createChannel(`${args.replace(0, message.guild.members.filter(s => s.voiceChannel).size)}`, 'voice').then(c => {
    c.overwritePermissions(message.guild.id, {
      CONNECT: false,
      SPEAK: false
    });
    setInterval(() => {
      c.setName(`${args.replace(0, message.guild.members.filter(s => s.voiceChannel).size)}`).catch(err => {
        if(err) return;
      });
    },3000);
  });
  }
});
bot.on("guildMemberRemove", member => {
    let guild = bot.channels.get(room).guild.id

    if(member.guild.id != guild) return;
    bot.channels.get(room).setName("Member Left :(").then(m=> { setTimeout(() => {
      bot.channels.get(room).setName(member.guild.name+" - "+member.guild.members.size)
    }, 3000)})
})

console.log('TEST is Ready');
bot.on('message', message => { 
    if (message.author.id === bot.user.id) return; 
    if (message.guild) { 
   let embed = new Discord.RichEmbed()
    let args = message.content.split(' ').slice(1).join(' '); 
if(message.content.split(' ')[0] == '_bc') { 
    if (!args[1]) { 
message.channel.send("**_bc <Messages> :incoming_envelope:  **");
return;
}
        message.guild.members.forEach(m => {
   if(!message.member.hasPermission('ADMINISTRATOR')) return;
            var bc = new Discord.RichEmbed()
            .setThumbnail(bot.user.avatarURL)
            .addField('Server : ', `${message.guild.name}`)
            .addField(' Sender : ', `${message.author.username}#${message.author.discriminator}`)
            .addField('Message : ', args)
            .setColor('RANDOM')
            // m.send(`[${m}]`);
            m.send(`${m}`,{embed: bc});
        });
    }
    } else {
        return;
    }
});

bot.on('message', message => {  
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + 'clear')) { 
  if(!message.channel.guild) return message.reply(`** This Command For Servers Only**`); 
   if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`** You don't have Premissions!**`);
   if(!message.guild.member(bot.user).hasPermission('MANAGE_GUILD')) return message.channel.send(`**I don't have Permission!**`);
  let args = message.content.split(" ").slice(1)
  let messagecount = parseInt(args);
  if (args > 100) return message.reply(`** The number can't be more than **100** .**`).then(messages => messages.delete(5000))
  if(!messagecount) args = '100';
  message.channel.fetchMessages({limit: messagecount}).then(messages => message.channel.bulkDelete(messages)).then(msgs => {
  message.channel.send(`** Done , Deleted \`${msgs.size}\` messages.**`).then(messages => messages.delete(5000));
  })
}
});

bot.on(`guildMemberAdd`, member => {
  console.log(`User ` + member.user.username + `has joined the server!`)
  var role = member.guild.roles.find(`name`, `Members`);
  member.addRole(role)
});

bot.on('message', message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  
  if(cmd === `${prefix}offbc`){
  if(message.author.bot) return;
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**✖｜You need premessions.`);
  var args = message.content.split(" ").slice(1).join(" ")
  message.channel.send(`Done.`) 
  message.guild.members.filter(m => m.presence.status === 'offline').forEach(m => {
      m.send(`${args}`)
    });
  }}); 

bot.login(process.env.TOKEN);