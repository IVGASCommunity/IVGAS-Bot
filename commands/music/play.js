const discord = require('discord.js');
const commando = require('discord.js-commando');
const youtubeDownload = require('ytdl-core');
const request = require('request');
const keys = require('../../keys.json');
const querystring = require('querystring');
const path = require('path');

class playCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'play',
      group: path.basename(path.dirname(__filename)),
      memberName: 'play',
      description: 'lets you play music',
      guildOnly: true,

      args: [
        {
          key: 'song',
          prompt: 'What song would you like to play?',
          type: 'string'
        }
      ]
    });

    this.queue = new Array();
    this.currentSong = new Object();
  }


  async playSong(songLink, songName, songAuthor, songDuration, songSource, message) {
    const voiceChannel = message.member.voiceChannel;
    const connection = await voiceChannel.join();

    connection.on("debug", info => console.log(info));
    connection.on("error", error => console.error(error.stack));
    connection.on("failed", error => console.error(error.stack));
    connection.on("warn", warning => console.warn(warning));

    if (connection.speaking) {
      message.channel.send(`Added \`${songName}\` [${songDuration}] by \`${songAuthor}\` from \`${songSource}\` to queue!`);
      this.queue.push({link: songLink, name: songName, author: songAuthor, source: songSource});
    } else {
			const source = () => {
        if (songSource == "youtube") {
          return youtubeDownload(songLink, {filter: 'audioonly'});
        } else if (songSource == "direct link") {
          return songLink;
        }
      }
      const stream = connection.playStream(source());

      stream.on("debug", info => console.log(info));
      stream.on("error", error => console.error(error.stack));

      stream.on("start", () => {
        this.currentSong = {link: songLink, name: songName, author: songAuthor, source: songSource};
        message.channel.send(`Now playing \`${songName}\` [${songDuration}] by \`${songAuthor}\` from \`${songSource}\``);
      });

      stream.on("end", reason => {
        setTimeout(() => {
          if (voiceChannel.members.size == 1) {
            voiceChannel.leave();
						message.channel.send(`Left voice channel \`${voiceChannel.name}\` because the song finished and no user is present!`);
          } else if (this.queue[0]) {
            this.playSong(this.queue[0].link, this.queue[0].name, this.queue[0].author, this.queue[0].author,message);
            this.queue.shift();
          } else {
            message.channel.send("The queue ended!");
          }
        }, 250);
        console.log(reason);
      });
    }
  }

  async run(message, args) {
    const voiceChannel = message.member.voiceChannel;
    const ytRegEx = new RegExp(/(?:http(?:s?):\/\/)?(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/watch\?)?(?:feature=player_embedded&v=)?(.+)/);
		const ISOtoReadable = (isoTime) => {
			return isoTime.split(/[A-Z]/).filter(element => element.length > 0).reduce((sum, element, index) => {
				if (index > 0) {
					if (!/\d{2}/.test(element)) element = `0${element}`;
					return `${sum}:${element}`;
				}
			});
		}

    if (!voiceChannel) {
      return message.reply("Please join a voice channel!");
    }

    if (ytRegEx.test(args.song)) {
      request({
        url: `https://www.googleapis.com/youtube/v3/videos?${querystring.stringify({id: args.song.match(ytRegEx)[1], part: 'snippet,contentDetails', key: keys['yt']})}`,
        method: 'GET'
      }, (error, response, result) => {
        if (error) {
          console.error(error);
        }

				result = JSON.parse(result);

				if (result.pageInfo.totalResults == 0) {
					return message.channel.send("The youtube link is invalid!");
				}

				ISOtoReadable(result.items[0].contentDetails.duration);

				this.playSong(`https://youtu.be/${args.song.match(ytRegEx)[1]}`, result.items[0].snippet.title, result.items[0].snippet.channelTitle, ISOtoReadable(result.items[0].contentDetails.duration), "youtube", message);
      });
    } else {
      request({
        url: `https://www.googleapis.com/youtube/v3/search?${querystring.stringify({q: args.song, part: 'snippet', maxResults: 10, key: keys['yt'], type: "video"})}`,
        method: 'GET'
      }, (error, response, result) => {
        if (error) {
          return console.error(error);
          message.channel.send("There was an error, please try again!");
        }


        console.log(body);
      });
    }
  }
}

module.exports = playCommand;
