const discord = require('discord.js');
const commando = require('discord.js-commando');
const path = require('path');

class avatarCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'avatar',
      group: path.basename(path.dirname(__filename)),
      memberName: 'avatar',
      description: 'gives you the avatar of the person you want',

      args: [
        {
          key: 'user',
          prompt: 'What user do you want to see the avatar of?',
          type: 'user',
          default: ''
        }
      ]
    });
  }

  async run(message, args) {
    if (!args.user) {
      args.user = message.author;
    }

    message.channel.send({embed: new discord.MessageEmbed()
      .setImage(args.user.displayAvatarURL({
        size: 2048
      }))
    });
  }
}

module.exports = avatarCommand;
