const commando = require('discord.js-commando');
const youtubeDownload = require('ytdl-core');
const youtubeSearch = require('youtube-search');
const util = require("util");
const path = require('path');
const _ = require("lodash");
var xhr = require("xhr");
if (!xhr.open) xhr = require("request");

const options = {
	maxResults: 10,
	key: 'AIzaSyA_mlx3zcBpX-hyiONa1IN7-O_3MNyQhsI'
};

class MusicPlayCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'play',
			group: path.basename(path.dirname(__filename)),
			memberName: 'play',
			description: 'play music from youtube videos!',
			examples: ['play never gonna give you up'],
      guildOnly: true,

			args: [
				{
					key: 'song',
					prompt: 'What youtube video should I play?',
					type: 'string'
				}
			]
		});
		this.queue = new Map();
		this.currentSong = new Map();
	}

	playSong(song_link, song_name, song_author, message) {
		const voiceChannel = message.member.voiceChannel;
		voiceChannel.join().then(connection => {

			if (connection.speaking) {
				message.channel.send(`Added \`${song_name}\` by \`${song_author}\` to queue!`);

				if (this.queue.has(message.guild.id)) {

					let currentQueue = this.queue.get(message.guild.id);
					currentQueue.push({link: song_link, name: song_name, author: song_author});
					this.queue.set(message.guild.id, currentQueue);
				} else {
					this.queue.set(message.guild.id, [{link: song_link, name: song_name, author: song_author}]);
				}

				return;
			}
			this.currentSong.set(message.guild.id, {link: song_link, name: song_name, author: song_author});
			message.channel.send(`Now playing \`${song_name}\` by \`${song_author}\``);
			connection.playStream(youtubeDownload(song_link, {filter: 'audioonly'})).on('end', () => {
				setTimeout(() =>{
					if (voiceChannel.members.size == 1) {
						voiceChannel.leave();
						message.channel.send(`Left voice channel \`${voiceChannel.name}\` because song finished and no user is present!`);
					} else if (this.queue.has(message.guild.id)) {
						let currentQueue = this.queue.get(message.guild.id);
						if (currentQueue[0]) {
							this.playSong(currentQueue[0].link, currentQueue[0].name, currentQueue[0].author, message);
							currentQueue.shift();

							this.queue.set(message.guild.id, currentQueue);
						} else {
							message.channel.send("An error occured, please retry!");
						}
					} else {
						message.channel.send("The queue ended!");
					}
				}, 250);
			});
		});
	}


	async run(message, args) {
		const self = this;
		const voiceChannel = message.member.voiceChannel;

		if (!voiceChannel) {
			return message.reply("Please join a voice channel!");
		}

		if (!voiceChannel.joinable) {
			return message.reply(`I am not allowed to join ${voiceChannel.name}!`);
		}

		youtubeSearch(args.song, options, function(err, results) {
			if(err) {
				return console.log(err);
			}
			//console.dir(results);

	let finalSearchResults = [];

	let ids = _.map(_.filter(results, { kind: "youtube#video" }), r => {
		return r.id;
	});

	xhr(
		{
			url: `https://www.googleapis.com/youtube/v3/videos?id=${ids.join(",")}&part=contentDetails&key=${options.key}`,
			method: "GET"
		},
		(err, res, body) => {
			const contentDetailsResults = JSON.parse(body);

			if (!err) {
				//console.log(util.inspect(contentDetailsResults, false, null));

				_.forEach(contentDetailsResults.items, r => {
					let video = _.find(results, { id: r.id });
					if (r.id) {
						video.contentDetails = r.contentDetails;

						finalSearchResults.push(video);
					}
				});
						if (!args.song.startsWith("https://www.youtube.com/watch?v=") && !args.song.startsWith("http://www.youtube.com/watch?v=") && !args.song.startsWith("http://youtu.be/") && !args.song.startsWith("https://youtu.be/")) {
							message.channel.send(finalSearchResults.map((currentValue, index) => {
								return `${index + 1} - ${currentValue.title} by ${currentValue.channelTitle} [${currentValue.contentDetails.duration.replace("PT","").replace("H",":").replace("M",":").replace("S","")}]`;
							}), {code: true, split: true}).then(newMessage => {
								message.channel.awaitMessages(waitingMessage => (!isNaN(waitingMessage.content) || waitingMessage.content.toLowerCase() == "cancel") && waitingMessage.author == message.author, {max: 1}).then(messages => {
									if (messages.first().content.toLowerCase() == "cancel") {
										newMessage.delete();
										messages.first().delete();
										return message.channel.send("Canceled action!");
									}
									newMessage.delete();
									messages.first().delete();
									const number = messages.first() - 1;
									self.playSong(results[number].link, results[number].title, results[number].channelTitle, message);
								});
							});
						} else {
							self.playSong(results[0].link, results[0].title, results[0].channelTitle, message);
						}
						//console.log(util.inspect(finalSearchResults, false, null));
					} else {
						console.log(err);
					}
				}
			);
		});
	}
}

module.exports = MusicPlayCommand;
