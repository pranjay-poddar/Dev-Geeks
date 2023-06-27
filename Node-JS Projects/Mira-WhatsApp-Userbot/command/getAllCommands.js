const {PROJECT_DIR} = require('../settings')
const fs = require('fs');
const path = require('path');
const sharp = require('sharp')
require('dotenv').config({ path: '../.env' })

async function getAllCommands(sock,jid,msgkey){

	let cmd = '*MENU*\n'+'\n'+
			'*.help* - To get all the commands\n'+
			'*.hello* - To check to bot is alive or not\n'+
			'*.time* - To get the current time\n'+
			'*.system* - To get all the system info\n'+
			'*.weather* - To get the current weather(Currently Delhi,India only)\n'+
			'*.tts <query>* - to convert text to speech. Ex- .tts <arguments>\n'+
			'*.yts <query>* - to get the youtube search results.  Ex- .ytsearch <arguments>\n'+
			'*.ytdl <query>* - to donwload the youtube video.  Ex- .ytdl  <youtube url>\n'+
			'*.song <query>* - to download the song. Ex - .song <youtube url>\n'+
			'*.sticker* - To convert the replied image to sticker.\n'+
			'*.pp* - To set the replied image to profile picture.\n'+
			'*.animeimg <Anime Name>* - To get the high quality image of anime.\n'

    let jid2 = jid

    await sock.sendMessage(jid2, {
    	delete: msgkey
	});

	await sock.sendMessage(jid2, {
		text: cmd
	});
      

}

module.exports = getAllCommands