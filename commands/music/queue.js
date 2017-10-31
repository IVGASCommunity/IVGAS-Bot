const commando = require('discord.js-commando');
const path = require('path');

class MusicQueueCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      group: path.basename(path.dirname(__filename)),
      memberName: 'queue',
      description: 'See the current queued songs!',
      examples: ['queue'],
      guildOnly: true
    });
  }

  async run(message, args) {
    const queue = this.client.registry.resolveCommand('music:play').queue;
    if (queue.has(message.guild.id)) {
      const currentSong = this.client.registry.resolveCommand('music:play').currentSong.get(message.guild.id);
      const guildQueue = queue.get(message.guild.id);

      message.channel.send(`Currently playing \`${currentSong.name}\` by \`${currentSong.author}\``);
      message.channel.send(guildQueue.map(function (currentValue, index) {
          return `${index + 1} - ${currentValue.name} by ${currentValue.author}`;
        }), {code: true, split: true});
    } else {
      message.channel.send("There is no queue!");
    }
  }
}

module.exports = MusicQueueCommand;
