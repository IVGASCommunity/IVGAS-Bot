const commando = require('discord.js-commando');
const path = require('path');

class MusicResumeCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      group: path.basename(path.dirname(__filename)),
      memberName: 'resume',
      description: 'resume current paused music!',
      examples: ['resume'],
      guildOnly: true
    });
  }

  async run(message, args) {
    const currentSong = this.client.registry.resolveCommand('music:play').currentSong.get(message.guild.id);

    if (!message.member.voiceChannel) {
      return message.reply("Please join a voice channel!");
    }

    message.channel.send(`Resumed \`${currentSong.name}\` by \`${currentSong.author}\`!`);
    message.guild.voiceConnection.dispatcher.resume();
  }
}

module.exports = MusicResumeCommand;
