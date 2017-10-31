const commando = require('discord.js-commando');
const path = require('path');

class MusicResumeCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      group: path.basename(path.dirname(__filename)),
      memberName: 'skip',
      description: 'Skip the current song!',
      examples: ['skip'],
      guildOnly: true
    });
  }

  async run(message, args) {
    const currentSong = this.client.registry.resolveCommand('music:play').currentSong.get(message.guild.id);

    if (!message.member.voiceChannel) {
      return message.reply("Please join a voice channel!");
    }

    message.channel.send(`Skipped \`${currentSong.name}\` by \`${currentSong.author}\`!`);
    message.guild.voiceConnection.dispatcher.end();
  }
}

module.exports = MusicResumeCommand;
