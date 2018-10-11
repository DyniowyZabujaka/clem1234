const Discord = require('discord.js');
const client = new Discord.Client();
const Bot = new Discord.Client();
const TOKEN = 'NDc1MjkzOTEyODYxMzc2NTEz.Dp-lWg.5RerM6sR6J8MnhZZfaJ0_00NSSk';
const fs = require("fs");
const prefix = "$";
const ms = require("ms");
  let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"))

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === '$warn') {
      message.channel.send(':no_entry: | Użyj tego poprawnie: `$warn @użytkownik`');
  	}
});

client.on('message', async message => {

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  let warn = message.content.split(" ").slice(2);
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!wUser) return message.reply("Couldn't find them yo");

  if(!warns[wUser.id]) warns[wUser.id] = {
  warns: 0
};

warns[wUser.id].warns++;

fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
  if (err) console.log(err)
});

if (command == "warn") {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":potato: Nie masz uprawnień :) :potato:")
  let person = message.mentions.members.first();
  if(!person) return message.reply("Couldn't find them yo");
    if (message.author.bot) return;
      if(!message.channel.guild) return message.reply('ta');
    let say = new Discord.RichEmbed()
  .setThumbnail("https://static.thenounproject.com/png/34721-200.png")
  .setAuthor("WARN")
    .setColor(8991829)
      .addField("Ostrzeżony użytkownik", `<@${wUser.id}>`)
      .addField("Ostrzeżony przez", `${message.author.username}`)
      .addField("Powód", warn.join("  "))
      .addField("Liczba ostrzeżeń", warns[wUser.id].warns);
    message.guild.channels.find('name','logi-kar').send(say);
    message.channel.sendMessage(`:rage: ${person} **Został ostrzeżony**`);

    message.delete();
  }

  if(warns[wUser.id].warns == 5){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("Error. Brakuje roli muted");

    let mutetime = "600s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> został tymczasowo wyciszony za przekroczenie 5 warnów`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> może znowu pisać`)
    }, ms(mutetime))
  }

});

client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'lobby');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  console.log('We are ready to alert new members of their insanity!');
  // Send the message, mentioning the member

  const embed = {
  "title": "Witaj na #TeamBakłażan!",
  "description": "Zapoznaj się z regulaminem <#304261371841871872>.",
  "color": 13047225,
  "footer": {
    "icon_url": "https://i.imgur.com/4iT8fqq.jpg",
    "text": "`Aktualnie jest nas ${member.guild.memberCount}``"
  },
  "author": {
    "name": member.displayName + "  Dołaczył.",
    "icon_url": member.user.displayAvatarURL
  }
};
channel.send({ embed });
});

client.on('guildMemberRemove', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'lobby');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  console.log('We are ready to alert new members of their insanity!');
  // Send the message, mentioning the member

  const embed = {
  "title": " ",
  "description": "ruham ci starom",
  "color": 15999752,
  "footer": {
    "icon_url": "https://i.imgur.com/4iT8fqq.jpg",
    "text": "Gejb to pedalica"
  },
  "author": {
    "name": member.displayName + " Wyszedł.",
    "icon_url": member.user.displayAvatarURL
  },
  "thumbnail": {
    "url": "https://i.imgur.com/4D5S08H.jpg"
  }
};
channel.send({ embed });
});

client.on('message', message => {
    if (message.content === 'ping') {
    	message.channel.send('PONG!');
  	}
});

client.on('message', message => {
    if (message.content === 'bing') {
    	message.reply('BONG!');
  	}
});

// THIS  MUST  BE  THIS  WAY
client.login(TOKEN);


client.login(process.env.BOT_TOKEN);
