const commando = require('discord.js-commando');
const path = require('path');

class leaveCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      group: path.basename(path.dirname(__filename)),
      memberName: 'leave',
      description: 'leave current voice channel!',
      guildOnly: true
    });
  }

  async run(message, args) {
    const currentSong = this.client.registry.resolveCommand('music:play').currentSong.get(message.guild.id);

    if (!message.member.voiceChannel) {
      return message.reply("Please join a voice channel!");
    }

    message.channel.send(`leaved voice channel!`);
    message.guild.voiceConnection.leave();
  }
}

module.exports = leaveCommand;
