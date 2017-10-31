const discord = require('discord.js');
const commando = require('discord.js-commando');
const sql = require('sqlite');
const path = require('path');

const client = new commando.Client();

let server;
let channels;
let roles;


client.on("ready", () => {
  console.log("ready!");

  module.exports = server = client.guilds.get("312938209137131541");
  module.exports = channels = {
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
  module.exports = roles = {
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


/*
"#C41111"
"#C46B11"
"#11C422"
*/


client.on("channelCreate", channel => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setDescription(channel.toString())
    .setTimestamp()
  });
});

client.on("channelDelete", channel => {

});

client.on("channelPinsUpdate", (channel, time) => {

});

client.on("channelUpdate", (oldChannel, newChannel) => {

});

client.on("debug", info => {

});

client.on("emojiCreate", emoji => {

});

client.on("emojiDelete", emoji => {

});

client.on("emojiUpdate", (oldEmoji, newEmoji) => {

});

client.on("guildBanAdd", (guild, user) => {

});

client.on("guildBanRemove", (guild, user) => {

});

client.on("guildMemberAdd", member => {
  /*
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#11C422")
    .setAuthor(`${member.user.tag} [${member.user.id}]`, member.user.displayAvatarURL())
    .setDescription(oldMessage.channel.toString())
    .addField("Before Edit", oldMessage.content, true)
    .addField("After Edit", newMessage.content, true)
    .setTimestamp()
  });  */


  setTimeout(() => {
    if (server.members.has(member)) {
      member.addRole(roles["I.V.G.A.S Member"]);
    }
  }, 60000);
});

client.on("guildMemberRemove", member => {

});

client.on("guildMemberUpdate", (oldMember, newMember) => {

});

client.on("guildUpdate", (oldGuild, newGuild) => {

});

client.on("message", message => {

});

client.on("messageDelete", message => {

});

client.on("messageReactionAdd", (reaction, user) => {

});

client.on("messageReactionRemove", (reaction, user) => {

});

client.on("messageReactionRemoveAll", message => {

});

client.on("messageUpdate", (oldMessage, newMessage) => {
  channels["bot-logs"].send({embed: new discord.MessageEmbed()
    .setColor("#C46B11")
    .setAuthor(`${oldMessage.author.tag} [${oldMessage.author.id}]`, oldMessage.author.displayAvatarURL())
    .setTitle("Message has been edited")
    .setDescription(oldMessage.channel.toString())
    .addField("Before Edit", oldMessage.content, true)
    .addField("After Edit", newMessage.content, true)
    .setTimestamp()
  });
});

client.on("presenceUpdate", (oldMember, newMember) => {

});

client.on("rateLimit", () => {

});

client.on("roleCreate", role => {

});

client.on("roleDelete", role => {

});

client.on("roleUpdate", (oldRole, newRole) => {

});

client.on("userUpdate", (oldUser, newUser) => {

});

client.on("warn", warning => {

});


process.on("unhandledRejection", err => {
  console.error(err.stack);
});


sql.open(path.join(__dirname, "database.sqlite")).then((db) => {
  client.setProvider(new commando.SQLiteProvider(db));
});


client.registry.registerGroups([
	["utilities", "utilities"],
  ["music", "music"]
]);
client.registry.registerDefaults();
client.registry.registerCommandsIn(__dirname + '/commands');

client.login('MzcyOTU5ODEzMDg2NDc4MzM2.DNLxcg.PpkVwdBYaoWvPIOkoy6W4ZpUKJM');
