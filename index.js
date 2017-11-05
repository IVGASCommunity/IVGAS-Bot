const discord = require('discord.js');
const commando = require('discord.js-commando');
const sql = require('sqlite');
const path = require('path');
const keys = require('./keys.json');

const client = new commando.Client();

let server;
let channels;
let roles;
let sendEmbed;

client.on("ready", () => {
  console.log("----------ready!----------");

  server = client.guilds.get("312938209137131541");
  channels = {
    "general-discussion": server.channels.get("312944825370411018"),
    "coding": server.channels.get("374602133552627722"),
    "ivgas-coding-hub": server.channels.get("374726378370760704"),
    "video-games": server.channels.get("312946605621903361"),
    "arts": server.channels.get("312946773863956490"),
    "anime": server.channels.get("313389102621786112"),
    "Room 3": server.channels.get("312959785861382146"),
    "General Discussion": server.channels.get("312938209137131542"),
    "Video Games": server.channels.get("371996180382744576"),
    "gmod": server.channels.get("374656653976403968"),
    "info-and-rules": server.channels.get("312938209137131541"),
    "cosplay": server.channels.get("319440925711663114"),
    "IVGAS Important Information": server.channels.get("371993284429611008"),
    "Voice Chats": server.channels.get("371992888743165963"),
    "Staff Room": server.channels.get("312946320405037056"),
    "Unturned": server.channels.get("373240378851328001"),
    "NSFW-Related": server.channels.get("371992446218928139"),
    "nsfw-cosplay": server.channels.get("319440877548208130"),
    "anime-together": server.channels.get("312957474758197249"),
    "7dtd": server.channels.get("372004172544999424"),
    "Away From Keyboard (AFK)": server.channels.get("312938320835641345"),
    "ivgas-suggestions": server.channels.get("319444205271384065"),
    "video-game-spoilers": server.channels.get("372374382158544897"),
    "offtopic-media": server.channels.get("312947567300313088"),
    "nsfw-eroges-and-novels": server.channels.get("312947812675616769"),
    "bot-announcements": server.channels.get("321541055206129666"),
    "Room 1": server.channels.get("312946250905288704"),
    "bot-commands": server.channels.get("321547402039394324"),
    "quote-wall": server.channels.get("312985272503500800"),
    "testing": server.channels.get("372922526067851266"),
    "nsfw-deals": server.channels.get("374724949807726593"),
    "Sync Room 2": server.channels.get("312959881600565250"),
    "Room 2": server.channels.get("312959758938144768"),
    "Garry's Mod": server.channels.get("374682451102007306"),
    "visual-novels": server.channels.get("372003575544545282"),
    "vn-spoilers": server.channels.get("372374853489000468"),
    "ivgas-github": server.channels.get("372777189562908673"),
    "ivgas-staff": server.channels.get("335518946578923520"),
    "bot-logs": server.channels.get("321543325049946113"),
    "nsfw": server.channels.get("372003327442944002"),
    "Sync Room 1": server.channels.get("312959842539012106"),
    "announcements": server.channels.get("312944883877019648"),
    "Anime": server.channels.get("371996148174553089"),
    "streamers": server.channels.get("372001670483410947"),
    "Music Room": server.channels.get("313397205975302145"),
    "unturned": server.channels.get("372004126386683905"),
    "memes": server.channels.get("312947330779316225"),
    "music": server.channels.get("312947111433994251"),
    "anime-spoilers": server.channels.get("312958859235033088"),
    "ivgas-hub": server.channels.get("312945143592255498"),
    "nsfw-hentai-and-fanart": server.channels.get("312947246641446914"),
    "General Channels": server.channels.get("371993712013606913")
  };
  roles = {
    "everyone": server.roles.get("312938209137131541"),
    "I.V.G.A.S Founder": server.roles.get("312938397528227841"),
    "I.V.G.A.S Committee": server.roles.get("312945465974980628"),
    "I.V.G.A.S Member": server.roles.get("312960510746296321"),
    "I.V.G.A.S Member (PTT)": server.roles.get("312960669714743297"),
    "I.V.G.A.S Developer": server.roles.get("313010192134701067"),
    "AOSTBot": server.roles.get("313397086139711498"),
    "Dyno": server.roles.get("321540726695395328"),
    "Muted": server.roles.get("321540728679301130"),
    "Skynet (Bots)": server.roles.get("321542429478092800"),
    "Trusted I.V.G.A.S Member": server.roles.get("331322029498171392"),
    "I.V.G.A.S Live Streamer": server.roles.get("372002044698951681"),
    "IVGAS": server.roles.get("372962486682648578"),
    "I.V.G.A.S Resident Lewd Masters": server.roles.get("373576802154840086"),
    "KawaiiBot": server.roles.get("374345129173188610")
  };

  client.options.owner = roles["I.V.G.A.S Developer"].members.map(member => {return member.id});
});

client.on("debug", info => console.log(info));
client.on("warn", warning => console.warn(warning));
client.on("error", error => console.error(error.stack));
client.on("rateLimit", () => console.error("You are getting rate-limited!"));


client.on("channelCreate", channel => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setTitle(`The channel __${channel.name}__ has been created`)
    .setDescription(`Channel: ${channel.toString()} Channel ID: [${channel.id}]`)
    .setTimestamp()
  });
});

client.on("channelDelete", channel => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The channel __${channel.name}__ has been deleted`)
    .setDescription(`Channel ID: [${channel.id}]`)
    .setTimestamp()
  });
});

client.on("channelPinsUpdate", (channel, time) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C46B11")
    .setTitle(`Pins in __${channel.name}__ have been edited`)
    .setDescription(`Channel: ${channel.toString()} Channel ID: [${channel.id}]`)
    .setTimestamp()
  });
});

client.on("channelUpdate", (oldChannel, newChannel) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C46B11")
    .setTitle(`The channel __${newChannel.name}__ has been edited`)
    .setDescription(`Channel: ${newChannel.toString()} Channel ID: [${newChannel.id}]`)
    .setTimestamp()
  });
});

client.on("emojiCreate", emoji => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setTitle(`The emoji __${emoji.name}__ has been added`)
    .setDescription(`Emoji ID: [${emoji.id}]`)
    .setImage(emoji.url)
    .setTimestamp()
  });
});

client.on("emojiDelete", emoji => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The emoji __${emoji.name}__ has been deleted`)
    .setDescription(`Emoji ID: [${emoji.id}]`)
    .setImage(emoji.url)
    .setTimestamp()
  });
});

client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C46B11")
    .setTitle(`The emoji __${oldEmoji.name}__ has been edited`)
    .setDescription(`Emoji ID: [${newEmoji.id}]`)
    .addField("Before Edit", oldEmoji.name, true)
    .addField("After Edit", newEmoji.name, true)
    .setImage(newEmoji.url)
    .setTimestamp()
  });
});

client.on("guildBanAdd", (guild, user) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle(`The user __${user.username}__ has been banned`)
    .setDescription(`User ID: [${user.id}]`)
    .setTimestamp()
  });
});

client.on("guildBanRemove", (guild, user) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setAuthor(user.tag, user.displayAvatarURL())
    .setTitle(`The user __${user.username}__ has been unbanned`)
    .setDescription(`User ID: [${user.id}]`)
    .setTimestamp()
  });
});

client.on("guildMemberAdd", member => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setTitle(`The user __${member.user.username}__ has joined`)
    .setDescription(`User ID: [${member.user.id}]`)
    .setImage(member.user.displayAvatarURL({
      format: 'png',
      size: 2048
    }))
    .setTimestamp()
  });
  member.addRole(roles["I.V.G.A.S Member"]);
});

client.on("guildMemberRemove", member => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The user __${member.user.username}__ has left!`)
    .setDescription(`User ID: [${member.user.id}]`)
    .setImage(member.user.displayAvatarURL({
      format: 'png',
      size: 2048
    }))
    .setTimestamp()
  });
});

client.on("guildUpdate", (oldGuild, newGuild) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C46B11")
    .setTitle(`The server has been edited!`)
    .setTimestamp()
  });
});

client.on("messageDelete", message => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`A message has been deleted!`)
    .setDescription(`Channel: ${message.channel.toString()} message ID: [${message.id}]`)
    .addField("Message", message.content)
    .setTimestamp()
  });
});

client.on("messageDeleteBulk", messages => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`${messages.array().length} messages have been deleted!`)
    .setDescription(`Channel: ${messages.first().channel.toString()}`)
    .setTimestamp()
  });
});

client.on("messageReactionRemoveAll", message => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`All reactions to a message have been deleted!`)
    .setDescription(`Channel: ${message.channel.toString()} message ID: [${message.id}]`)
    .addField("Message", message.content)
    .setTimestamp()
  });
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.content != newMessage.content) {
    channels["bot-logs"].send({embed: new discord.MessageEmbed()
      .setColor("#C46B11")
      .setAuthor(`${newMessage.author.tag} [${newMessage.author.id}]`, newMessage.author.displayAvatarURL())
      .setTitle(`A message has been edited!`)
      .setDescription(`Channel: ${newMessage.channel.toString()} message ID: [${newMessage.id}]`)
      .addField("Before Edit", oldMessage.content, true)
      .addField("After Edit", newMessage.content, true)
      .setTimestamp()
    });
  }
});

client.on("roleCreate", role => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setTitle(`The role ${role.name} has been created`)
    .setDescription(`Role: ${role.toString()} Role ID: [${role.id}]`)
    .setTimestamp()
  });
});

client.on("roleDelete", role => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The role ${role.name} has been deleted`)
    .setDescription(`Role: ${role.toString()} Role ID: [${role.id}]`)
    .setTimestamp()
  });
});

client.on("roleUpdate", (oldRole, newRole) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The role ${newRole.name} has been edited`)
    .setDescription(`Role: ${newRole.toString()} Role ID: [${newRole.id}]`)
    .setTimestamp()
  });
});

client.on("commandBlocked", (message, reason) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The command ${message.command.name} has been blocked`)
    .setDescription(`Message ID: [${message.id}]`)
    .addField("Args", message.argString)
    .addField("Reason", reason)
    .setTimestamp()
  });
});

client.on("commandError", (command, error, message, args, fromPattern) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C41111")
    .setTitle(`The command ${command.name} had an error`)
    .setDescription(`Message ID: [${message.id}]`)
    .addField("Args", args)
    .addField("Error", error)
    .setTimestamp()
  });
});


process.on("unhandledRejection", error => console.error(error.stack));


sql.open(path.join(__dirname, "database.sqlite")).then((db) => {
  client.setProvider(new commando.SQLiteProvider(db));
});


client.registry.registerGroups([
	["utilities", "utilities"],
  ["music", "music"]
]);
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + '/commands');

client.login(keys["bot"]);
