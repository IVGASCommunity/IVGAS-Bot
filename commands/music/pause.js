const commando = require('discord.js-commando');
const path = require('path');

class MusicPauseCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      group: path.basename(path.dirname(__filename)),
      memberName: 'pause',
      description: 'pause current playing music!',
      examples: ['pause'],
      guildOnly: true
    });
  }

  async run(message, args) {
    const currentSong = this.client.registry.resolveCommand('music:play').currentSong.get(message.guild.id);

    if (!message.member.voiceChannel) {
      return message.reply("Please join a voice channel!");
    }

    message.channel.send(`Paused \`${currentSong.name}\` by \`${currentSong.author}\`!`);
    message.guild.voiceConnection.dispatcher.pause();
  }
}

module.exports = MusicPauseCommand;
